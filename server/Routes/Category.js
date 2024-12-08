import express from "express"
import isAdmin from "../Middleware/isAdmin.js"
import { create, getAllCategory, getCategory, update } from "../Controllers/CategoryCn.js"

const categoryRouter=express.Router()
categoryRouter.route('/').get(getAllCategory).post(create)
// categoryRouter.route('/').get(getAllCategory).post(isAdmin,create)
categoryRouter.route('/:id').get(isAdmin,getCategory).patch(isAdmin,update)

export default categoryRouter
