import catchAsync from "../Utils/catchAsync.js";
import User from "../Models/UserMd.js";
import HandleError from "../Utils/handleError.js";
import jwt from 'jsonwebtoken'
import ApiFeatures from "../Utils/apiFeatures.js";
import { sendAuthCode, verifyCode } from "../Utils/smsHandler.js";
import bcryptjs from 'bcryptjs'
import fs from 'fs'
import { __dirname } from "../app.js";

export const getAllUser = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(User, req.query).filters().sort().limitFields().paginate().populate()
    const users = await features.model
    const count = await User.countDocuments(req?.query?.filters)
    return res.status(200).json({
        success: true,
        data: users,
        count

    })
})

export const getOneUser = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const { role, id: userId } = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET)
    if (role !== 'admin' && id !== userId) {
        return next(new HandleError("you don't have permission", 401))
    }

    const user = await User.findById(id)
        .populate({
            path:'recentlyProductIds',
            populate:{
                path:'productVariantIds'
            }
        })
        .populate('favoriteProductIds')
        .populate('boughtProduct')
        .populate({
            path: 'cart',
            populate: {
                path: 'items.productId',
                model: 'Product'
            }
        })

    return res.status(200).json({
        success: true,
        data: user,
    })
})

export const updateUser = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const { role, id: userId } = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET)
    if (role !== 'admin' && id !== userId) {
        return next(new HandleError("دسترسي نداري ;)", 401))
    }
    const { password, role: sentRole = '', ...others } = req.body
    let newRole;
    if (role == 'admin') {
        newRole = sentRole
    } else {
        newRole = role
    }
    const newPass = bcryptjs.hashSync(password, 10)
    const prevUser=await User.findById(id)
     if (prevUser.img && (prevUser.img != req?.body?.img)) {
            fs.unlinkSync(`${__dirname}/Public/${prevUser.img}`)
        }
    const user = await User.findByIdAndUpdate(id, { ...others, role: newRole, password: newPass }, { new: true, runValidators: true })

    return res.status(200).json({
        success: true,
        data: user,
        message:'اطلاعات كاربري به روز شد.'
    })
})



export const foregtPass = catchAsync(async (req, res, next) => {
    const { phone } = req?.body
    if (!phone) {
        return next(new HandleError('شماره تلفن الزامي است.', '400'))
    }
    const user = await User.findOne({ phone })
    if (!user) {
        return next(new HandleError('كاربر پيدا نشد.', '404'))
    }
    const sentCode = await sendAuthCode(phone)
    return res.status(200).json({
        success: sentCode.success,
        message: sentCode.message
    })

})


export const checkCode = catchAsync(async (req, res, next) => {
    const { code, phone } = req?.body
    if (!code) {
        return next(new HandleError('كد تاييد الزامي است.', '400'))
    }
    if (!phone) {
        return next(new HandleError('شماره تلفن الزامي است.', '400'))
    }
    const checkedCode = await verifyCode(phone, code)
    return res.status(200).json({
        success: checkedCode.success,
        message: checkedCode.message
    })

})


export const resetPass = catchAsync(async (req, res, next) => {
    const { password, phone, code } = req?.body
    if (!phone) {
        return next(new HandleError('شماره تلفن الزامي است.', '400'))
    }
    if (!code) {
        return next(new HandleError('شما مجاز به تغيير نيستيد!', '401'))
    }
    if (!password) {
        return next(new HandleError(' رمز عبور الزامي است.', '400'))
    }
    const hashPass = bcryptjs.hashSync(password, 10)
    const user = await User.findOneAndUpdate({ phone }, { password: hashPass }, { new: true, runValidators: true })
    if (!user) {
        return next(new HandleError('کاربر پیدا نشد.', '404'));
    }
    return res.status(200).json({
        success: true,
        message: 'رمز عبور به روز شد.'
    })

})




