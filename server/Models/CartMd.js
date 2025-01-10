import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
    totalPrice: {
        type: Number,
        default: 0,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    guestId:{
        type:String
    },
    items: {
        type: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                variantId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "ProductVariant",
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            },
        ],
        default: [],
    },
});


const Cart=mongoose.model('Cart',cartSchema)
export default Cart