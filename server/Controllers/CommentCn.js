import catchAsync from "../Utils/catchAsync.js";
import HandleError from "../Utils/handleError.js";
import jwt from "jsonwebtoken";
import ApiFeatures from "../Utils/apiFeatures.js";
import Product from "../Models/ProductMd.js";
import User from "../Models/UserMd.js";
import Comment from "../Models/CommentMd.js";


export const getProductComment=catchAsync(async(req,res,next)=>{
   
    const {id:productId}=req.params
    const comments=await Comment.find({productId,isPublish:true}).sort(req?.query?.sort).populate({path:'userId',select:'fullName _id img'})
    return res.status(200).json({
        success:true,
        data:{comments}
    })

})

export const getAllComment=catchAsync(async(req,res,next)=>{
    const features=new ApiFeatures(Comment,req.query).filters().sort().populate().limitFields().paginate()
    const comments=await features.model
    return res.status(200).json({
        success:true,
        data:{comments}
    })
})

export const isPublish=catchAsync(async(req,res,next)=>{
    const {id:commentId}=req.params
    const comments=await Comment.findByIdAndUpdate(commentId,{isPublish:true},{new:true})
    return res.status(200).json({
        success:true,
        data:{comments}
    })
})

export const remove=catchAsync(async(req,res,next)=>{
    const {id:commentId}=req.params
    const comments=await Comment.findByIdAndDelete(commentId)
    return res.status(200).json({
        success:true, 
        
    })
})

export const create=catchAsync(async(req,res,next)=>{
    const {id:productId}=req.params
    let comments;
    let isCustomer=false;
        const {id}=jwt.verify(req?.headers?.authorization.split(' ')[1],process.env.JWT_SECRET)
        const user=await User.findById(id)
        if(!req.body.content.trim()){
            return next(new HandleError('چيزي ننوشتي :(',400))
        }
        if(req.body?.rating&& user.boughtProduct.includes(productId)){
            isCustomer=true
            comments=await Comment.create({productId,userId:id,isCustomer,...req.body})
            const product= await Product.findById(productId)
            let count=product.ratingCount
            let totalRate=count *product.rating
            totalRate+=req.body?.rating
            product.ratingCount+=1
            product.rating= +((totalRate/product.ratingCount).toFixed(2))
            await product.save()
        }else{
            comments=await Comment.create({productId,userId:id,content:req.body.content,isCustomer})
        }
    return res.status(200).json({
        success:true, 
        message:'نظر شما ثبت شد.',
        data:{comments}
    })
})
