import express from 'express'
import isAdmin from "../Middleware/isAdmin.js";
import isLogin from '../Middleware/isLogin.js';
import { create, get, getAll, remove, update } from '../Controllers/ProductVariantCn.js';

const productVariantRouter=express.Router()
productVariantRouter.route('/').post(isAdmin,create)
productVariantRouter.route('/:id').get(getAll).patch(isAdmin,update).delete(isAdmin,remove)
productVariantRouter.route('/variant/:id').get(get)
export default productVariantRouter