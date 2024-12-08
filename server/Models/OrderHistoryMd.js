import mongoose from "mongoose";
const orderHistorySchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
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
    }
},{timestamps:true})

const OrderHistory=mongoose.model('OrderHistory',orderHistorySchema)
export default OrderHistory