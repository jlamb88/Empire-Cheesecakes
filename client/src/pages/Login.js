import React, { useContext, useState } from 'react';
import LoginForm from '../components/LoginForm';
import NaviBar from '../components/Navbar';
import Header from '../components/Header';
import { UserPage } from './';
import { Row, Col, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext'
import { useMutation, useLazyQuery } from '@apollo/client';
import { LOGIN_USER, ADD_CART } from '../utils/mutations';
import { USER_CART } from '../utils/queries'

const adminUser = { email: 'admin@admin.com', password: 'admin' };


const LoginUser = () => {
    const [loginUserMutation] = useMutation(LOGIN_USER)
    const { userInfo, setUserInfo, loggedIn, setLoggedIn } = useAuth()
    const cart = useCart()

    const [getUserCart, { data: userCart }] = useLazyQuery(USER_CART, { variables: { userId: userInfo.userId } })
    const [addCart] = useMutation(ADD_CART)


    const login = async (details) => {
        try {
            const { data: loginData } = await loginUserMutation({
                variables: {
                    email: details.email,
                    password: details.password,
                },
            });

            if (details.email === adminUser.email && details.password === adminUser.password) {
                console.log('Admin logged in!');
                setLoggedIn(true)
                setUserInfo({
                    userId: 'admin',
                    token: 'adminToken'
                });
            } else {
                setLoggedIn(true)
                await setUserInfo({
                    userId: loginData.login.user._id,
                    token: loginData.login.token,
                    firstName: loginData.login.user.firstName,
                    lastName: loginData.login.user.lastName
                })
                await getUserCart()
                console.log("login:", userInfo.userId, loginData)
                console.log("cart query:", userInfo.userId, userCart)
            }

        } catch (Error) {
            console.error('Login error:', Error);
            throw Error
        }
    };

    // const logout = async () => {
    //     if (cart.items.length > 0) {
    //         await addCart({ variables: { userId: userInfo.userId } })
    //     }
    //     cart.deleteCart()
    //     setLoggedIn(false)
    //     setUserInfo({ userId: null, token: null });
    // }

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

            {loggedIn ? (
                <div className="welcome">
                    {/* //     <h2>
                //         Welcome, <span>{userInfo.firstName}!</span>
                //     </h2> */}
                    <UserPage />
                    {/* // <Button className='formButton' variant="secondary" type="submit" onClick={logout}>Logout</Button> */}

                </div>
            ) : (
                <div>
                    <LoginForm login={login} />
                </div>
            )}
        </div>
    );
};

export default LoginUser;