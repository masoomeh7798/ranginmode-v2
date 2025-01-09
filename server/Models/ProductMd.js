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
    default: [],
    validate: {
      validator: function (v) {
        return v.length > 0; // Ensure at least one image is provided
      },
      message: 'عكس محصول الزامي است.' // Custom error message
    },
  },
  isActive: {
    type: Boolean,
    default: true
  },
  // categoryId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Category'
  // },
  categoryId: {
    type:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    }]
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
  },
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand'
  },
}, { timestamps: true });



const Product = mongoose.model('Product', productSchema)
export default Product