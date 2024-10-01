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

    const cart = useCart()

    console.log("useAuth:", userInfo, loggedIn)

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
            <div>
                <Button variant="secondary" type='button' size='lg' onClick={logout}>Logout</Button>
            </div>
        </div>

    )
}

export default UserPage