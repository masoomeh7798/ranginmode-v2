import catchAsync from "../Utils/catchAsync.js";
import HandleError from "../Utils/handleError.js";
import jwt from "jsonwebtoken";
import ApiFeatures from "../Utils/apiFeatures.js";
import Product from "../Models/ProductMd.js";
import User from "../Models/UserMd.js";
import Comment from "../Models/CommentMd.js";


export const getProductComment = catchAsync(async (req, res, next) => {
    const { id: productId } = req.params
    const comments = await Comment.find({ productId, isPublish: true }).sort(req?.query?.sort).populate({ path: 'userId', select: 'fullName _id img' })
    return res.status(200).json({
        success: true,
        data: { comments }
    })
})
export const getOneComment = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const comment = await Comment.findById(id).populate({ path: 'userId', select: 'fullName' })
    .populate({path:'productId',select:'name'})
    return res.status(200).json({
        success: true,
        data: comment
    })
})

export const getAllComment = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Comment, req.query).filters().sort().populate().limitFields().paginate().secondPopulate('productId').secondPopulate('userId')
    const comments = await features.model
    return res.status(200).json({
        success: true,
        data: comments 
    })
})

export const update = catchAsync(async (req, res, next) => {
    const { id: commentId } = req.params
    const comment = await Comment.findByIdAndUpdate(commentId, req?.body, { new: true })
    return res.status(200).json({
        success: true,
        data: comment,
        message:'کامنت به روز شد.'
    })
})

export const remove = catchAsync(async (req, res, next) => {
    const { id: commentId } = req.params
    const comment = await Comment.findByIdAndDelete(commentId)
    return res.status(200).json({
        success: true,
        message:'کامنت حذف شد.'
    })
})

export const create = catchAsync(async (req, res, next) => {
    const { id: productId } = req.params
    const { id } = jwt.verify(req?.headers?.authorization.split(' ')[1], process.env.JWT_SECRET)
    if (!req.body.content.trim()) {
        return next(new HandleError('چيزي ننوشتي :(', 400))
    }
    const comment = await Comment.create({ productId, userId: id, content: req.body.content })

    return res.status(200).json({
        success: true,
        message: 'نظر شما ثبت شد.',
        data: comment
    })
})
