import express from 'express'
import isAdmin from "../Middleware/isAdmin.js";
import { create, favoriteProduct, get, getAll, update } from '../Controllers/ProductCn.js';
import isLogin from '../Middleware/isLogin.js';

const productRouter=express.Router()
productRouter.route('/').post(create).get(getAll)
productRouter.route('/:id').get(get).patch(update)
productRouter.route('/favorite/:id').post(isLogin,favoriteProduct)

export default productRouter