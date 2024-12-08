import catchAsync from "../Utils/catchAsync.js";
import HandleError from "../Utils/handleError.js";
import jwt from "jsonwebtoken";
import ApiFeatures from "../Utils/apiFeatures.js";
import Product from "../Models/ProductMd.js";
import User from "../Models/UserMd.js";

export const getAll = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Product, req?.query)
    .filters()
    .sort()
    .paginate()
    .limitFields()
    .populate()
    .secondPopulate('categoryId').secondPopulate('brandId')
  const products = await features.model
  const count = await Product.countDocuments(req?.query.filters)
  return res.status(200).json({
    success: true,
    data: { products },
    count
  })
});

export const get = catchAsync(async (req, res, next) => {
  const { id } = req.params
  let isFavorite = false
  let isCustomer = false
  let userId;
  if (req?.headers?.authorization) {
    userId = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET
    ).id

    const user = await User.findById(userId)
    if (user.favoriteProductIds.includes(id)) {
      isFavorite = true
    }
    if (user.boughtProduct.includes(id)) {
      isCustomer = true
    }
    let recentlyProductIds = user?.recentlyProductIds || []
    if (!recentlyProductIds.includes(id)) {
      if (recentlyProductIds?.length == 10) {
        recentlyProductIds.shift()
        recentlyProductIds.push(id)
      } else {
        recentlyProductIds.push(id)
      }
    }

    user.recentlyProductIds = recentlyProductIds
    user.save()
  }
  const product = await Product.findById(id).populate('categoryId').populate('brandId')
  return res.status(200).json({
    success: true,
    data: { product },
    isFavorite,
    isCustomer
  })
});

export const create = catchAsync(async (req, res, next) => {
  const product = await Product.create(req.body)
  return res.status(201).json({
    message: 'product created successfully',
    success: true,
    data: { product }
  })
})


export const update = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
  return res.status(201).json({
    message: 'product update successfully',
    success: true,
    data: { product }
  })
})


export const favoriteProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const { id: userId } = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET
  )
  const { isFavorite = false } = req.body
  let newFav;
  if (isFavorite) {
    await User.findByIdAndUpdate(userId, { $pull: { favoriteProductIds: id } })
    newFav = false
  } else {
    await User.findByIdAndUpdate(userId, { $push: { favoriteProductIds: id } })
    newFav = true
  }
  return res.status(200).json({
    success:true,
    isFavorite: newFav,
    message: newFav ? 'محصول به علاقه مندي ها اضافه شد.' : 'محصول از علاقه مندي ها حذف شد.'
  })
})




