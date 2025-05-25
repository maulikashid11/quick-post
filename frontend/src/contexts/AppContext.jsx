import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [loginOpen, setLoginOpen] = useState(false)
    const [user, setUser] = useState(null)
    const value = {
        loginOpen, setLoginOpen, user, setUser
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}