import mongoose from "mongoose";

const newsLetterSchema=new mongoose.Schema({
    email:{
        type: String,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "ايميل نامعتبر است."],
        required:[true,'آدرس ايميل را وارد كنيد.'],
        unique:[true,'آدرس ايميل از قبل وجود دارد.']
    }
}, { timestamps: true })

const NewsLetter=mongoose.model('NewsLetter',newsLetterSchema)

export default NewsLetter