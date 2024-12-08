import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
  totalPrice: {
    type: Number,
    default: 0,
  },
  items: {
    type: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1
        }
      },
    ],
    default: [],
  },
});

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  phone: {
    type: String,
    match: [
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g,
      "phone number incorrect",
    ],
    required: [true, "phone number is required"],
    unique: [true, "phone number is exist"],
  },
  email: {
    type: String,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "email incorrect"],
    unique: [true, "email is exist"],
    required:[true,'email is required']
  },
  password: {
    type: String,
    required: [true, 'password is required'],
  },
  img:{
    type:String
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  favoriteProductIds: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    default: [],
  },
  recentlyProductIds: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    default: [],
  },
  cart: {
    type: cartSchema,
    default: {
      totalPrice: 0,
      items: []
    }
  },
  boughtProduct: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    default: [],
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema)
export default User