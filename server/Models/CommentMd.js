import mongoose from "mongoose";
const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        trim:true,
        required:[true,'محتوای کامنت الزامی است.'],
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'آی دی کاربر الزامی است.']

    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:[true,'آی دی محصول الزامی است.']
    },
    isPublish:{
        type:Boolean,
        default:true
    },
},{timestamps:true})
const Comment=mongoose.model('Comment',commentSchema)
export default Comment