import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import tw from 'twrnc';
import { Feather, FontAwesome } from '@expo/vector-icons';
import HomeHeader from "../components/HomeHeader";
import Banner from "../components/home/Banner";
import React, { useState, useEffect, useContext } from 'react';
import axiosInstance, { UPLOADS_URL } from "../hooks/axios";
import { AuthContext } from "../context/Auth";
import { useAppData } from "../hooks/app-data";
import { AppContext } from "../context/AppData";
import * as WebBrowser from 'expo-web-browser';

const Meeting = () => {
    const { user, token } = useContext(AuthContext)
    const { meetings } = useContext(AppContext)
    const { getMeetings } = useAppData()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getMeetings()
    }, [])

    async function addParciptiant(meeting) {
        try {
            setLoading(true)
            const response = await axiosInstance.post("/meetings/add-participant", {
                meetingId: meeting.id,
                userId: user.id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const { status, payload } = response.data
            if (status) {
                await WebBrowser.openBrowserAsync(meeting.meeting_link)
            } else {
                alert(payload)
            }
        } catch (error) {
            console.log(error)
            alert("Something went wrong")
        }
        setLoading(false)
    }


    return (
        <SafeAreaView style={{ backgroundColor: '#fff' }}>
            <HomeHeader />
            <ScrollView>
                <Banner />
                <View>
                    <Text style={tw`font-medium ml-5 mt-5 text-xl`}>
                        Scheduled Meetings
                    </Text>
                    <View style={tw`bg-white mt-2`}>

                        {meetings.map((item) => {
                            if (new Date(item.end_time).getTime() < new Date().getTime()) {
                                return null
                            }
                            return (
                                <View key={item.id} style={tw`p-3 rounded-md border-b border-gray-200 mx-5 my-2`}>
                                    <View style={tw``}>
                                        <View style={tw`flex-row`}>
                                            <View style={tw`mt-1`}>
                                                <Feather name="video" size={24} color="blue" />
                                            </View>
                                            <View style={tw`ml-2`}>
                                                <Text style={tw`text-lg font-medium -mt-1`}>
                                                    {item.title}
                                                </Text>
                                                <Text style={tw`ml-5 py-1 px-2 rounded text-gray-700 bg-gray-100`}>
                                                    {
                                                        new Date(item.start_time).toLocaleString()
                                                    }
                                                </Text>
                                            </View>


                                        </View>


                                    </View>
                                    <View style={tw`flex-row mt-5`}>
                                        <Text
                                            style={tw`ml-5 text-gray-700`}
                                        >
                                            {item.description}
                                        </Text>
                                    </View>
                                    <View style={tw`flex-row mt-5`}>
                                        {
                                            loading === false ? (
                                                <TouchableOpacity
                                                    onPress={async () => {
                                                        addParciptiant(item)
                                                    }}
                                                    style={
                                                        new Date(item.end_time).getTime() < new Date().getTime() ? tw`ml-5 py-1 px-2 rounded bg-red-700` : tw`ml-5 py-1 px-2 rounded bg-blue-700`
                                                    }>
                                                    <Text
                                                        style={tw`text-white font-medium`}
                                                    >

                                                        {
                                                            new Date(item.end_time).getTime() < new Date().getTime() ? "Ennded" : "Join Meeting"
                                                        }
                                                    </Text>
                                                </TouchableOpacity>
                                            ) : (
                                                <View style={tw`ml-5 py-1 px-2 rounded bg-blue-700`}>
                                                    <ActivityIndicator color="#fff" />
                                                </View>
                                            )
                                        }

                                    </View>

                                </View>
                            )
                        })}
                    </View>
                </View>
                <View style={{ height: 100 }}>

                </View>
            </ScrollView>
        </SafeAreaView>


    )
}
export default Meeting