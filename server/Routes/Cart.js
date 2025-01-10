import express from 'express'
import isLogin from '../Middleware/isLogin.js'
import { addToCart, clearCart, removeFromCart, removeItemFromCart } from '../Controllers/CartCn.js'
const cartRouter=express.Router()
cartRouter.route('/').post(addToCart).delete(removeFromCart)
cartRouter.route('/clear').delete(isLogin,clearCart)
cartRouter.route('/removeItem').delete(isLogin,removeItemFromCart)

export default cartRouter