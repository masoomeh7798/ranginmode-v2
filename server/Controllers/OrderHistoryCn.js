import catchAsync from "../Utils/catchAsync.js";
import HandleError from "../Utils/handleError.js";
import jwt from "jsonwebtoken";
import Product from "../Models/ProductMd.js";
import User from "../Models/UserMd.js";
import OrderHistory from "../Models/OrderHistoryMd.js";
import ApiFeatures from "../Utils/apiFeatures.js";


 export const checkCartItems = catchAsync(async (req, res, next) => {
   const { id: userId } = jwt.verify(req?.headers?.authorization?.split(" ")[1], process.env.JWT_SECRET);
   const user = await User.findById(userId).populate('cart.items.productId');
   if (!(user?.cart?.items?.length >= 0) || user?.cart?.totalPrice <= 0) {
     return next(new HandleError("cart invalid", 400));
   }
   let change = false;
   let items = user?.cart?.items;
   let totalPrice = user?.cart?.totalPrice;
   let newTotalPrice = 0;
   let newItems = [];
   for (let item of items) {
     const product = await Product.findById(item.productId)
     if (product.quantity == 0) {
       change = true;
       break;
     } else if (product.quantity < item.quantity) {
       item.quantity = product.quantity;
       change = true;
     }
     newTotalPrice += product.finalPrice * item.quantity;
     newItems.push(item);
   }
   if (totalPrice != newTotalPrice) {
     change = true;
   }
   if (change) {
     user.cart.items = newItems;
     user.cart.totalPrice = newTotalPrice;
     await user.save();
     return res.status(200).json({
       message:change && "سبد خريد به روز شد.",
       success: false,
       data: {
         cart: user?.cart,
         change
       },
     });
    }else{
     return res.status(200).json({
        message: "no changes",
        success: true,
        data: {
          change
        },
      });   
    }
    
 }
);


export const payment = catchAsync(async (req, res, next) => {
  const { address , trackingCode = null } = req.body;
  const { id: userId } = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
  if (address=={} || !trackingCode) {
    return next(new HandleError("آدرس و كد رهگيري را وارد كنيد.", 400));
  }
  const user = await User.findById(userId)
  const items = user.cart.items

  for (let item of items) {
    await Product.findByIdAndUpdate(item.productId, { $inc: { quantity: -item?.quantity } });
    if(!user.boughtProduct.includes(item.productId)){
        user.boughtProduct.push(item.productId);
    }
  }
if (items<=0 ) {
    return next(new HandleError("سبد خريد شما خالي است!", 400));
  }
  const order = await OrderHistory.create({
    userId,
    address,
    totalPrice: user.cart.totalPrice,
    items,
    trackingCode
});

  user.cart = { totalPrice: 0, items: [] };
  await user.save();
  return res.status(201).json({
    message: ".سفارش شما ثبت شد",
    data: {
      order,
    },
    success: true,
  });
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
  const order = await OrderHistory.findOne(findQuery).populate({path: 'items.productId'})

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

