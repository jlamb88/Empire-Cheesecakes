import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [loggedIn, setLoggedIn] = useState()

    const contextValue = {
        userInfo,
        loggedIn,
        setUserInfo,
        setLoggedIn
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};


export default AuthProvider;