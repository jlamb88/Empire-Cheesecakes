import { Button, Navbar, Modal } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import React, { useState, useContext } from 'react';
import { useCart } from '../contexts/CartContext';
import CartProduct from './CartProduct'
import { useMutation, useQuery } from '@apollo/client';
import { CHECKOUT, ADD_CART } from '../utils/mutations';
import { useAuth } from '../contexts/AuthContext'

import { USER_CART, USER } from '../utils/queries'

function NaviBar() {
    const cart = useCart()
    const { userInfo, loggedIn } = useAuth()
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [runCheckout, { error }] = useMutation(CHECKOUT);
    const [runAddCart] = useMutation(ADD_CART)

    // checkout function for checkout button w/ POST route.
    const checkout = async () => {
        await runAddCart({
            variables: {
                userId: userInfo.userId,
                cartContents: cart.items.map((currentProduct) => (
                    { productId: currentProduct.id, quantity: currentProduct.quantity }
                ))
            }
        })

        sessionStorage.setItem("userInfo", JSON.stringify(userInfo))


        const { data } = await runCheckout({
            variables: {
                userId: userInfo.userId,
            }
        })
        console.log("data", data)


        //     await fetch('/checkout', { // this address will need to change
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({ items: cart.items })
        //     }).then((response) => {
        //         return response.json();
        //     }).then((response) => {
        if (data.checkoutSession.url) {
            sessionStorage.setItem("stripeSession", JSON.stringify(data))
            window.location.assign(data.checkoutSession.url) // sends user to Stripe
        }
        //     //     //     };
        // };
    }

    // adds up all product.quantity to show total amount of products in cart
    const productCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);
    return (
        <div>
            <Navbar bg='transparent' expand='sm'>
                <Navbar.Toggle /> {/* Hamburger Button */}
                <Navbar.Collapse className='justify-content-end'> {/* Everything for the Hamburger goes in here */}
                    <Navbar.Brand className='navbarText mr-4' as={NavLink} to='/'>Home</Navbar.Brand>
                    <Navbar.Brand className='navbarText mr-4' as={NavLink} to='/about'>About</Navbar.Brand>
                    <Navbar.Brand className='navbarText mr-4' as={NavLink} to='/store'>Store</Navbar.Brand>
                    <Navbar.Brand className='navbarText mr-4' as={NavLink} to='/user'>{loggedIn ? "Logout" : "Login"}</Navbar.Brand>
                    <Button variant='dark' className='navbarText' onClick={handleShow}>Cart ({productCount}) </Button>
                </Navbar.Collapse>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className='modalTitleText'>Shopping Cart</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* If there are products, map over current, else show cart is empty */}
                        {productCount > 0 ?
                            <div className='modalText'>
                                <p>In Cart: </p>
                                {cart.items.map((currentProduct, index) => (
                                    // gives product info to the cart modal to display
                                    <CartProduct key={index} id={currentProduct.id} quantity={currentProduct.quantity} price={currentProduct.price} name={currentProduct.name}>Total</CartProduct>
                                ))}
                                {/* total cost limited to 2 decimals */}
                                <br></br>
                                <h2 className='totalh2'>Total: ${cart.getTotalCost(cart.items).toFixed(2)}</h2>
                                {/* checkout button */}
                                <Button variant='success' onClick={checkout}>Checkout</Button>
                            </div>
                            :
                            <div className='modalText'>
                                <p>Your Cart Is Empty!</p>
                            </div>
                        }
                    </Modal.Body>
                </Modal>

            </Navbar>
        </div>
    );
};

export default NaviBar;