import mongoose from "mongoose";
const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        trim:true,
        required:[true,'comment content is required'],
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'userId is Required']

    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:[true,'productId is Required']
    },
    isPublish:{
        type:Boolean,
        default:true
    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
    isCustomer:{
        type:Boolean,
        default:false
    }

},{timestamps:true})
const Comment=mongoose.model('Comment',commentSchema)
export default Comment