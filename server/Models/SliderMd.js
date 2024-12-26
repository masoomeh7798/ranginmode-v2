import mongoose from "mongoose";
const sliderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "نام بنر الزامي است."],
  },
  image:{
    type:String,
    required: [true, "تصوير الزامي است."],
  },
  href:{
    type:String,
  },
  position:{
    type:String,
    enum:['home','discount','products'],
    default:'home'
  },
});
const Slider = mongoose.model("Slider", sliderSchema);

export default Slider;
