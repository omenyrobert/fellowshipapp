import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import HomeHeader from "../components/HomeHeader"
import tw from 'twrnc';
import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from "../hooks/axios";
import { AuthContext } from "../context/Auth";
import { useAppData } from "../hooks/app-data";
import { AppContext } from "../context/AppData";



const Prayer = () => {
    const [prayer, setPrayer] = useState('')
    const { user } = useContext(AuthContext)
    const { prayers } = useContext(AppContext)
    const { getPrayers } = useAppData()
    const [myPrayers, setMyPrayers] = useState([])

    useEffect(() => {
        const myPrayers_ = prayers.filter((item) => {
            return item.user.id === user.id
        })
        setMyPrayers(myPrayers_)
    }, [prayers])



    useEffect(() => {
        getPrayers()
    }
        , [])


    async function submitPrayer() {
        try {
            const response = await axiosInstance.post('/prayer-requets/create', {
                request: prayer,
                user: user.id
            })

            const { status, payload } = response.data

            if (status) {
                setPrayer('')
                getPrayers()
                alert("Prayer request sent successfully")
            } else {
                alert(payload)
            }
        } catch (error) {
            alert(error.message)
        }
    }
    return (
        <SafeAreaView style={{ backgroundColor: '#fff' }}>
            <HomeHeader />
            <ScrollView style={{ backgroundColor: '#f5f5f5' }}>
                <View style={{ padding: 20 }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#FF392B' }}>Prayer Requests</Text>
                    <Text style={{ marginTop: 20, fontSize: 18 }}>Send your prayer request</Text>
                    <TextInput
                        placeholder="Prayer request here"
                        style={tw`bg-gray-200 p-5 my-2 rounded-md`}
                        multiline
                        numberOfLines={8}
                        onChangeText={(text) => setPrayer(text)}

                    />

                    <TouchableOpacity
                        style={tw`bg-[#FF392B] mt-2 p-2 rounded-md`}
                        onPress={() => submitPrayer()}
                    >
                        <Text style={tw`text-white text-center font-bold text-lg`}>Submit</Text>
                    </TouchableOpacity>

                    <Text style={{ fontSize: 18, marginTop: 20, fontWeight: 'medium', color: '#3326AE' }}>My Prayer Requests</Text>

                    <View style={tw` mt-5`}>

                        {myPrayers.map((item) => {
                            return (

                                <View key={item.id} style={tw`flex-row  m-2 border-b pb-2 border-gray-200`}>
                                    <View style={tw`bg-gray-100 h-14 w-14 rounded-full  p-1 border border-[#3326AE]`}>
                                        <Image source={{ uri: item.user?.profile_picture }} style={{ objectFit: 'cover', height: '100%', width: '100%', borderRadius: 100 }} />

                                    </View>

                                    <View style={tw`mx-2 w-[70%] `}>

                                        <Text style={tw`text-[#3326AE] font-bold`}>
                                            {item.user.full_name}
                                        </Text>

                                        <Text style={tw`text-gray-600`}>
                                            {item.request}
                                        </Text>
                                    </View>
                                    <View style={tw`w-10`}>

                                    </View>

                                </View>
                            )
                        })}

                    </View>

                    <Text style={{ fontSize: 18, marginTop: 20, fontWeight: 'medium', color: '#3326AE' }}>All Prayer Requests</Text>
                    <View style={tw` mt-5`}>

                        {prayers.map((item) => {
                            return (

                                <View key={item.id} style={tw`flex-row  m-2 border-b pb-2 border-gray-200`}>
                                    <View style={tw`bg-gray-100 h-14 w-14 rounded-full  p-1 border border-[#3326AE]`}>
                                        <Image source={{ uri: item.user?.profile_picture }} style={{ objectFit: 'cover', height: '100%', width: '100%', borderRadius: 100 }} />

                                    </View>

                                    <View style={tw`mx-2 w-[70%] `}>

                                        <Text style={tw`text-[#3326AE] font-bold`}>
                                            {item.user.full_name}
                                        </Text>

                                        <Text style={tw`text-gray-600`}>
                                            {item.request}
                                        </Text>
                                    </View>
                                    <View style={tw`w-10`}>

                                    </View>

                                </View>
                            )
                        })}

                    </View>
                </View>
                <View style={{ height: 200 }}>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Prayer


