import React, { useState } from 'react';
import SignupForm from '../components/SignupForm';
import { useAuth } from '../contexts/AuthContext'

const SignUp = () => {
    const { userInfo, setUserInfo, loggedIn, setLoggedIn } = useAuth()

    return (
        <SignupForm />
        // <div>
        //     <div>
        //         <label htmlFor="email">Email: </label>
        //         <input type="email" name="email" onChange={e => setUser({...user, email: e.target.value})} value={user.email} />
        //     </div>
        //     <div>
        //         <label htmlFor="password">Password: </label>
        //         <input type="password" name="password" onChange={e => setUser({...user, password: e.target.value})} value={user.password} />
        //     </div>
        //     <div>
        //         <input type="submit" value="user" />
        //     </div>

        // </div>
    )
}

export default SignUp;