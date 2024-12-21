import mongoose from "mongoose";
const variantSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "type is required"],
    enum:['سايز','رنگ']
  },
  value: {
    type: String,
    required: [true, "value is required"],
  },
});
const Variant = mongoose.model("Variant", variantSchema);

export default Variant;
