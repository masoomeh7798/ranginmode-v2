import catchAsync from "../Utils/catchAsync.js";
import HandleError from "../Utils/handleError.js";
import jwt from "jsonwebtoken";
import Product from "../Models/ProductMd.js";
import User from "../Models/UserMd.js";
import OrderHistory from "../Models/OrderHistoryMd.js";
import ApiFeatures from "../Utils/apiFeatures.js";
import Cart from "../Models/CartMd.js";
import ProductVariant from "../Models/ProductVariantMd.js";
import ZarinpalPayment from "zarinpal-pay";
import { v4 as uuidv4 } from 'uuid';

const zarinpal = new ZarinpalPayment('eaa46b01-819e-42ef-8a67-ba2bb7f69a32', { isSandbox: true });

export const checkCartItems = catchAsync(async (req, res, next) => {
  let userId;
  if (req.headers.authorization) {
    userId = jwt.verify(
      req.headers.authorization?.split(" ")[1],
      process.env.JWT_SECRET
    )?.id
  }
  const { guestId = '' } = req?.body;
  if (!userId && !guestId) {
    return next(
      new HandleError(
        "درخواست نامعتبر", 400
      )
    );
  }

  let cart;
  if (userId) {
    cart = await Cart.findOne({ userId }).populate({ path: 'items', populate: 'productId variantId' })
  } else {
    cart = await Cart.findOne({ guestId }).populate({ path: 'items', populate: 'productId variantId' })
  }

  if ((cart.items.length == 0) || cart.totalPrice <= 0) {
    return next(new HandleError("كارت نامعتبر است.", 400));
  }
  let change = false;
  let items = cart.items;
  let totalPrice = cart?.totalPrice;
  let newTotalPrice = 0;
  let newItems = [];
  for (let item of items) {
    const variant = await ProductVariant.findById(item.variantId)
    if (variant.quantity == 0) {
      change = true;
      break;
    } else if (variant.quantity < item.quantity) {
      item.quantity = variant.quantity;
      change = true;
    }
    newTotalPrice += variant.finalPrice * item.quantity;
    newItems.push(item);
  }
  if (totalPrice != newTotalPrice) {
    change = true;
  }

  if (change) {
    cart.items = newItems;
    cart.totalPrice = newTotalPrice;
    await cart.save();
    return res.status(200).json({
      message: "سبد خريد به روز شد.",
      success: false,
      data: cart,
      change
    });
  } else {
    return res.status(200).json({
      message: "سبد خريد تغيير نكرده است.",
      success: true,
      change
    });
  }

}
);


export const payment = catchAsync(async (req, res, next) => {
  let userId;
  if (req.headers.authorization) {
    userId = jwt.verify(
      req.headers.authorization?.split(" ")[1],
      process.env.JWT_SECRET
    )?.id
  }
  const { guestId = '', address = null } = req?.body;
  if (!userId && !guestId) {
    return next(
      new HandleError(
        "درخواست نامعتبر", 400
      )
    );
  }
  let cart;
  if (userId) {
    cart = await Cart.findOne({ userId })
  } else {
    cart = await Cart.findOne({ guestId })
  }
  if (!address) {
    return next(new HandleError("آدرس الزامي است.", 400));
  }

  if (cart.items.length == 0 || cart.totalPrice <= 0) {
    return next(new HandleError("سبد خريد نامعتبر است.", 400));
  }
  let items = cart?.items;
  let totalPrice = cart?.totalPrice + 35000;

  for (let item of items) {
    await ProductVariant.findByIdAndUpdate(item.variantId, {
      $inc: { quantity: -item?.quantity },
    });
  }
  // payment return link and authority
  // const zarinpal = new ZarinpalPayment("eaa46b01-819e-42ef-8a67-ba2bb7f69a32", { isSandbox: true })
  const order_id = uuidv4()
  const createTransaction = await zarinpal.create({
    amount: totalPrice * 10,
    callback_url: "http://localhost:5173/callback",
    mobile: "",
    email: "",
    description: "no description",
    order_id,
  });
  let link, authority;
  if (createTransaction.data) {
    authority = createTransaction.data.authority
    link = createTransaction.data.link
  }
  const orderData = {
    userId,
    guestId,
    address,
    status: "pending",
    totalPrice,
    items,
    authority,
  };

  const order = await OrderHistory.create(orderData);
  cart.totalPrice = 0
  cart.items = []
  await cart.save();
  return res.status(201).json({
    message: "انتقال به صفحه پرداخت.",
    data: link,
    success: true,
  });
});



export const verify = catchAsync(async (req, res, next) => {
  const { Authority = null, Status = null } = req.body
  if (!Authority || !Status) {
    return next(new HandleError('درخواست نامعتبر', 400))
  }
  const order = await OrderHistory.findOne({ authority: Authority })
  if (!order) {
    return next(new HandleError('authority code incorrect', 400))
  }

  let isFailed = false;
  let verifypay;
  if (Status == "NOK") {
    isFailed = true
  } else {
    verifypay = await zarinpal.verify({ authority: Authority, amount: order.totalPrice * 10 });
    if (verifypay?.data?.code == 100 || verifypay?.data?.code == 101) {
      order.status = 'success'
    } else {
      isFailed = true;
    }
  }

  if (isFailed && !order.isChecked) {
    order.status = 'failed'
    order.isChecked = true
    for (let item of order.items) {
      await ProductVariant.findByIdAndUpdate(item?.variantId, { $inc: { quantity: item.quantity } })
    }
  }

  await order.save()

  return res.status(200).json({
    success: !isFailed && true,
    message: isFailed ? "پرداخت ناموفق" : "پرداخت موفق",
    data: {
      verifypay,
      amount: order?.totalPrice
    },
  })
})


export const getAll = catchAsync(async (req, res, next) => {
  const { id: userId, role } = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET
  );
  let queryString;
  if (role == 'admin') {
    queryString = req?.query
  } else {
    queryString = { ...req.query, filters: { ...req?.query?.filters, userId } }
  }
  const features = new ApiFeatures(OrderHistory, queryString)
    .filters()
    .sort()
    .paginate()
    .limitFields()
    .populate()
    .secondPopulate('userId')

  const orders = await features.model
  const count = await OrderHistory.countDocuments(queryString?.filters)
  return res.status(200).json({
    success: true,
    data: orders ,
    count
  })
})


export const getOne = catchAsync(async (req, res, next) => {
  const { id: userId, role } = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET
  );
  const { id } = req.params
  let findQuery;
  if (role == 'admin') {
    findQuery = { _id: id }
  } else {
    findQuery = { _id: id, userId }
  }
  const order = await OrderHistory.findOne(findQuery).populate({ path: 'items.productId' })

  return res.status(200).json({
    success: true,
    data: { order },
    count
  })
})

export const update = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const order = await OrderHistory.findByIdAndUpdate(id, req.body, { new: true })
  return res.status(200).json({
    success: true,
    data: { order },
    count
  })
})

export const checkOut = async () => {
  try {
    const passTime = new Date(Date.now() - 10 * 60 * 1000)
    const orders = await OrderHistory.find({
      status: 'pending',
      createdAt: { $lt: passTime }
    }).populate({
      path: 'items.variantId',
      model: 'ProductVariant',
      refPath: 'items.variantId'
    })

    if (orders.length == 0) {
      return
    }
    for (let order of orders) {
      order.status = 'failed'
      console.log(order.items);
      for (let item of order.items) {
        await ProductVariant.findByIdAndUpdate(item?.variantId?._id, { $inc: { quantity: item.quantity } })
      }
      await order.save()
    }
  } catch (error) {
    console.log('this', error);
  }

}
