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
  const { productId = null, variantId = null, quantity = 0, guestId = '' } = req?.body;
  if (!productId || quantity <= 0 || !variantId || (!id && !guestId)) {
    return next(
      new HandleError(
        "درخواست نامعتبر", 400
      )
    );
  }

  let cart;
  if (id) {
    cart = await Cart.findOne({ userId: id })
  } else {
    cart = await Cart.findOne({ guestId })
  }

  let add = false;
  const variant = await ProductVariant.findById(variantId)
  const finalPrice = variant?.finalPrice
  if (!cart) {
    cart = await Cart.create({ totalPrice: finalPrice * quantity, guestId, userId: id, items: [{ productId, variantId, quantity }] })
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
    message: "محصول اضافه و سبد خريد به روز شد.",
    data: cart,
    success: true,
  });
});



export const getGuestUserCart = catchAsync(async (req, res, next) => {
  let userId;
  if (req.headers.authorization) {
    userId = jwt.verify(
      req.headers.authorization?.split(" ")[1],
      process.env.JWT_SECRET
    ).id
  }
  const { guestId } = req?.body
  let cart;
  if (userId) {
    cart = await Cart.findOne({ userId }).populate({ path: 'items', populate: 'productId variantId' })
  } else {
    cart = await Cart.findOne({ guestId }).populate({ path: 'items', populate: 'productId variantId' })

  }
  return res.status(200).json({
    success: true,
    data: cart
  });
});


export const removeFromCart = catchAsync(async (req, res, next) => {
  let userId;
  if (req.headers.authorization) {
    userId = jwt.verify(
      req.headers.authorization?.split(" ")[1],
      process.env.JWT_SECRET
    )?.id
  }
  const { productId = null, variantId = null, quantity = 0, guestId = '' } = req?.body;
  if (!productId || quantity <= 0 || !variantId || (!userId && !guestId)) {
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

  const variant=await ProductVariant.findById(variantId)
  let finalPrice = variant.finalPrice;

  let newItems = cart?.items?.filter((e) => {
    if (productId == e.productId && variantId==e.variantId) {
      cart.totalPrice -= finalPrice*quantity;
      return
    }
    return e;
  });
  cart.items = newItems;
  await cart.save();
  return res.status(200).json({
    message: "محصول حذف شد.",
    data:cart,
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