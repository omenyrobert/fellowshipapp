import { View, Text, Image, ScrollView, Keyboard, Dimensions, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import tw from 'twrnc';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import HomeHeader from "../components/HomeHeader";
const logourl = require('../../assets/icon.png')
import { Ionicons } from '@expo/vector-icons';
import * as ScreenCapture from 'expo-screen-capture';
import * as MediaLibrary from 'expo-media-library';
import { io } from "socket.io-client";
import { HOST_URL } from "../shared/constants";
import { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../context/Auth";
import { useNavigationState, useFocusEffect } from "@react-navigation/native";

const ChatRoom = ({ route, navigation }) => {
    const reciever = route?.params?.reciever || null;
    const { user } = useContext(AuthContext);


    useEffect(() => {
        if (hasPermissions()) {
            const subscription = ScreenCapture.addScreenshotListener(() => {
                alert('Screenshots are not allowed in this app!. I may cause bans from the app');
            });
            return () => subscription.remove();
        }
    }, []);

    useEffect(() => {
        activate();
        return () => deactivate();
    }, []);

    const hasPermissions = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        return status === 'granted';
    };

    const activate = async () => {
        await ScreenCapture.preventScreenCaptureAsync();
    };

    const deactivate = async () => {
        await ScreenCapture.allowScreenCaptureAsync();
    };


    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const newSocket = io(HOST_URL, {
            extraHeaders: {
                "username": user.full_name,
                "userid": user.id,
            }
        });
        setSocket(newSocket);
        handleSocket(newSocket);

    }, [HOST_URL]);


    useFocusEffect(
        useCallback(() => {
            const unsubscribe = () => {
                if (socket) {
                    socket.disconnect();
                }
            }


            return () => unsubscribe();
        }, [socket])
    );





    function sendMessage() {
        if (!message) return;
        if (!socket) return;
        if (reciever) {
            socket.emit('userchat:message', {
                content: message,
                recieverId: reciever.id,
                senderId: user.id,
                type: "userchat"
            });
        } else {
            socket.emit('chatroom:message', {
                content: message,
                reciever: reciever ? reciever.id : null,
                senderId: user.id,
                type: "chatroom",
            });
        }

        setMessage('');
    }

    function handleSocket(socket) {
        socket.on('connect', () => {
            if (reciever) {
                socket.emit('userchat:join', {
                    senderId: user.id,
                    recieverId: reciever.id
                });
            } else {
                socket.emit('chatroom:join');
            }
        });

        socket.on('chatroom:message', (message) => {
            setMessages((messages) => [...messages, message]);
        });

        socket.on('chatroom:latestMessages', (message) => {
            setMessages(message.reverse());
            setLoading(false);
        })

        socket.on('userchat:latestMessages', (message) => {
            setMessages(message.reverse());
            setLoading(false);
            message.forEach((item) => {
                if (item.sender.id !== user.id && item.unread) {
                    socket.emit("message:read", {
                        msgId: item.id,
                        user: user.id,
                        username: user.full_name
                    })
                }
            })
        })

        socket.on('userchat:message', (message) => {
            setMessages((messages) => [...messages, message]);
            if (message.sender.id !== user.id) {
                socket.emit("message:read", {
                    msgId: message.id,
                    user: user.id,
                    username: user.full_name
                })
            }
        })

    }


    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
            const screenHeight = Dimensions.get('window').height;
            const keyboardHeight = screenHeight - event.endCoordinates.screenY;
            setKeyboardHeight(keyboardHeight);
        });

        return () => {
            keyboardDidShowListener.remove();
        };
    }, []);


    const [page, setPage] = useState(1);

    useEffect(() => {
        if (socket) {
            if (reciever) {
                socket.emit('userchat:moreMessages', {
                    senderId: user.id,
                    recieverId: reciever.id,
                    page: page
                });
            } else {
                socket.emit('chatroom:moreMessages', {
                    page: page
                });
            }
        }
    }, [page])





    return (
        <SafeAreaView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ backgroundColor: '#fff' }}>
                <HomeHeader />

                <View style={tw`flex-row p-2`}>
                    <View style={tw`w-12 h-12 border-2 border-blue-700 rounded-full`}>
                        {
                            reciever?.profile_picture ? <Image source={{ uri: reciever?.profile_picture }} style={tw`rounded-full`} /> : <Text style={tw`text-2xl text-blue-700 font-bold mt-1 text-center`}>{reciever?.full_name[0]}</Text>}
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={tw`text-xl font-bold text-[#FF392B]`}>
                            {
                                reciever ? reciever?.full_name : 'Prayer Room'
                            }
                        </Text>
                        <Text>Praise God</Text>
                    </View>

                </View>
                <ScrollView ref={ref => { this.scrollView = ref }}
                    onContentSizeChange={() => {
                        if (page === 1) {
                            this.scrollView.scrollToEnd({ animated: true })
                        }
                    }} style={tw`bg-gray-100 p-3 h-[65%]`}>
                    <View style={tw`mx-2 mt-2`}>

                        {loading ? <View style={tw` mt-2 flex-row justify-center items-center p-1.5 rounded-md`}>
                            <ActivityIndicator size="large" color="blue" />
                        </View> : null}

                        {/* Load more button */}
                        {
                            messages.length > 29 ? (
                                <View style={tw` mt-2 flex-row justify-center items-center p-1.5 rounded-md`}>
                                    <TouchableOpacity onPress={() => {
                                        setPage(page + 1);
                                        setLoading(true);
                                    }} style={tw`bg-blue-700 p-2 rounded-md`}>
                                        <Text style={tw`text-white`}>Load More</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : null
                        }

                        {messages.map((item) => {
                            return (
                                <View key={item.id}>
                                    {
                                        item.sender.id !== user?.id ?
                                            <View style={tw`flex-row  my-3`}>
                                                {
                                                    reciever ? null : (
                                                        <View style={tw`bg-gray-100 h-10 w-10 rounded-full  p-1 border border-[#3326AE]`}>
                                                            {item?.sender?.profile_picture ? <Image source={{ uri: item.sender?.profile_picture }} style={{ objectFit: 'cover', height: '100%', width: '100%', borderRadius: 100 }} />
                                                                : <Text style={tw`text-xl font-medium text-[#3326AE] text-center`}>{item.sender?.full_name[0]}</Text>}

                                                        </View>
                                                    )
                                                }


                                                <View style={tw`ml-2 w-[70%] `}>
                                                    <View style={tw`flex-row `}>
                                                        {
                                                            reciever ? null : (
                                                                <Text style={tw`text-[#3326AE] font-bold`}>
                                                                    {item.sender?.full_name}
                                                                </Text>
                                                            )
                                                        }


                                                    </View>
                                                    <View style={tw`p-2 rounded-md text-white rounded bg-[#3326AE] flex-row justify-between`}>
                                                        <Text style={tw`w-[65%] text-white`}>
                                                            {item.content}
                                                        </Text>
                                                        <Text style={tw`text-xs font-light text-white`}>
                                                            {
                                                                new Date(item.created_at).toLocaleTimeString()
                                                            }
                                                        </Text>
                                                    </View>
                                                </View>

                                                <View style={tw`w-10`}>

                                                </View>

                                            </View> :
                                            <View style={tw`flex-row my-3`}>
                                                <View style={tw`w-[20%]`}>

                                                </View>
                                                <View style={tw`mx-2 w-[80%]`}>

                                                    <View style={tw`flex-row -mt-5`}>
                                                        <View style={tw`w-[95%]`}>
                                                            <View style={tw`text-gray-700 flex-row justify-between bg-white mt-1 p-2 rounded-md`}>
                                                                <Text style={tw`w-[65%]`}>

                                                                    {item.content}
                                                                </Text>
                                                                <View>

                                                                    <Text style={tw`text-xs  font-light`}>
                                                                        {
                                                                            new Date(item.created_at).toLocaleTimeString()
                                                                        }

                                                                    </Text>
                                                                    {
                                                                        item.unread === false ? <Text style={tw`text-xs font-light`}>Seen</Text> : null
                                                                    }
                                                                </View>

                                                            </View>
                                                        </View>

                                                        <View style={tw`w-[25%]`}>

                                                        </View>

                                                    </View>



                                                </View>


                                            </View>

                                    }
                                </View>

                            )
                        })}


                    </View>
                    <View style={{ height: 50 }}>

                    </View>
                </ScrollView>
                <View style={tw`flex-row p-2`}>

                    <TextInput placeholder="Type a message"
                        value={message}
                        onChangeText={setMessage}
                        style={tw`bg-gray-100 p-3 m-2 w-[80%] rounded-md`} />
                    <Ionicons
                        onPress={sendMessage}
                        name="send-sharp" style={{ marginLeft: 10, marginTop: 20 }} size={32} color="#FF392B" />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>


    )

}
export default ChatRoom