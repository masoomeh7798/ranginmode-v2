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
  images: {
    type: [String],
    default: []
  },
  isActive: {
    type: Boolean,
    default: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand'
  },
  productVariantIds: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductVariant'
    }],
    default: []
  },
  defaultVariantIndex: {
    type: Number,
    default: 0
  }
}, { timestamps: true });



const Product = mongoose.model('Product', productSchema)
export default Product