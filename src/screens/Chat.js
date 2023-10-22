import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, RefreshControl } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import tw from 'twrnc';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import HomeHeader from "../components/HomeHeader";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../context/AppData";
import { useState, useContext, useEffect, useCallback } from "react";
import { useAppData } from "../hooks/app-data";
import { AuthContext } from "../context/Auth";
import { useFocusEffect } from "@react-navigation/native";



const Chat = () => {
    const navigation = useNavigation();
    const { users, chatUsers } = useContext(AppContext)
    const { user } = useContext(AuthContext)

    const { getUsers, getChatUsers, getLatestChatMessage } = useAppData()
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [usersLoading, setUsersLoading] = useState(true)
    const [lastChatMsg, setLastChatMsg] = useState(null)

    useEffect(() => {
        getChatUsers()
        getUsers(page)

    }, [])

    useEffect(() => {
        async function getLatestChatMessage_() {
            const response = await getLatestChatMessage()
            setLastChatMsg(response)
        }
        getLatestChatMessage_()
    }, [])

    useEffect(() => {
        setUsersLoading(true)
        getUsers(page)
    }, [page])

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        async function refresh() {
            setRefreshing(true);
            await getUsers(page)
            await getChatUsers()
            setRefreshing(false);
        }
        refresh()
    }, []);



    const [allUsers, setAllUsers] = useState([])
    const [search, setSearch] = useState('')
    const [filteredUsers, setFilteredUsers] = useState([])
    const [allChatUsers, setAllChatUsers] = useState([])
    const [filteredChatUsers, setFilteredChatUsers] = useState(null)

    useEffect(() => {

        if (filteredChatUsers) {
            const filteredUsers = users.filter((item) => {
                if (item.id === user.id) {
                    return false
                }
                return !filteredChatUsers.some((item_) => {
                    return item_.id === item.id
                })
            })
            setAllUsers(filteredUsers)
            setUsersLoading(false)
        }



    }, [users, filteredChatUsers])

    useEffect(() => {
        // remove user from chatUsers
        const filteredChatUsers_ = chatUsers.filter((item) => {
            return item.id !== user.id
        })
        setAllChatUsers(filteredChatUsers_)
        setLoading(false)
    }, [chatUsers])


    useEffect(() => {
        if (search === "") {
            setFilteredUsers(allUsers)
            setFilteredChatUsers(allChatUsers)
            return
        }
        const filteredUsers_ = allUsers.filter((item) => {
            return item?.full_name?.toLowerCase().includes(search?.toLowerCase())
        })
        const filteredChatUsers_ = allChatUsers.filter((item) => {
            return item?.full_name?.toLowerCase().includes(search?.toLowerCase())
        })
        setFilteredUsers(filteredUsers_)
        setFilteredChatUsers(filteredChatUsers_)
        setLoading(false)
    }, [search, allUsers, allChatUsers])


    useFocusEffect(
        useCallback(() => {
            getUsers()
            getChatUsers()
        }, [])
    );



    return (
        <SafeAreaView style={{ backgroundColor: '#fff' }}>
            <HomeHeader />

            <ScrollView style={{ backgroundColor: '#f5f5f5' }} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            } >
                <View style={tw`flex-row relative ml-6 mt-3`}>
                    <FontAwesome style={tw`absolute z-50 mt-3 ml-4`} name="search" size={24} color="black" />
                    <TextInput
                        placeholder="Search for user"
                        style={tw`bg-gray-200 py-3 pl-10 ml-1 border w-[90%] border-gray-300 rounded-md`}
                        onChangeText={(text) => setSearch(text)}
                        value={search}
                    />
                </View>



                <View style={tw`mx-2 mt-2`}>

                    <TouchableOpacity onPress={() => {
                        navigation.navigate('ChatRoom')
                    }} style={tw`flex-row border-b pb-2 border-gray-200`}>
                        <View style={{ borderRadius: 100, margin: 10, height: 50, width: 50, padding: 10, backgroundColor: '#FF392B' }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, marginTop: 1, marginLeft: -2, textAlign: 'center' }}>
                                All
                            </Text>

                        </View>

                        <View style={tw`m-2 w-[75%] `}>
                            <View style={tw`flex-row justify-between `}>
                                <Text style={tw`text-[#3326AE] mt-2 font-bold`}>
                                    Prayer Room
                                </Text>
                                <View>

                                    <Text style={tw`text-[#3326AE] mr-2`}>
                                        {lastChatMsg?.created_at ? new Date(lastChatMsg?.created_at).toLocaleTimeString() : null}
                                    </Text>

                                </View>
                            </View>

                            <View style={tw`flex-row`}>
                                <Text style={tw`text-gray-600 w-[85%]`}>
                                    {lastChatMsg?.content}
                                </Text>
                                <View style={tw`text-gray-600 w-[15%]`} >
                                    <View style={tw`bg-[#FF392B] w-6  mt-1 rounded-full px-2`}>
                                    </View>
                                </View>
                            </View>

                        </View>
                        <View style={tw`w-5`}>

                        </View>

                    </TouchableOpacity>

                    {
                        loading &&
                        <View style={tw`flex-row justify-center mt-10`}>
                            <ActivityIndicator size="large" color="#FF392B" />
                        </View>
                    }

                    {filteredChatUsers?.map((item) => {
                        return (

                            <TouchableOpacity key={item.id} onPress={() => {
                                navigation.navigate('ChatRoom', {
                                    reciever: item
                                })
                            }} style={tw`flex-row  m-2 border-b pb-2 border-gray-200`}>
                                <View style={tw`bg-gray-100 h-12 w-12 rounded-full  p-1 border border-[#3326AE]`}>
                                    {item.profile_picture ? <Image source={{ uri: item.profile_picture }} style={{ objectFit: 'cover', height: '100%', width: '100%', borderRadius: 100 }} /> : <Text style={tw`text-xl font-bold mt-1 text-[#3326AE] text-center`}>{item.full_name[0]}</Text>}
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
                                                        <Text style={tw`font-bold text-white`} >
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
                {/* A divider line */}

                <View style={tw`flex-row justify-between mt-2 mx-2`}>
                    <Text style={tw`text-[#3326AE] font-bold`}>
                        Other Users
                    </Text>
                </View>



                <View style={tw`mx-2 mt-2`}>
                    {filteredUsers?.map((item) => {
                        return (

                            <TouchableOpacity key={item.id} onPress={() => {
                                navigation.navigate('ChatRoom', {
                                    reciever: item
                                })
                            }} style={tw`flex-row  m-2 border-b pb-2 border-gray-200`}>
                                <View style={tw`bg-gray-100 h-12 w-12 rounded-full  p-1 border border-[#3326AE]`}>
                                    {item.profile_picture ? <Image source={{ uri: item.profile_picture }} style={{ objectFit: 'cover', height: '100%', width: '100%', borderRadius: 100 }} /> : <Text style={tw`text-xl font-bold mt-1 text-[#3326AE] text-center`}>{item.full_name[0]}</Text>}
                                </View>

                                <View style={tw`mx-2 w-[80%] `}>
                                    <View style={tw`flex-row justify-between `}>
                                        <Text style={tw`text-[#3326AE] font-bold`}>
                                            {item.full_name}
                                        </Text>
                                        <View>


                                            <Feather name="arrow-right" size={24} color="#FF392B" />
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>

                        )
                    })}
                </View>

                {
                    usersLoading &&
                    <View style={tw`flex-row justify-center mt-10`}>
                        <ActivityIndicator size="large" color="#FF392B" />
                    </View>
                }

                {/* Load more button */}

                {
                    filteredUsers?.length > 9 && (
                        <View style={tw`flex-row justify-center mt-5`}>
                            <TouchableOpacity onPress={() => {
                                setPage(page + 1)
                            }} style={tw`bg-[#FF392B] px-4 py-2 rounded-md`}>
                                <Text style={tw`text-white font-bold`}>
                                    Load More
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )
                }




                <View style={{ height: 100 }}>

                </View>
            </ScrollView>
        </SafeAreaView>


    )

}
export default Chat