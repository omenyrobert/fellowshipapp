import { View, Text, Image, ScrollView, TouchableOpacity, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import tw from 'twrnc';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import HomeHeader from "../components/HomeHeader";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../context/AppData";
import { useState, useContext, useEffect } from "react";
import { useAppData } from "../hooks/app-data";
import { AuthContext } from "../context/Auth";


const Chat = () => {
    const navigation = useNavigation();
    const { users, chatUsers } = useContext(AppContext)
    const { user } = useContext(AuthContext)

    const { getUsers, getChatUsers } = useAppData()

    useEffect(() => {
        getUsers()
        getChatUsers()
    }, [])

    const [allUsers, setAllUsers] = useState([])
    const [search, setSearch] = useState('')
    const [filteredUsers, setFilteredUsers] = useState([])
    const [allChatUsers, setAllChatUsers] = useState([])
    const [filteredChatUsers, setFilteredChatUsers] = useState([])

    useEffect(() => {
        // remove user from users
        const filteredUsers = users.filter((item) => {
            return item.id !== user.id
        })
        setAllUsers(filteredUsers)


    }, [users])

    useEffect(() => {
        // remove user from chatUsers
        const filteredChatUsers_ = chatUsers.filter((item) => {
            return item.id !== user.id
        })
        setFilteredChatUsers(filteredChatUsers_)
    }, [chatUsers])


    useEffect(() => {
        if (search === "") {
            setFilteredUsers(allUsers)
            setFilteredChatUsers(allChatUsers)
            return
        }
        const filteredUsers_ = allUsers.filter((item) => {
            return item.full_name.toLowerCase().includes(search.toLowerCase())
        })
        const filteredChatUsers_ = allChatUsers.filter((item) => {
            return item.full_name.toLowerCase().includes(search.toLowerCase())
        })
        setFilteredUsers(filteredUsers_)
        setFilteredChatUsers(filteredChatUsers_)
    }, [search, allUsers])



    return (
        <SafeAreaView style={{ backgroundColor: '#fff' }}>
            <HomeHeader />

            <ScrollView style={{ backgroundColor: '#f5f5f5' }}>
                <View style={tw`flex-row relative ml-6 mt-3`}>
                    <FontAwesome style={tw`absolute z-50 mt-3 ml-4`} name="search" size={24} color="black" />
                    <TextInput
                        placeholder="Search for user"
                        style={tw`bg-gray-200 py-3 pl-10 ml-1 border w-[90%] border-gray-300 rounded-md`}
                        onChangeText={(text) => setSearch(text)}
                        value={search}
                    />
                </View>
                <ScrollView horizontal>
                    <View style={{ borderRadius: 100, margin: 10, height: 50, width: 50, padding: 10, backgroundColor: '#FF392B' }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, marginTop: 1, marginLeft: -2, textAlign: 'center' }}>
                            All
                        </Text>

                    </View>
                    {filteredUsers.map((item) => {
                        return (
                            <TouchableOpacity key={item.id} onPress={() => {
                                navigation.navigate('ChatRoom', {
                                    reciever: item
                                })
                            }} style={tw`m-2 border-b pb-2 border-gray-200`}>
                                <View style={tw`w-20`}>
                                    <View style={tw`bg-gray-100 ml-2 h-12 w-12 rounded-full  p-1 border border-[#3326AE]`}>
                                        {item.profile_picture ?  <Image source={{ uri: item.profile_picture }} style={{ objectFit: 'cover', height: '100%', width: '100%', borderRadius: 100 }} /> : <Text style={tw`text-2xl font-bold text-center`}>{item.full_name[0]}</Text> }
                                       
                                    </View>
                                </View>
                                <Text style={tw`text-[#3326AE] w-20 text-center font-bold`}>
                                    {((item.full_name).length > 9) ?
                                        (((item.full_name).substring(0, 9 - 1)) + '...') :
                                        item.full_name}
                                    {/* {item.name} */}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>

                <View style={tw`mx-2 mt-2`}>

                    {filteredChatUsers.map((item) => {
                        return (

                            <TouchableOpacity key={item.id} onPress={() => {
                                navigation.navigate('ChatRoom', {
                                    reciever: item
                                })
                            }} style={tw`flex-row  m-2 border-b pb-2 border-gray-200`}>
                                <View style={tw`bg-gray-100 h-12 w-12 rounded-full  p-1 border border-[#3326AE]`}>
                                {item.profile_picture ?  <Image source={{ uri: item.profile_picture }} style={{ objectFit: 'cover', height: '100%', width: '100%', borderRadius: 100 }} /> : <Text style={tw`text-2xl font-bold text-center`}>{item.full_name[0]}</Text> }
                                </View>

                                <View style={tw`mx-2 w-[80%] `}>
                                    <View style={tw`flex-row justify-between `}>
                                        <Text style={tw`text-[#3326AE] font-bold`}>
                                            {item.full_name}
                                        </Text>
                                        <View>

                                            <Text style={tw`text-[#3326AE]`}>
                                                {
                                                    new Date(item?.latestMessage?.created_at).toLocaleTimeString()
                                                }
                                            </Text>


                                        </View>
                                    </View>

                                    <View style={tw`flex-row`}>
                                        <Text style={tw`text-gray-600 w-[85%]`}>
                                            {item?.latestMessage?.content}
                                        </Text>
                                        <View style={tw`text-gray-600 w-[15%]`} >
                                            <View style={tw`bg-[#FF392B] w-6  mt-1 rounded-full px-2`}>
                                                {
                                                    item.unreadMessages === 0 ? null : (
                                                        <Text style={tw`font-bold`} >
                                                            {item.unreadMessages}
                                                        </Text>
                                                    )
                                                }

                                            </View>
                                        </View>
                                    </View>

                                </View>
                                <View style={tw`w-5`}>

                                </View>

                            </TouchableOpacity>
                        )
                    })}


                </View>
                <View style={{ height: 100 }}>

                </View>
            </ScrollView>
        </SafeAreaView>


    )

}
export default Chat