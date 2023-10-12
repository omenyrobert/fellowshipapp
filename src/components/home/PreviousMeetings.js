import { View, Text, SafeAreaView, TouchableOpacity } from "react-native"
import tw from 'twrnc';
import { Feather, FontAwesome } from '@expo/vector-icons';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../../context/Auth";
import { useAppData } from "../../hooks/app-data";
import { AppContext } from "../../context/AppData";

const PreviousMeeting = () => {
    const { user } = useContext(AuthContext)
    const { meetings } = useContext(AppContext)
    const { getMeetings } = useAppData()

    useEffect(() => {
        getMeetings()
    }, [])


    return (

        <View>
            <Text style={tw`font-medium ml-5 mt-8 text-xl`}>
                Previous Meeting
            </Text>
            {meetings.map((item) => {
                if (new Date(item.end_time).toLocaleString() > new Date().toLocaleString()) {
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
                            <TouchableOpacity
                                onPress={async () => {
                                    await WebBrowser.openBrowserAsync(item.meeting_link)
                                }}
                                style={
                                    new Date(item.end_time).toLocaleString() < new Date().toLocaleString() ? tw`ml-5 py-1 px-2 rounded bg-red-700` : tw`ml-5 py-1 px-2 rounded bg-blue-700`
                                }>
                                <Text
                                    style={tw`text-white font-medium`}
                                >

                                    {
                                        new Date(item.end_time).toLocaleString() < new Date().toLocaleString() ? " Ended" : "Join Meeting"
                                    }
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                )
            })}
            <View style={{ height: 100 }}>

            </View>
        </View>

    )
}
export default PreviousMeeting