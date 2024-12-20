import express from 'express'
import isAdmin from '../Middleware/isAdmin.js'
import { checkCode, foregtPass,  getAllUser, getOneUser, resetPass, updateUser } from '../Controllers/UserCn.js'

import isLogin from '../Middleware/isLogin.js'
const userRouter=express.Router()
userRouter.route('/').get(isAdmin,getAllUser)
userRouter.route('/:id').get(isLogin,getOneUser).patch(isLogin,updateUser)
userRouter.route('/forget-pass').post(foregtPass)
userRouter.route('/check-code').post(checkCode)
userRouter.route('/reset-pass').post(resetPass)

export default userRouter