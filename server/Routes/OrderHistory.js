import express from 'express'
import isLogin from "../Middleware/isLogin.js";
import { checkCartItems, getAll, getOne, payment, update} from '../Controllers/OrderHistoryCn.js';
import isAdmin from '../Middleware/isAdmin.js';

const orderRouter=express.Router()
orderRouter.route('/').get(isLogin,checkCartItems).post(isLogin,payment)
orderRouter.route('/').get(isLogin,getAll)
orderRouter.route('/:id').patch(isAdmin,update).get(isLogin,getOne)

export default orderRouter