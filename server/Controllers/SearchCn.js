import catchAsync from "../Utils/catchAsync.js";
import Product from "../Models/ProductMd.js";
import Category from "../Models/CategoryMd.js";
import Brand from "../Models/BrandMd.js";

export const search = catchAsync(async (req, res, next) => {
    const { query } = req.body
  
        const product = await Product.find({ name: { $regex: query } })
        const category = await Category.find({ title: { $regex: query } })
        const brand = await Brand.find({ title: { $regex: query } })
        let success = true
        if (query=='' || (product.length == 0 && category.length == 0 && brand.length == 0)) {
            success = false
        }
        return res.status(200).json({
            success,
            data: { product, category, brand }
        })
    
})