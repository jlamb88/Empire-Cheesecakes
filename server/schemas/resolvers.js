const { User, Product, Order, Cart, Comment } = require('../models')
const { signToken } = require('../utils/auth')
const { AuthenticationError } = require('apollo-server-express')
// Stripe Secret Key
const stripe = require('stripe')('sk_test_51O7ixRFTNX2FVBkU9KhZetT4SHj2fqcsAlZfDIvHH49zIU20QrpIFXomJZyoUj7VWnTVvQygjJXJSXa7cNVu7kfp00zICDvxLY');

const resolvers = {
    Query: {
        user: async (parent, userId) => {
            return await User.findOne({ _id: userId })
        },
        users: async () => {
            return await User.find({})
        },
        products: async () => {
            return await Product.find({})
        },
        product: async (parent, productId) => {
            return await Product.findOne({ _id: productId })
        },
        userOrders: async (parent, { userId }) => {
            return await Order.find({ userId: userId })
        },
        orders: async () => {
            return await Order.find({}).populate('products')
        },
        cart: async (parent, { userId }) => {
            return await Cart.findOne({ userId: userId }).populate('items').populate({
                path: 'items',
                populate: 'productInfo'
            })
        },
        carts: async () => {
            return await Cart.find({})

        }

    },

    Mutation: {
        addUser: async (parent, { firstName, lastName, address, city, state, zipcode, phone, email, password }) => {
            const user = await User.create({ firstName, lastName, address, city, state, zipcode, phone, email, password })
            const token = signToken(user)

            return { user, token }
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email })

            if (!user) {
                throw new AuthenticationError('This email cannot be found')
            }

            const correctPw = await user.isCorrectPassword(password)

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password. Please try again')
            }

            const token = signToken(user)

            return { user, token }
        },

        addOrder: async (parent, { userId, orderItems, total, transId }) => {
            return await Order.create({ userId, products: orderItems, total, transId })
        },
        updateUser: async (parent, { userId, firstName, lastName, streetAddress, city, state, zipcode, phone, email, password }) => {
            return await User.findOneAndUpdate(
                { _id: userId },
                { firstName, lastName, streetAddress, city, state, zipcode, phone, email, password },
                { new: true }
            )
        },
        addPayment: async (parent, { userId, userPayment }) => {
            return await User.findOneAndUpdate(
                { _id: userId },
                { $addToSet: { payment: userPayment } },
                { new: true }
            )
        },
        updatePayment: async (parent, { userId, userPayment }) => {
            return await User.findOneAndUpdate(
                { _id: userId },
                { $set: { payment: { _id: userPayment.payId }, userPayment }, },
                { new: true }
            )
        },
        deletePayment: async (parent, { userId, payId }) => {
            return await User.findOneAndUpdate(
                { _id: userId },
                { $pull: { payment: { _id: payId } } }
            )
        },
        addComment: async (parent, { productId, name, text, rating }) => {
            return await Product.findOneAndUpdate(
                { _id: productId },
                { $addToSet: { comment: { name, text, rating }, }, },
                { new: true }
            )
        },
        addCart: async (parent, { userId, cartContents }) => {

            return await Cart.create(
                { userId, items: cartContents }
            )

        },
        updateCartItems: async (parent, { userId, productId, quantity }) => {
            return await Cart.findOneAndUpdate(
                { userId: userId },
                { $addToSet: { contents: { productId: productId, quantity: quantity } } },
                { new: true }
            )
        },
        deleteCartItem: async (parent, { userId, productId }) => {
            return await Cart.findOneAndDelete(
                { userId: user._id } || { productId: product._id }
            )
        },
        deleteCart: async (parent, { userId }) => {
            await Cart.deleteOne({ userId: userId })
            return "Cart deleted"
        },
        checkoutSession: async (parent, { userId }, context) => {
            const url = new URL(context.headers.referer).origin
                ;

            //PROMISE CODE
            try {
                const cart = await Cart.findOne({ userId: userId });
                const cartItems = cart.items;

                const line_items = await Promise.all(cartItems.map(async (item) => {
                    const productInfo = await Product.findOne({ _id: item.productId });

                    return {
                        quantity: item.quantity,
                        price_data: {
                            currency: 'usd',
                            unit_amount: productInfo.price * 100,
                            product_data: {
                                product: productInfo.productId,
                                name: productInfo.name,
                                description: productInfo.description || undefined,
                            }
                        }
                    };
                }));

                // stripe checkout
                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    line_items,
                    mode: 'payment',
                    success_url: `${url}/success`,
                    cancel_url: `${url}/store?cancelled=true`
                });

                // Return the necessary fields
                return { userId: userId, transId: session.id, url: session.url, total: session.amount_total };
            } catch (error) {
                // Handle errors
                throw new Error("Failed to create checkout session");
            }
        }
    }
}



module.exports = resolvers