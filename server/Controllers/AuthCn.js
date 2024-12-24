import catchAsync from "../Utils/catchAsync.js";
import User from "../Models/UserMd.js";
import bcryptjs from 'bcryptjs'
import HandleError from "../Utils/handleError.js";
import jwt from 'jsonwebtoken'

export const register=catchAsync(async(req,res,next)=>{
    let tokenRole;
    if(req.headers.authorization){
       tokenRole=jwt.verify(req?.headers?.authorization?.split(' ')[1],process.env.JWT_SECRET).role
    }
    const {password='',role='',...others}=req?.body
    const regex=/^.{4,}$/g

    if(!regex.test(password)){
        return next(new HandleError('پسورد نامعتبر است. (حداقل 4 كاراكتر)',400))
    }
    if((!tokenRole && role=='admin')||(role=='admin' && tokenRole!='admin')){
        return next(new HandleError('دسترسي نداري عزيزم ;)',400))
    }
    const hashPassword=bcryptjs.hashSync(password,10)
    await User.create({password:hashPassword,role,...others})
    return res.status(201).json({
        success:true,
        message:"كاربر با موفقيت عضو شد.",
    })
})




export const login=catchAsync(async(req,res,next)=>{
    const {email=null,password=null}=req.body
    if(!email || !password){
        return next(new HandleError('Please provide both username or email and password',400))
    }
    const user=await User.findOne({email})
    if(!user){
        return next(new HandleError('Invalid username or email or password',401))
    }
    const isPasswordMatch=bcryptjs.compareSync(password,user?.password)
    if(!isPasswordMatch){
        return next(new HandleError('Invalid username or email or password',401))
    }

    const token=jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET)
    return res.status(200).json({
        success:true,
        data:{
            token,
            user:{
                id:user._id,
                userName:user.userName,
                email:user.email,
                role:user.role,
                fullName:user.fullName
            }
        },
        message:'login successfully'
    })
})