import mongoose from "mongoose";
const orderHistorySchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    guestId:{
        type:String
    },
    totalPrice:{
        type:Number,
    },
    address:{
        type:Object,
        default:{}
    },
    trackingCode:{
        type:String
    },
    items:{
        type:Array
    },
    status:{
        type:String,
        enum:['success','pending','failed'],
        default:'pending'
    }
},{timestamps:true})

const OrderHistory=mongoose.model('OrderHistory',orderHistorySchema)
export default OrderHistory