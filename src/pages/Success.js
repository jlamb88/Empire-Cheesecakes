import React, { useEffect, useContext } from 'react';
import { Row, Col } from 'react-bootstrap'
import { useMutation, useLazyQuery } from '@apollo/client';
import NaviBar from '../components/Navbar'
import Header from '../components/Header'
import { useAuth } from '../contexts/AuthContext';

import { USER_CART } from '../utils/queries'; // Update with correct paths
import { ADD_ORDER, DELETE_CART } from '../utils/mutations'

const Success = () => {
    const { userInfo, setUserInfo, loggedIn, setLoggedIn } = useAuth();
    const [addOrderMutation] = useMutation(ADD_ORDER);
    const [deleteCartMutation] = useMutation(DELETE_CART);
    const [getUserCart, { data: userCart }] = useLazyQuery(USER_CART,
        {
            variables: {
                userId: userInfo.userId
            }
        })

    const stripeSession = JSON.parse(sessionStorage.getItem('stripeSession'))
    const restoreUser = JSON.parse(sessionStorage.getItem('userInfo'));

    // useEffect(async () => {
    //     await setUserInfo(restoreUser)
    //     setLoggedIn(true)
    // }, [setUserInfo])

    // useEffect(async () => {
    //     console.log("getCart: ", userInfo)
    //     await getUserCart()
    //     console.log("user cart: ", userCart)
    // }
    //     , [setUserInfo, userInfo, getUserCart, userCart])

    // useEffect(async () => {
    //     console.log("order and delete: ", userCart)

    //     await addOrderMutation({
    //         variables: {
    //             userId: userInfo.userId,
    //             orderItems: userCart.cart.items.map((currentProduct) => ({
    //                 productId: currentProduct.productId,
    //                 quantity: currentProduct.quantity,
    //             })),
    //             total: stripeSession.checkoutSession.total,
    //             transId: stripeSession.checkoutSession.transId//cartCntxt.getTotalCost(userCart.cart.items),
    //         }
    //     })

    //     await deleteCartMutation({
    //         variables: {
    //             userId: userInfo.userId
    //         }
    //     })

    // }, [getUserCart, userCart, addOrderMutation, deleteCartMutation])
    useEffect(() => {
        const handleSuccess = async () => {
            setUserInfo(restoreUser);
            setLoggedIn(true);
            console.log("user Info:", userInfo)
            console.log("loggedIn: ", loggedIn)

            // Fetch the user's cart
            Promise.resolve()
                .then(() => {
                    return getUserCart({
                        variables: {
                            userId: userInfo.userId,
                        },
                    });

                })
                .then(({ data }) => {
                    const cartItems = data.userCart.cart.items;
                    console.log("cartItems: ", cartItems)

                    // Create an order based on the cart
                    return addOrderMutation({
                        variables: {
                            userId: restoreUser.userId,
                            orderItems: cartItems.map((item) => ({
                                productId: item.productId,
                                quantity: item.quantity,
                            })),
                            total: stripeSession.checkoutSession.total,
                            transId: stripeSession.checkoutSession.transId,
                        },
                    });
                })
                // Delete the cart after successful order creation
                .then(() => {
                    return deleteCartMutation({
                        variables: {
                            userId: restoreUser.userId,
                        },
                    });
                })
                .catch((error) => {
                    {
                        console.error('Error during success flow:', error);
                    }
                })

        }
    }, [setUserInfo, setLoggedIn, getUserCart, addOrderMutation, deleteCartMutation]);

    return (
        <div>
            <Row>
                <Col>
                    <Header />
                </Col>
                <Col className='mt-3 justify-content-right'>
                    <NaviBar />
                </Col>
            </Row>
            <h1>Your purchase was successful, {userInfo.firstName}!</h1>
            <br></br>
            <h2>Confirmation code: {stripeSession.checkoutSession.transId}</h2>
        </div>

    );
};

export default Success;