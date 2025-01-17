import express from 'express'
import isLogin from "../Middleware/isLogin.js";
import { checkCartItems, getAll, getOne, payment, update, verify} from '../Controllers/OrderHistoryCn.js';
import isAdmin from '../Middleware/isAdmin.js';

const orderRouter=express.Router()
orderRouter.route('/').post(checkCartItems).get(isLogin,getAll)
orderRouter.route('/payment').post(payment)
orderRouter.route('/verify').post(verify)
orderRouter.route('/:id').patch(isAdmin,update).get(isLogin,getOne)

export default orderRouter