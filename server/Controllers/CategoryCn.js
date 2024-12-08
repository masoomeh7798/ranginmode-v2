import catchAsync from "../Utils/catchAsync.js";
import ApiFeatures from "../Utils/apiFeatures.js";
import Category from "../Models/CategoryMd.js";
import fs from 'fs'
import { __dirname } from "../app.js";
import jwt from "jsonwebtoken"

export const getAllCategory = catchAsync(async (req, res, next) => {
    let client=true
    try{
        const {role}=jwt.verify(req.headers.authorization.split(' ')[1],process.env.JWT_SECRET)
        if(role!=='user'){
            client=false
        }
    }catch(err){
        client=true
    }
    let queryString;
    if(client){
        queryString={...req.query,filters:{...req?.query?.filters,isActive:true}}
    }else{
        queryString=req.query
    }
    const features = new ApiFeatures(Category, queryString).filters().sort().limitFields().secondPopulate('subCategory')
    const categories = await features.model
    const count = await Category.countDocuments(req?.query?.filters)
    return res.status(200).json({
        success: true,
        data: { categories, count }
    })
})

export const getCategory = catchAsync(async (req, res, next) => {
    const category = await Category.findById(req.params.id).populate('subCategory')
    return res.status(200).json({
        success: true,
        data: { category }
    })
})

export const update = catchAsync(async (req, res, next) => {
    const category = await Category.findById(req.params.id)
    if (category.image != req.body.image) {
        fs.unlinkSync(`${__dirname}/Public/${category.image}`)
    }
    const updatedCategory=await Category.findByIdAndUpdate(req.params.id, req.body,{new:true})

    return res.status(200).json({
        success: true,
        data: { updatedCategory }
    })
})

export const create = catchAsync(async (req, res, next) => {
    const category = await Category.create(req.body)
    return res.status(200).json({
        success: true,
        data: { category }
    })
})