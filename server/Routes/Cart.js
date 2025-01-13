import express from 'express'
import isLogin from '../Middleware/isLogin.js'
import { addToCart, clearCart ,getGuestUserCart, removeFromCart} from '../Controllers/CartCn.js'
const cartRouter=express.Router()

cartRouter.route('/').post(addToCart).delete(removeFromCart)
cartRouter.route('/guest-user-cart').post(getGuestUserCart)
cartRouter.route('/clear').delete(isLogin,clearCart)

export default cartRouter