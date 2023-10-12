import { View, Text, Image, ScrollView, TextInput,Keyboard, Dimensions } from "react-native"
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
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/Auth";

const ChatRoom = ({ route }) => {
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

    useEffect(() => {
        const newSocket = io(HOST_URL);
        setSocket(newSocket);
        handleSocket(newSocket);

        return () => newSocket.close();
    }, [HOST_URL]);

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
                type: "chatroom"
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
        })

        socket.on('userchat:latestMessages', (message) => {
            setMessages(message.reverse());
        })

        socket.on('userchat:message', (message) => {
            setMessages((messages) => [...messages, message]);
            if (message.sender.id !== user.id) {
                socket.emit("message:read", message.id)
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





    return (
        <SafeAreaView style={{ backgroundColor: '#fff' }}>
            <HomeHeader />
                
            <View style={tw`flex-row p-2`}>
                <View style={tw`w-12 h-12 border-2 border-blue-700 rounded-full`}>
                    {reciever.profile_picture ? <Image source={{ uri: reciever?.profile_picture }} style={tw`object-cover rounded-full`} /> : <Text style={tw`text-2xl text-blue-700 font-bold mt-1 text-center`}>{reciever.full_name[0]}</Text>}

                </View>
                <View style={{ marginLeft: 10 }}>
                    <Text style={tw`text-xl font-bold text-[#FF392B]`}>
                        {
                            reciever ? reciever.full_name : 'Chat Room'
                        }
                    </Text>
                    <Text>Talk to everyone</Text>
                </View>

            </View>
            
            <ScrollView style={tw`bg-gray-100 p-3 h-[65%]`}>
                <View style={tw`mx-2 mt-2`}>

                    {messages.map((item) => {
                        return (
                            <View key={item.id}>
                                {
                                    item.sender.id !== user?.id ?
                                        <View style={tw`flex-row my-3`}>
                                            <View style={tw`bg-gray-100 h-10 w-10 rounded-full  p-1 border border-[#3326AE]`}>

                                                {item.photo ? <Image source={{ uri: item.photo }} style={{ objectFit: 'cover', height: '100%', width: '100%', borderRadius: 100 }} /> : <Text style={tw`text-2xl font-bold text-blue-700 -mt-1 text-center`}>{item.sender.full_name[0]}</Text>}
                                            </View>

                                            <View style={tw`mx-2 w-[70%] `}>
                                                <View style={tw`flex-row `}>
                                                    <Text style={tw`text-[#3326AE] font-bold`}>
                                                        {item.sender?.full_name}
                                                    </Text>
                                                    <Text style={tw`text-[#3326AE] ml-5`}>
                                                        {
                                                            new Date(item.created_at).toLocaleTimeString()
                                                        }
                                                    </Text>
                                                </View>


                                                <Text style={tw`text-white bg-[#3326AE] mt-1 p-2 rounded-md`}>
                                                    {item.content}
                                                </Text>
                                            </View>
                                            <View style={tw`w-10`}>

                                            </View>

                                        </View> :
                                        <View style={tw`flex-row my-3`}>
                                            <View style={tw`w-[20%]`}>

                                            </View>
                                            <View style={tw`mx-2 w-[80%]`}>
                                                <View style={tw`flex-row justify-between`}>
                                                    <View>

                                                    </View>
                                                    <Text style={tw`text-[#3326AE] ml-5`}>
                                                        {
                                                            new Date(item.created_at).toLocaleTimeString()
                                                        }
                                                    </Text>
                                                    <Text style={tw`text-[#3326AE] font-bold`}>
                                                        {item.sender?.full_name}
                                                    </Text>
                                                    <View style={tw`bg-gray-100 h-10 w-10 rounded-full  p-1 border border-[#3326AE]`}>
                                                        {item.photo ? <Image source={{ uri: item.photo }} style={{ objectFit: 'cover', height: '100%', width: '100%', borderRadius: 100 }} /> : <Text style={tw`text-2xl text-blue-700 -mt-1 font-bold text-center`}>{item.sender.full_name[0]}</Text>}
                                                    </View>
                                                    <View>

                                                    </View>
                                                </View>

                                                <View style={tw`flex-row -mt-5`}>
                                                    <View style={tw`w-[75%]`}>
                                                        <Text style={tw`text-gray-700 bg-white mt-1 p-2 rounded-md`}>
                                                            {item.content}
                                                        </Text>
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

                <TextInput placeholder="text message"
                    value={message}
                    onChangeText={setMessage}
                    style={tw`bg-gray-100 p-3 m-2 w-[80%] rounded-md`} />
                <Ionicons
                    onPress={sendMessage}
                    name="send-sharp" style={{ marginLeft: 10, marginTop: 20 }} size={32} color="#FF392B" />
            </View>
        </SafeAreaView>


    )

}
export default ChatRoom