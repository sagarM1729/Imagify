import React, { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);

    const login = (userData) => {
        setUser(userData);
        setShowLogin(false);
    };

    const logout = () => {
        setUser(null);
    };

    const openLogin = () => {
        setShowLogin(true);
    };

    const closeLogin = () => {
        setShowLogin(false);
    };

    const value = {
        user, 
        setUser,
        showLogin,
        setShowLogin,
        login,
        logout,
        openLogin,
        closeLogin
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;