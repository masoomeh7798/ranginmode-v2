import express from 'express'
import { create, getAll, getOne, update } from '../Controllers/BrandCn.js'
import isAdmin from "../Middleware/isAdmin.js";

const brandRouter=express.Router()
brandRouter.route('/').post(isAdmin,create).get(getAll)
brandRouter.route('/:id').get(getOne).patch(isAdmin,update)

export default brandRouter