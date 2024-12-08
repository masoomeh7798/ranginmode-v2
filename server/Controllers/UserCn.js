import catchAsync from "../Utils/catchAsync.js";
import User from "../Models/UserMd.js";
import HandleError from "../Utils/handleError.js";
import jwt from 'jsonwebtoken'
import ApiFeatures from "../Utils/apiFeatures.js";

export const getAllUser=catchAsync(async(req,res,next) => {
    const features=new ApiFeatures(User,req.query).filters().sort().limitFields().paginate().populate()
    const users=await features.model
    const count=await User.countDocuments(req?.query?.filters)
    return res.status(200).json({
        success:true,
        data:users,
        count
        
    })
})

export const getOneUser=catchAsync(async(req,res,next) => {
    const {id}=req.params
    const {role,id:userId}=jwt.verify(req.headers.authorization.split(' ')[1],process.env.JWT_SECRET)
    if(role!=='admin' && id!==userId){
        return next(new HandleError("you don't have permission",401))
    }

    const user=await User.findById(id).populate('recentlyProductIds').populate({
        path: 'cart',
        populate: {
            path: 'items.productId',
            model: 'Product'
        }
    })

    return res.status(200).json({
        success:true,
        data:{user},        
    })
})

export const updateUser=catchAsync(async(req,res,next) => {
    const {id}=req.params
    const {role,id:userId}=jwt.verify(req.headers.authorization.split(' ')[1],process.env.JWT_SECRET)
    if(role!=='admin' && role!=='superAdmin' && id!==userId){
        return next(new HandleError("you don't have permission",401))
    }
    const {password='',role:r='',...others}=req.body
    const user=await User.findByIdAndUpdate(id,others,{new:true,runValidators:true})

    return res.status(200).json({
        success:true,
        data:user,        
    })
})

export const changeRole=catchAsync(async(req,res,next) => {
    const {id}=req.params
    const {role:newRole}=req.body
    const user=await User.findByIdAndUpdate(id,{role:newRole},{new:true,runValidators:true})
    return res.status(200).json({
        success:true,
        data:user,        
    })
})