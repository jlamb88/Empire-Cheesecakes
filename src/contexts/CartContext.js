import React, { createContext, useState, useEffect, useContext } from 'react';
// import { getProductData } from '../productStore';

const CartContext = createContext({
    items: [],
    getProductQuantity: () => { },
    addOne: () => { },
    addOneCart: () => { },
    removeOne: () => { },
    deleteFromCart: () => { },
    getTotalCost: () => { },
    deleteCart: () => []
});

// contains all the major functions for product and cart functionality
export function CartProvider({ children }) {
    const [cartProducts, setCartProducts] = useState([]);

    function getProductQuantity(id) {
        const quantity = cartProducts.find(product => product.id === id)?.quantity

        if (quantity === undefined) {
            return 0;
        }

        return quantity;
    };

    function addOne(storeProduct) {
        console.log("add one products:", storeProduct)
        const quantity = getProductQuantity(storeProduct.id);

        // if product is not in the cart
        if (quantity === 0) {
            setCartProducts([...cartProducts, { ...storeProduct, quantity: 1 }]);
            // if product is already in the cart
        } else {
            setCartProducts(cartProducts.map(
                product => product.id === storeProduct.id
                    ? { ...product, quantity: product.quantity + 1 }
                    : product)
            )
        };
    };

    function addOneCart(id) {
        setCartProducts(cartProducts.map(
            product => product.id === id
                ? { ...product, quantity: product.quantity + 1 }
                : product)
        )
    };


    function removeOne(id) {
        const quantity = getProductQuantity(id);

        if (quantity === 1) {
            deleteFromCart(id)
        } else {
            setCartProducts(cartProducts.map(
                product => product.id === id
                    ? { ...product, quantity: product.quantity - 1 }
                    : product)
            )
        };
    };

    function deleteFromCart(id) {

        setCartProducts(
            cartProducts => cartProducts.filter(currentProduct => {
                console.log("delete from cart currentProduct:", currentProduct, id)
                return currentProduct.id !== id;
            }))
    };

    function getTotalCost(products) {
        let totalCost = 0;

        // eslint-disable-next-line
        products.map((cartItem) => {
            // const productData = getProductData(cartItem.id);
            totalCost += (cartItem.price * cartItem.quantity);
        });
        return totalCost;
    };

    function deleteCart() {
        setCartProducts([])
    }

    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOne,
        addOneCart,
        removeOne,
        deleteFromCart,
        getTotalCost,
        deleteCart
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;

export function useCart() {
    return useContext(CartContext)
}