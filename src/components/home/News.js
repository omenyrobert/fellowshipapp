import { View, Text, Image } from "react-native";
import tw from 'twrnc';
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useContext } from 'react';
import axiosInstance, { UPLOADS_URL } from "../../hooks/axios";
import { AuthContext } from "../../context/Auth";
import { useAppData } from "../../hooks/app-data";
import { AppContext } from "../../context/AppData";


const News = () => {
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);
    const { testimonies } = useContext(AppContext);
    const { getTestimonies } = useAppData();

    useEffect(() => {
        getTestimonies()
    }, [])

    return (
        <>
            <Text style={tw`font-medium ml-5 mt-5 text-xl`}>
                Testimonies
            </Text>
            <View style={tw`mx-2 mt-2`}>

                {testimonies.map((item) => {
                    return (

                        <View key={item.id} style={tw`flex-row  m-2 border-b pb-2 border-gray-200`}>
                            <View style={tw`bg-gray-100 h-14 w-14 rounded-full  p-1 border border-[#3326AE]`}>
                                <Image source={{
                                    uri: item.user.profile_picture
                                }} style={{ objectFit: 'cover', height: '100%', width: '100%', borderRadius: 100 }} />

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
        </>
    )
}


export default News;