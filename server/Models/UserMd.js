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
      "شماره تلفن اشتباه است.",
    ],
    required: [true, "شماره موبايل الزامي است"],
    unique: [true, "شماره موبايل تكراري است"],
  },
  email: {
    type: String,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "ايميل نامعتبر است."],
    unique: [true, "ايميل تكراري است."],
    required:[true,'ايميل الزامي است.']
  },
  password: {
    type: String,
    required: [true, 'رمز عبور الزامي است.'],
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