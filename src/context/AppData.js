import React, { createContext, useState, useContext, useEffect } from "react"
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as SecureStore from 'expo-secure-store';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync({ projectId: '1edc0255-01f1-485a-90f7-b7d6e426df52' })).data;
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token;
}

export const AppContext = createContext({})

export function AppCtxProvider({ children }) {
    const [expoPushToken, setExpoPushToken] = useState(null);
    const [prayers, setPrayers] = useState([])
    const [testimonies, setTestimonies] = useState([])
    const [news, setNews] = useState([])
    const [meetings, setMeetings] = useState([])
    const [users, setUsers] = useState([])
    const [chatUsers, setChatUsers] = useState([])
    const [notes, setNotes] = useState([])

    useEffect(() => {
        async function getAndSaveToken() {
            let result = await SecureStore.getItemAsync("expoPushToken");
            if (!result) {
                result = await registerForPushNotificationsAsync();
                await SecureStore.setItemAsync("expoPushToken", result);
            }
            setExpoPushToken(result);
        }
        getAndSaveToken();
    }, []);



    return (
        <AppContext.Provider value={{
            expoPushToken,
            prayers,
            setPrayers,
            testimonies,
            setTestimonies,
            news,
            setNews,
            meetings,
            setMeetings,
            users,
            setUsers,
            chatUsers,
            setChatUsers,
            notes,
            setNotes
        }}>
            {children}
        </AppContext.Provider>
    )
}