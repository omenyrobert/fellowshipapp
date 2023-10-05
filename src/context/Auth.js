import React, { createContext, useState } from "react"
import axiosInstance from "../hooks/axios"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [token, setToken] = useState(null)


    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                isLoading,
                setIsLoading,
                token,
                setToken
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
