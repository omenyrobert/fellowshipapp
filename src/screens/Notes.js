import { View, Text, Image, ScrollView, TouchableOpacity, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import tw from 'twrnc';
import { Feather, EvilIcons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import HomeHeader from "../components/HomeHeader";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from "../hooks/axios";
import { AuthContext } from "../context/Auth";
import { useAppData } from "../hooks/app-data";
import { AppContext } from "../context/AppData";

const Notes = () => {
    const [note, setNote] = useState('')

    const { token, user } = useContext(AuthContext)
    const { getNotes } = useAppData()
    const { notes } = useContext(AppContext)

    useEffect(() => {
        getNotes()
    }, [])

    async function saveNote() {
        if (note === "") {
            alert("Please enter a note")
            return
        }
        const data = {
            user_id: user.id,
            content: note
        }
        try {
            const response = await axiosInstance.post('/notes/create', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            const { status } = response.data
            if (status) {
                await getNotes()
                setNote('')
            } else {
                alert(response.data.payload)
            }
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#fff' }}>
            <HomeHeader />
            <ScrollView style={{ backgroundColor: '#f5f5f5' }}>
                <View style={tw`p-5`}>
                    <Text>Take Notes</Text>
                    <TextInput
                        style={tw`border border-gray-300 p-2 mt-2`}
                        onChangeText={setNote}
                        value={note}
                        multiline={true}
                        numberOfLines={4}
                        placeholder="Write your notes here"
                    />
                    <TouchableOpacity
                        onPress={saveNote}
                        style={tw`bg-[#3326AE] mt-5 p-2 rounded-md`}
                    >
                        <Text style={tw`text-white text-center`}>Save</Text>
                    </TouchableOpacity>


                    {
                        notes.map((note) => {
                            return (
                                <View style={tw`p-2 border-b border-gray-300 flex-row`}>
                                    <View>
                                        <EvilIcons style={tw`mt-5`} name="pencil" size={34} color="black" />
                                    </View>
                                    <View style={tw`ml-5`} >
                                        <Text style={tw`text-xl font-medium `}>{note.content}</Text>
                                        <Text style={tw`text-gray-500`}>{new Date(note.created_at).toLocaleDateString()}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }

                </View>

                <View style={{ height: 100 }}>

                </View>
            </ScrollView>
        </SafeAreaView>


    )

}
export default Notes