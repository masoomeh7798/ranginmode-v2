import express from 'express'
import isAdmin from "../Middleware/isAdmin.js";
import isLogin from '../Middleware/isLogin.js';
import { create, get, getAll, getAllVariants, remove, update } from '../Controllers/ProductVariantCn.js';

const productVariantRouter=express.Router()
productVariantRouter.route('/:id').post(isAdmin,create).get(getAll).patch(isAdmin,update).delete(isAdmin,remove)
productVariantRouter.route('/variant/:id').get(get)
productVariantRouter.route('/').get(isAdmin,getAllVariants)
export default productVariantRouter