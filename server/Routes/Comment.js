import express from 'express'
import isLogin from '../Middleware/isLogin.js'
import isAdmin from '../Middleware/isAdmin.js'
import { create, getAllComment, getProductComment, isPublish, remove } from '../Controllers/CommentCn.js'

const commentRouter=express.Router()
commentRouter.route('/:id').post(isLogin,create).get(getProductComment)
commentRouter.route('/cm/:id').patch(isAdmin,isPublish).delete(isAdmin,remove).get(isAdmin,getAllComment)

export default commentRouter