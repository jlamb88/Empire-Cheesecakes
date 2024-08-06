const mongoose = require('mongoose')
const { Schema } = mongoose

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        unique: true
    },
    items: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        productInfo: {
            type: Schema.Types.ObjectId,
            ref: 'product'
        }
    }
    ]
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart

