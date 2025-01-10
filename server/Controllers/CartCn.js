import catchAsync from "../Utils/catchAsync.js";
import User from "../Models/UserMd.js";
import HandleError from "../Utils/handleError.js";
import jwt from "jsonwebtoken";
import Product from "../Models/ProductMd.js"
import ProductVariant from "../Models/ProductVariantMd.js";
import Cart from "../Models/CartMd.js";

export const addToCart = catchAsync(async (req, res, next) => {
  let id;
  if (req.headers.authorization) {
    id = jwt.verify(
      req.headers.authorization?.split(" ")[1],
      process.env.JWT_SECRET
    ).id
  }
  const { productId = null, variantId = null, quantity = 0, guestId = '' } = req.body;
  if (!productId || quantity <= 0 || !variantId || (!id && !guestId)) {
    return next(
      new HandleError(
        "درخواست نامعتبر", 400
      )
    );
  }
  let cart = await Cart.findOne({ $or: [{ userId: id }, { guestId: guestId }] })
  let add = false;
  const variant = await ProductVariant.findById(variantId)
  const finalPrice = variant?.finalPrice
  if (!cart) {
    cart = await Cart.create({ totalPrice:finalPrice*quantity, guestId, userId: id, items: [{ productId, variantId, quantity }] })
  } else {
    cart.items = cart?.items?.map((item) => {
      if (item.productId == productId && item.variantId == variantId) {
        if (item.quantity > quantity) {
          cart.totalPrice -= (finalPrice * (item.quantity - quantity))
        } else if (item.quantity < quantity) {
          cart.totalPrice += (finalPrice * (quantity - item.quantity))
        } 
        item.quantity = quantity
        add = true
      }
      return item
    })
    if (!add) {
      cart.items.push({ productId, variantId, quantity })
      cart.totalPrice += finalPrice * quantity
    }
  }

  await cart.save()

  if (id) {
    const user = await User.findByIdAndUpdate(id, { cart: cart._id }, { new: true, runValidators: true })
  }
  return res.status(200).json({
    message: "محصول به سبد خرید اضافه شد.",
    data: cart,
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
      remove: true
    },
    success: true,
  });
});