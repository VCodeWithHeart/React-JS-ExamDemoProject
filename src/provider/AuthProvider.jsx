import axios from 'axios'
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"))

    const tokenSetter = (newToken) => {
        setToken(newToken)
    }

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer" + token
            localStorage.setItem("token", token)
        }
        else {
            delete axios.defaults.headers.common["Authorization"]
            localStorage.removeItem("token")
        }
    }, [token])

    const contextValue = useMemo(() => ({ token, tokenSetter }), [token])

    return (
        <>
            <AuthContext.Provider value={contextValue}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthProvider