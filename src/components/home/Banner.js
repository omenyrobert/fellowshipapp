
import { View, Text, TouchableOpacity, ImageBackground, TextInput, Image } from "react-native";
import tw from 'twrnc';
import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import React, { useState, useEffect, useContext } from 'react';
import axiosInstance, { UPLOADS_URL } from "../../hooks/axios";
import { AuthContext } from "../../context/Auth";
import { useAppData } from "../../hooks/app-data";
import { AppContext } from "../../context/AppData";


const Banner = () => {
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);
    const { news } = useContext(AppContext);
    const { getNews } = useAppData();


    useEffect(() => {
        getNews()
    }, [])



    return (
        <>

            <Swiper style={tw`h-56`} autoplay={true} showsButtons={false}>
                {news.slice(0, 5).map((pray) => {
                    return (
                        <ImageBackground
                            key={pray.id}
                            source={{ uri: pray.image }} // Replace with your image path or URL
                            style={{ margin: 20, borderRadius: 20 }}
                        >
                            <View style={tw`rounded-lg h-40 p-5 bg-black/50`}>
                                <View style={tw`h-20`}>

                                </View>
                                <View style={tw`flex-row justify-between`}>
                                    <Text style={tw`text-lg font-bold text-white`}>
                                        {pray.title}
                                    </Text>
                                    <Text style={tw`text-white p-2 rounded-md text-xs bg-[#FF392B]`}>
                                        {
                                            new Date(pray.date).toLocaleDateString()
                                        }
                                    </Text>
                                </View>

                                <Text style={tw`text-white`} numberOfLines={1} ellipsizeMode='tail'>
                                    {pray.description}
                                </Text>

                            </View>
                        </ImageBackground>
                    )
                })}


            </Swiper>
            
            <View style={tw`flex-row justify-between mx-5`}>
                <TouchableOpacity onPress={() => navigation.navigate('Give')} style={tw`bg-[#FF392B] w-28 rounded p-2`}>
                    <Text style={tw`text-center text-white`}>Support Us</Text>
                </TouchableOpacity>
            </View>







        </>
    )
}

export default Banner;