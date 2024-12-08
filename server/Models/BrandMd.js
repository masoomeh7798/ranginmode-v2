import mongoose from "mongoose";
const brandSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
  },
  isActive:{
    type:Boolean,
    default:true
  }
});
const Brand = mongoose.model("Brand", brandSchema);

export default Brand;