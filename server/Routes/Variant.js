import express from 'express'
import { create, getAll, get, update,remove } from '../Controllers/VariantCn.js'
import isAdmin from "../Middleware/isAdmin.js";

const variantRouter=express.Router()
variantRouter.route('/').post(isAdmin,create).get(isAdmin,getAll)
variantRouter.route('/:id').get(isAdmin,get).patch(isAdmin,update).delete(isAdmin,remove)
export default variantRouter