import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import tw from 'twrnc';
import { Feather, FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import HomeHeader from "../components/HomeHeader";
import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from "../hooks/axios";
import { AuthContext } from "../context/Auth";
import { useAppData } from "../hooks/app-data";
import { AppContext } from "../context/AppData";
import * as ImagePicker from 'expo-image-picker';
import { HOST_URL } from "../shared/constants";
import mime from "mime";


const Profile = ({ navigation }) => {
    const { user, token } = useContext(AuthContext);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setImage(user?.profile_picture);
    }, [user]);


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


        if (!result.canceled) {
            updateProfile(result.assets[0]);
        }
    };

    async function updateProfile(image) {
        setLoading(true);
        if (!image) {
            Alert.alert("Error", "Please select an image");
            setLoading(false);
            return;
        }
        const formData = new FormData();
        formData.append('photo', {
            uri: image.uri,
            type: mime.getType(image.uri),
            name: image.uri.split('/').pop(),
        });

        try {
            const response = await fetch(HOST_URL + "/api/users/profilepicture", {
                method: 'POST',
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            })
            const res = await response.json();
            const { status, payload } = res;

            if (status) {
                setImage(payload.profile_picture)
                setLoading(false);
                return;
            } else {
                Alert.alert("Error", "Something went wrong. Failed to update profile picture");
            }
            setLoading(false);
        } catch (error) {
            Alert.alert("Error", error.message);
            setLoading(false);
        }
    }




    return (
        <SafeAreaView style={{ backgroundColor: '#fff' }}>

            <ScrollView style={{ backgroundColor: '#f5f5f5' }}>
                <HomeHeader />
                <View style={{ backgroundColor: '#3326AE', height: 200 }}>

                </View>
                <View>
                    <View style={tw`flex-row justify-center -mt-20`}>
                        <Image source={
                            image ? {
                                uri: image,
                            } : require('../components/apic.jpeg')
                        } style={{ objectFit: 'cover', borderColor: '#fff', borderWidth: 5, height: 170, width: 170, borderRadius: 100 }} />
                    </View>

                    <View style={tw`flex-row justify-center mt-5`}>

                        {
                            loading === false ? (
                                <TouchableOpacity onPress={pickImage} style={tw`bg-[#3326AE] p-2 rounded-md`}>
                                    <Text style={tw`text-white`}>
                                        {
                                            user?.profile_picture ? "Change Profile Picture" : "Add Profoile Picture"
                                        }
                                    </Text>
                                </TouchableOpacity>
                            ) : (
                                <View style={tw`bg-[#3326AE] p-2 rounded-md`}>
                                    <ActivityIndicator color="#fff" />
                                </View>
                            )
                        }
                    </View>



                    <View style={tw` border-b border-gray-200  flex-row p-3  mx-5 mt-5`}>
                        <View>
                            <MaterialIcons name="email" style={tw`text-2xl mt-2`} />

                        </View>
                        <View>

                            <Text style={tw`ml-5 text-xl`}>
                                {user?.email}
                            </Text>
                            <Text style={tw`ml-5 font-light text-sm`}>
                                {user?.full_name}j
                            </Text>
                        </View>
                        {/* <Ionicons name="ios-pencil" size={20} style={tw`ml-5 font-light`} color="gray" /> */}

                    </View>

                    <View style={tw` border-b border-gray-200  flex-row p-3 mx-5 mt-5`}>
                        <Feather name="phone" size={24} color="black" />
                        <Text style={tw`ml-5 font-light text-sm`}>
                            {user?.phone_number}
                        </Text>

                    </View>
                    <View style={tw` border-b border-gray-200  flex-row p-3 mx-5 mt-5`}>
                        <FontAwesome name="child" size={24} color="black" />
                        <Text style={tw`ml-5 font-light text-sm`}>
                            {
                                user?.children
                            } children
                        </Text>
                    </View>


                </View>
                <View style={{ height: 100 }}>

                </View>
            </ScrollView>

        </SafeAreaView>


    )
}
export default Profile