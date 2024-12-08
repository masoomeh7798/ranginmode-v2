import catchAsync from "../Utils/catchAsync.js";
import User from "../Models/UserMd.js";
import HandleError from "../Utils/handleError.js";
import jwt from "jsonwebtoken";
import Product from "../Models/ProductMd.js"

export const addToCart = catchAsync(async (req, res, next) => {
  const { id } = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET
  );
  const user = await User.findById(id);
  const { productId = null } = req.body;

  if (!productId || !id) {
    return next(
      new HandleError(
        "وارد سايت نشدي هنوز ^^", 400
      )
    );
  }
  const product = await Product.findById(productId);
  let finalPrice = product?.finalPrice;
  let add = false;
  let newItems = user?.cart?.items?.map((e) => {
    if (productId == e?.productId) {
      e.quantity += 1
      add = true;
    }
    return e;
  });
  if (!add) {
    newItems.push({ productId, quantity: 1 });
  }
  user.cart.totalPrice += finalPrice;
  user.cart.items = newItems;
  await user.save();
  return res.status(200).json({
    message: "increased",
    data: {
      cart: user.cart,
      add
    },
    success: true,
  });
});

export const clearCart = catchAsync(async (req, res, next) => {
  const { id } = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET
  );
  const user = await User.findByIdAndUpdate(id, { cart: { totalPrice: 0, items: [] } }, { new: true });

  return res.status(200).json({
    message: "سبد خريدت خالي شد :[",
    data: {
      cart: user.cart,
    },
    success: true,
  });
});

export const removeFromCart = catchAsync(async (req, res, next) => {
  const { id } = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
  const user = await User.findById(id);
  const { productId = null } = req.body;
  if (!productId || !id) {
    return next(
      new HandleError(
        "both Id & product Id is required", 400
      )
    );
  }
  const product = await Product.findById(productId);
  let finalPrice = product.finalPrice;
  let remove = false
  let newItems = user?.cart?.items?.filter((e) => {
    if (productId == e.productId) {
      user.cart.totalPrice -= finalPrice;
      e.quantity -= 1
      if (e.quantity == 0) {
        remove = true
        return false
      }
    }
    return e;
  });
  user.cart.items = newItems;
  await user.save();
  return res.status(200).json({
    message: "decreased or removed",
    data: {
      cart: user.cart,
      remove
    },
    success: true,
  });
});

export const removeItemFromCart = catchAsync(async (req, res, next) => {
  const { id } = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET);
  const user = await User.findById(id);
  const { productId = null } = req.body;
  if (!productId || !id) {
    return next(
      new HandleError(
        "both Id & product Id is required", 400
      )
    );
  }
  const product = await Product.findById(productId);
  let finalPrice = product.finalPrice;
  let newItems = user?.cart?.items?.filter((e) => {
    if (productId == e.productId) {
      user.cart.totalPrice -= finalPrice * e?.quantity
      return false
    }
    return e;
  });
  user.cart.items = newItems;
  await user.save();
  return res.status(200).json({
    message: "از سبد خريدت حذف شد.",
    data: {
      cart: user.cart,
      remove:true
    },
    success: true,
  });
});