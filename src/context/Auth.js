import React, { createContext, useState, useEffect, useContext } from "react"
import axiosInstance from "../hooks/axios"
import { useAppData } from "../hooks/app-data"
import * as SecureStore from 'expo-secure-store';
import { AppContext } from "./AppData";
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from "react-native"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [token, setToken] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(null)
    const [init, setInit] = useState(false)






    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                isLoading,
                setIsLoading,
                token,
                setToken,
                isAuthenticated,
                setIsAuthenticated,
                init,
                setInit
            }}
        >
            <AuthLoader>
                {children}
            </AuthLoader>
        </AuthContext.Provider>
    )
}




const AuthLoader = ({ children }) => {
    const { user,
        setUser,
        isLoading,
        setIsLoading,
        token,
        setToken,
        isAuthenticated,
        init,
        setIsAuthenticated } = useContext(AuthContext)

    const { getNews, getPrayers, getTestimonies, getMeetings, getUsers, getChatUsers, getNotes } = useAppData()
    const { setPrayers, setTestimonies, setNews, setMeetings, setUsers, setChatUsers, setNotes } = useContext(AppContext);

    async function getAuthUser(authToken) {
        try {
            const response = await axiosInstance.get("/users/auth", {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            const { status } = response.data;
            if (status) {
                await SecureStore.setItemAsync("mothersUser", JSON.stringify(response.data.payload));
                setUser(response.data.payload)
                return {
                    status: true,
                    data: response.data.payload,
                };
            } else {
                setUser(null)
                return {
                    status: false,
                    data: response.data.payload,
                };
            }
        } catch (error) {
            setUser(null)
            return {
                status: false,
                data: error.message,
            };
        }
    }

    async function getAppData() {
        try {
            const prayers = await SecureStore.getItemAsync("prayers");
            const testimonies = await SecureStore.getItemAsync("testimonies");
            const news = await SecureStore.getItemAsync("news");
            const meetings = await SecureStore.getItemAsync("meetings");
            const users = await SecureStore.getItemAsync("users");
            const chatUsers = await SecureStore.getItemAsync("chatusers");
            const notes = await SecureStore.getItemAsync("notes");
            if (prayers) {
                setPrayers(JSON.parse(prayers))
                getPrayers()
            } else {
                await getPrayers()
            }
            if (testimonies) {
                setTestimonies(JSON.parse(testimonies))
                getTestimonies()
            } else {
                await getTestimonies()
            }
            if (news) {
                setNews(JSON.parse(news))
                getNews()
            } else {
                await getNews()
            }
            if (meetings) {
                setMeetings(JSON.parse(meetings))
                getMeetings()
            } else {
                await getMeetings()
            }
            if (users) {
                setUsers(JSON.parse(users))
                getUsers()
            } else {
                await getUsers()
            }
            if (chatUsers) {
                setChatUsers(JSON.parse(chatUsers))
                getChatUsers()
            } else {
                await getChatUsers()
            }
            if (notes) {
                setNotes(JSON.parse(notes))
                getNotes()
            } else {
                await getNotes()
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function getUser(authToken) {
        try {
            const user = await SecureStore.getItemAsync("mothersUser");
            if (user) {
                setUser(JSON.parse(user))
                getAuthUser(authToken)
            } else {
                await getAuthUser(authToken)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        async function setup() {
            setIsLoading(true)
            try {
                const authToken = await SecureStore.getItemAsync("mothersToken");
                if (authToken) {
                    setToken(authToken)
                } else {
                    setToken(false)
                }
            } catch (error) {

            }
        }
        setup()
    }, [init])

    useEffect(() => {
        async function setup() {
            if (token) {
                await getAppData()
                await getUser(token)
                setIsAuthenticated(true)
            } else if (token === false) {
                setIsAuthenticated(false)
            }
        }
        setup()
    }, [token])

    useEffect(() => {
        if (isAuthenticated !== null) {
            setIsLoading(false)
        }
    }, [isAuthenticated])
    return (
        <>
            {
                !isLoading && children
            }
            {
                isLoading && (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator size="large" color="#FF392B" />
                        <Text style={{ color: "#FF392B", fontWeight: "bold", fontSize: 26 }}>
                            Welcome
                        </Text>
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                            Mothers Online Fellowship
                        </Text>
                    </View>
                )
            }
        </>
    )
}
