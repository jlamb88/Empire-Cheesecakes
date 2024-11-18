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

    useEffect(async () => {
        await setUserInfo(restoreUser)
        setLoggedIn(true)
    }, [setUserInfo, getUserCart, addOrderMutation])

    useEffect(async () => {
        if (userInfo) {
            await getUserCart()
        }
    }, [setUserInfo, getUserCart, addOrderMutation])

    useEffect(async () => {
        if (userCart) {

            await addOrderMutation({
                variables: {
                    userId: userInfo.userId,
                    orderItems: userCart.cart.items.map((currentProduct) => ({
                        productId: currentProduct.productId,
                        quantity: currentProduct.quantity,
                    })),
                    total: stripeSession.checkoutSession.total,
                    transId: stripeSession.checkoutSession.transId//cartCntxt.getTotalCost(userCart.cart.items),
                }
            })

            await deleteCartMutation({
                variables: {
                    userId: userInfo.userId
                }
            })
        }
    }, [getUserCart, userCart])

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
            <h4>Confirmation code: {stripeSession.checkoutSession.transId}</h4>
        </div>

    );
};

export default Success;