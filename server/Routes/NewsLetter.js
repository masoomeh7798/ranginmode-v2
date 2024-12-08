import express from "express"
import { create, getAll } from "../Controllers/NewsLetterCn.js"
import isAdmin from "../Middleware/isAdmin.js"

const newsLetterRouter=express.Router()
newsLetterRouter.route('/').post(create).get(isAdmin,getAll)

export default newsLetterRouter