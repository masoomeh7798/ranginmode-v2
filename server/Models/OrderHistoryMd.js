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
    authority:{
        type:String
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
    },
    process:{
        type:String,
        enum:['در حال بررسي','در حال انجام','تكميل شده','ارسال شده'],
        default:'در حال بررسي'
    }
},{timestamps:true})

const OrderHistory=mongoose.model('OrderHistory',orderHistorySchema)
export default OrderHistory