import React, { useState, useContext, useEffect } from 'react'
import { useLazyQuery, useQuery, useMutation } from '@apollo/client'
import Header from '../components/Header'
import Navibar from '../components/Navbar'
import { Row, Col, Button } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { USER_ORDER } from '../utils/queries'
import { ADD_CART } from '../utils/mutations'
import { useCart } from '../contexts/CartContext'

const UserPage = () => {

    const { setUserInfo, userInfo, loggedIn, setLoggedIn } = useAuth()
    const [getUserOrders, { data: orderHist }] = useLazyQuery(USER_ORDER, { variables: { userId: userInfo.userId } })

    const cart = useCart()

    useEffect(() => {
        async function fetchData() {
            console.log("order user", userInfo.userId)
            await getUserOrders()

            console.log("user Orders:", orderHist)
        }
        fetchData()
    }, [getUserOrders, orderHist, userInfo])

    const [addCart] = useMutation(ADD_CART)

    const logout = async () => {
        if (cart.items.length > 0) {
            await addCart({
                variables: {
                    userId: userInfo.userId,
                    cartContents: cart.items
                }
            })
        }
        cart.deleteCart()
        setLoggedIn(false)
        setUserInfo({ userId: null, token: null });
    }


    return (

        <div>
            <h1 className='welcome'>Welcome, {userInfo.firstName}!</h1>
            {orderHist && (
                <div>
                    <h3 className='orderHistory'>Order History: </h3>
                    {orderHist.map((order) => (
                        <Row key={order._id}> {/* Add a unique key for each element in the array */}
                            <Col>{order.products.productId}</Col>
                            <Col>{order.products.name}</Col>
                            <Col>{order.total}</Col>
                            <Col>{order.orderedAt}</Col> {/* Fix typo: order.orderAt to order.orderedAt */}
                        </Row>
                    ))}
                </div>
            )}
            <div>
                <Button className='formButton' variant="secondary" type="submit" onClick={logout}>Logout</Button>
            </div>
        </div>

    )
}

export default UserPage