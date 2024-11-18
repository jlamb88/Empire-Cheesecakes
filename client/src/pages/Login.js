import React, { useContext, useState } from 'react';
import LoginForm from '../components/LoginForm';
import NaviBar from '../components/Navbar';
import Header from '../components/Header';
import { UserPage } from './';
import { Row, Col, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

const adminUser = { email: 'admin@admin.com', password: 'admin' };


const LoginUser = () => {
    const [loginUserMutation] = useMutation(LOGIN_USER)
    const { userInfo, setUserInfo, loggedIn, setLoggedIn } = useAuth()


    const login = async (details) => {
        try {
            const { data } = await loginUserMutation({
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
                console.log('User logged in!');
                setLoggedIn(true)
                setUserInfo({
                    userId: data.login.user._id,
                    token: data.login.token,
                    firstName: data.login.user.firstName,
                    lastName: data.login.user.lastName
                })
            }

        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const logout = async () => {
        setLoggedIn(false)
        setUserInfo({ userId: null, token: null });
    }

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
                    <h2>
                        Welcome, <span>{userInfo.firstName}!</span>
                    </h2>
                    <Button className='formButton' variant="secondary" type="submit" onClick={logout}>Logout</Button>
                    {/* <UserPage /> */}
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