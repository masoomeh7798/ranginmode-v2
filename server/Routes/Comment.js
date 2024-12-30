import express from 'express'
import isLogin from '../Middleware/isLogin.js'
import isAdmin from '../Middleware/isAdmin.js'
import { create, getAllComment, getOneComment, getProductComment, remove, update } from '../Controllers/CommentCn.js'

const commentRouter=express.Router()
commentRouter.route('/').get(isAdmin,getAllComment)
commentRouter.route('/:id').post(isLogin,create).get(isAdmin,getOneComment).patch(isAdmin,update).delete(isAdmin,remove)
commentRouter.route('/cm/:id').get(getProductComment)
export default commentRouter