import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import tw from 'twrnc';
import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';


const Banner = () => {
    const navigation = useNavigation();
    return (
        <>
            <View style={tw`mx-5 my-2 bg-[#193296] p-3 rounded-md`}>
                <View style={tw`flex-row `} >
                    <View>
                        <Feather name="video" style={tw`mt-3`} size={36} color="white" />
                    </View>
                    <View style={tw`ml-3`}>
                        <Text style={tw`text-2xl font-bold text-white`}>Next Meeting</Text>
                        <Text style={tw`text-gray-300`}>Topic: Healing from the inside</Text>
                    </View>
                </View>
                <View style={tw`flex-row justify-between mt-5`} >

                    <TouchableOpacity style={tw`bg-gray-200 w-28 rounded p-2`}>
                        <Text style={tw` text-center`} >Join Now</Text>
                    </TouchableOpacity>
                    <Text style={tw`text-gray-300 mt-3`}>
                        4th Jun 2023
                    </Text>
                </View>
            </View>

            <View style={tw`flex-row justify-between mx-5 mb-5`}>
                <TouchableOpacity style={tw`bg-[#FE7D06] w-28 rounded p-2`}>
                    <Text style={tw`text-center`}>Support Us</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`border border-[#193296] rounded p-2`}>
                    <Text style={tw`text-white text-[#193296]`} >Find Members</Text>
                </TouchableOpacity>
            </View>



        </>
    )
}

export default Banner;