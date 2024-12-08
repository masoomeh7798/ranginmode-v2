import express from 'express'
import isAdmin from '../Middleware/isAdmin.js'
import { changeRole,  getAllUser, getOneUser, updateUser } from '../Controllers/UserCn.js'

import isLogin from '../Middleware/isLogin.js'
const userRouter=express.Router()
userRouter.route('/').get(isAdmin,getAllUser)
userRouter.route('/:id').get(isLogin,getOneUser).patch(isLogin,updateUser)
userRouter.route('/change-role').patch(isAdmin,changeRole)

export default userRouter