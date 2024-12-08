import NewsLetter from "../Models/NewsLetterMd.js";
import catchAsync from "../Utils/catchAsync.js";
import HandleError from "../Utils/handleError.js";
import ApiFeatures from "../Utils/apiFeatures.js";


export const create = catchAsync(async (req, res, next) => {
    const { email = null } = req.body
    if (!email) {
        return next(new HandleError('ايميل الزامي است.', 401))
    }
    const newsLetter = await NewsLetter.create({ email })
    return res.status(201).json({
        success: true,
        message: 'عضو خبرنامه شدي ;)'
    })
})
export const getAll = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(NewsLetter, req?.query).filters().sort().paginate()
    const newsLetters = await features.model
    const count=await NewsLetter.countDocuments(req?.query?.filters)
    return res.status(201).json({
        success: true,
        data:{
            newsLetters,
            count
        }
    })
})