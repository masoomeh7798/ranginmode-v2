import mongoose from "mongoose";
const productVariantSchema = new mongoose.Schema({
  quantity:{
        type:Number,
        required:[true,'price is required'],
        min:0,
  },
  price:{
    type:Number,
    required:[true,'price is required']
  },
  finalPrice:{
    type:Number,
    required:[true,'final Price is required']
  },
  discount:{
    type:Number,
    required:[true,'discount is required'],
    min:0,
    max:100
  },
  variantId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Variant'
  },
  productId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Product'
  },
  
},{timestamps:true});



const ProductVariant=mongoose.model('ProductVariant',productVariantSchema)
export default ProductVariant