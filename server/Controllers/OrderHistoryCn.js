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
  const zarinpal = new ZarinpalPayment("eaa46b01-819e-42ef-8a67-ba2bb7f69a32", { isSandbox: true })
  const order_id=uuidv4()
  const createTransaction = await zarinpal.create({
    amount: totalPrice * 10,
    callback_url: "http://localhost:5173/payment",
    mobile: "",
    email: "",
    description: "no description",
    order_id,
  });
  let link, authority;
  if (createTransaction.data) {
    authority = createTransaction.data.authority
    link=createTransaction.data.link
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
  cart.items=[]
  await cart.save();
  return res.status(201).json({
    message: "انتقال به صفحه پرداخت.",
    data: link,
    success: true,
  });
});

export const verify = catchAsync(async (req, res, next) => {
  const { authority = null } = req.body
  if (!authority) {
    return next(new HandleError('authority code not found', 400))
  }
  const order = await OrderHistory.findOne({ authority })
  if (!order) {
    return next(new HandleError('authority code incorrect', 400))
  }
  // 
  // const verifypay = await zarinpal.verify({authority ,amount: order.totalAfterDiscount});
  // if(verifypay.data.code==100 || verifypay.data.code==101){
  //     order.status='success'
  //     await order.save()

  // }else{
  //     order.status='failed'
  //     await order.save()
  // }
  // return res.status(200).json({
  //     data:verifypay.data
  // })

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

  const order = await features.model
  const count = await OrderHistory.countDocuments(queryString?.filters)
  return res.status(200).json({
    success: true,
    data: { order },
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

