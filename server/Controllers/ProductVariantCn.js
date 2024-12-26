import catchAsync from "../Utils/catchAsync.js";
import Product from "../Models/ProductMd.js";
import ProductVariant from "../Models/ProductVariantMd.js";
import ApiFeatures from "../Utils/apiFeatures.js";


export const create=catchAsync(async (req,res,next) => {
    const {id}=req.params    // product id
    const productVariant=await ProductVariant.create(req?.body)
    await Product.findByIdAndUpdate(id,{$push: {productVariantIds: productVariant._id}})
    return res.status(201).json({
        data:{productVariant},
        success:true,
        message:'زير شاخه جديد اضافه شد.'
    })
})
export const getAll=catchAsync(async (req,res,next) => {
    const {id}=req.params
    const productVariant=await ProductVariant.find({productId:id})
    return res.status(201).json({
        data:{productVariant},
        success:true,
    })
})
export const getAllVariants=catchAsync(async (req,res,next) => {
    const features = new ApiFeatures(ProductVariant, req.query).filters().sort().limitFields().paginate().populate()
    const productVariants = await features.model
    const count = await ProductVariant.countDocuments(req?.query?.filters)
    return res.status(201).json({
        data:productVariants,
        success:true,
        count
    })
})
export const get=catchAsync(async (req,res,next) => {
    const {id}=req.params
    const productVariant=await ProductVariant.findById(id)
    return res.status(201).json({
        data:{productVariant},
        success:true,
    })
})
export const update=catchAsync(async (req,res,next) => {
    const {id}=req.params
    const productVariant=await ProductVariant.findByIdAndUpdate(id,req.body,{new:true,runValidators:true})
    return res.status(201).json({
        data:{productVariant},
        success:true,
    })
})

export const remove=catchAsync(async (req,res,next) => {
    const {id}=req.params
    const productVariant=await ProductVariant.findByIdAndDelete(id)
    Product.findByIdAndUpdate(productVariant.productId,{$pull:{productVariantIds:id}})
    return res.status(201).json({
        data:{productVariant},
        success:true,
    })
})