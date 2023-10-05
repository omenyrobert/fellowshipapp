import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import HomeHeader from "../components/HomeHeader"
import tw from 'twrnc';
import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from "../hooks/axios";
import { AuthContext } from "../context/Auth";
import { useAppData } from "../hooks/app-data";



const Prayer = () => {
    const [prayer, setPrayer] = useState('')
    const { user } = useContext(AuthContext)
    const { getPrayers } = useAppData()
    const prayers = [
        {
            id: 1,
            name: 'Mercy Hut',
            description: 'I thank God for saving my son in a car accident last week',
            photo: 'https://media.istockphoto.com/id/1412450902/photo/african-beauty-woman-face-profile-natural-curly-afro-hairstyle-over-white-isolated-fashion.jpg?s=612x612&w=0&k=20&c=oe4sJL-yCi--R9RewYbhovlYN2WaJ_T7tp9pf_OSlzU=',
        },
        {
            id: 2,
            name: 'Akao Teddy',
            description: 'My daughter was admited in University in USA',
            photo: 'https://media.istockphoto.com/id/534308672/photo/beautiful-young-african-woman-laughing-outdoors.jpg?s=612x612&w=0&k=20&c=TtvBLZvZDCD-_XcIv27E3Oq3-yJredgR3EaQXACsOck=',
        },
        {
            id: 3,
            name: 'Nakalema Jane',
            description: 'We had court case about our land that the God helped us to win',
            photo: 'https://media.istockphoto.com/id/1471295100/photo/senior-black-woman-wearing-white-glasses.jpg?s=612x612&w=0&k=20&c=rdnzD53iVZkXa7O_3qLX-duYLn8q9qPeqyOa4Hbpd7E=',
        },
        {
            id: 4,
            name: 'Julian Mukibi',
            description: 'We bought a new house for our retirement in Gulu',
            photo: 'https://media.istockphoto.com/id/1340257475/photo/young-black-african-woman-explaining-on-video-call-job-interview-why-is-she-the-best-choice.jpg?s=612x612&w=0&k=20&c=VtNFp4dT1a-ivLF-4CIWMT5SNfhSqN4v3qtMoeNuZ6Y=',
        },
        {
            id: 5,
            name: 'Hellen Lukoma',
            description: 'I want to thank God for the Job that my Husband got',
            photo: 'https://media.istockphoto.com/id/1465454175/photo/portrait-of-beautiful-black-millennial-entrepreneur-woman-with-an-afro-hairstyle-and-looking.jpg?s=612x612&w=0&k=20&c=jtvDUfJGhxlT6S5vCgdhe7NNeOfCM4n4rmjvUuZGfWk=',
        }

    ]

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

                        {prayers.map((item) => {
                            return (

                                <View key={item.id} style={tw`flex-row  m-2 border-b pb-2 border-gray-200`}>
                                    <View style={tw`bg-gray-100 h-14 w-14 rounded-full  p-1 border border-[#3326AE]`}>
                                        <Image source={{ uri: item.photo }} style={{ objectFit: 'cover', height: '100%', width: '100%', borderRadius: 100 }} />

                                    </View>

                                    <View style={tw`mx-2 w-[70%] `}>

                                        <Text style={tw`text-[#3326AE] font-bold`}>
                                            {item.name}
                                        </Text>

                                        <Text style={tw`text-gray-600`}>
                                            {item.description}
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
                                        <Image source={{ uri: item.photo }} style={{ objectFit: 'cover', height: '100%', width: '100%', borderRadius: 100 }} />

                                    </View>

                                    <View style={tw`mx-2 w-[70%] `}>

                                        <Text style={tw`text-[#3326AE] font-bold`}>
                                            {item.name}
                                        </Text>

                                        <Text style={tw`text-gray-600`}>
                                            {item.description}
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