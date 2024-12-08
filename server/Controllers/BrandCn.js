import catchAsync from "../Utils/catchAsync.js";
import jwt from 'jsonwebtoken'
import ApiFeatures from "../Utils/apiFeatures.js";
import Brand from "../Models/BrandMd.js";
export const create=catchAsync(async(req,res,next)=>{
    const brand= await Brand.create(req.body)
    return res.status(201).json({
        success:true,
        data:{brand},
        message:'create brand successfully'
    })

})
export const getAll=catchAsync(async(req,res,next)=>{
    const features=new ApiFeatures(Brand,req?.query).filters().sort().limitFields().paginate().populate()
    const brands=await features.model
    const count=await Brand.countDocuments(req?.query?.filters)
    return res.status(200).json({
        success:true,
        data:{brands},
        count
    })
})
export const getOne=catchAsync(async(req,res,next)=>{
    const {id}=req.params
    const brand=await Brand.findById(id)
    return res.status(200).json({
        success:true,
        data:{brand},
    })

})
export const update=catchAsync(async(req,res,next)=>{
    const {id}=req.params
    const newBrand=await Brand.findByIdAndUpdate(id,req.body,{new:true,runValidators:true})
    return res.status(200).json({
        success:true,
        data:{brand:newBrand},
        message:'brand has been updated'
    })
})
