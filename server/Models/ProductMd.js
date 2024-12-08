import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  information: {
    type: [{ name: String, value: String }],
    default: []
  },
  // variants: {
  //   type: [{ name: String, value:[String],varQuantity:Number}],
  //   default: []
  // },
  images: {
    type: [String],
    default: []
  },
  categoryId: {
    type:[{type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'}]
  },
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand'
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  ratingCount: {
    type: Number,
    default: 0
  },
  quantity: {
    type: Number,
    required: [true, 'price is required'],
    min: 0,
  },
  price: {
    type: Number,
    required: [true, 'price is required']
  },
  finalPrice: {
    type: Number,
    required: [true, 'final Price is required']
  },
  discount: {
    type: Number,
    required: [true, 'discount is required'],
    min: 0,
    max: 100
  },
}, { timestamps: true });



const Product = mongoose.model('Product', productSchema)
export default Product