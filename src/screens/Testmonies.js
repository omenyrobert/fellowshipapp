import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import HomeHeader from "../components/HomeHeader"
import tw from 'twrnc';
import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from "../hooks/axios";
import { AuthContext } from "../context/Auth";
import { useAppData } from "../hooks/app-data";
import { AppContext } from "../context/AppData";


const Testimonies = () => {
    const [testimony, setTestimony] = useState('')
    const { testimonies } = useContext(AppContext)
    const { user } = useContext(AuthContext)
    const [myTestimonies, setMyTestimonies] = useState([])
    const { getTestimonies } = useAppData()

    useEffect(() => {
        const myTestimonies_ = testimonies.filter((item) => {
            return item.user.id === user.id
        })
        setMyTestimonies(myTestimonies_)
    }

        , [testimonies])

    useEffect(() => {
        getTestimonies()
    }, [])

    async function submitTestimony() {
        try {
            const response = await axiosInstance.post('/testimonies/create', {
                testimony: testimony,
                user: user.id
            })

            const { status, payload } = response.data

            if (status) {
                setTestimony('')
                getTestimonies()
                alert("Testimony sent successfully")
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
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#FF392B' }}>Testimonies</Text>
                    <Text style={{ marginTop: 20, fontSize: 18 }}>Testify for the Lord</Text>
                    <TextInput
                        placeholder="Type your testimony"
                        style={tw`bg-gray-200 p-5 my-2 rounded-md`}
                        multiline
                        numberOfLines={4}
                        value={testimony}
                        onChangeText={(text) => setTestimony(text)}

                    />

                    <TouchableOpacity
                        style={tw`bg-[#FF392B] mt-2 p-2 rounded-md`}
                        onPress={submitTestimony}
                    >
                        <Text style={tw`text-white text-center font-bold text-lg`}>Submit</Text>
                    </TouchableOpacity>

                    <Text style={{ fontSize: 18, marginTop: 20, fontWeight: 'medium', color: '#3326AE' }}>My Testimonies</Text>

                    <View style={tw` mt-5`}>

                        {testimonies.map((item) => {
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
                                            {item.testimony}
                                        </Text>
                                    </View>
                                    <View style={tw`w-10`}>

                                    </View>

                                </View>
                            )
                        })}

                    </View>

                    <Text style={{ fontSize: 18, marginTop: 20, fontWeight: 'medium', color: '#3326AE' }}>All Testimonies</Text>
                    <View style={tw` mt-5`}>

                        {myTestimonies.map((item) => {
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
                                            {item.testimony}
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
export default Testimonies