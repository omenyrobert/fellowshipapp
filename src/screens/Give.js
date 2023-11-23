import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import tw from 'twrnc';
import { Feather, FontAwesome } from '@expo/vector-icons';
import HomeHeader from "../components/HomeHeader";
import { useState, useContext } from "react";
import CheckBox from "expo-checkbox";
import axiosInstance from "../hooks/axios";
import { AuthContext } from "../context/Auth";
import { AppContext } from "../context/AppData";
import * as WebBrowser from 'expo-web-browser';


const Give = () => {
    const [loading, setLoading] = useState(false)
    const [network, setNetwork] = useState("MTN")
    const [amount, setAmount] = useState("")
    const [phone, setPhone] = useState("")
    const [prayer, setPrayer] = useState("")
    const [isOffertory, setIsOffertory] = useState("OFFERTORY")
    const { token, user } = useContext(AuthContext)
    const { expoPushToken } = useContext(AppContext)

    const sendMobile = async () => {
        if (amount === "" || phone === "" || prayer === "") {
            alert("All fields are required")
            return
        }
        if (amount < 600) {
            alert("Amount must be greater than 600")
            return
        }
        try {
            // userid, amount, transaction_type, phone_number, email, reason, network, device_id
            setLoading(true)
            const response = await axiosInstance.post('/transaction/mobile-money', {
                userid: user.id,
                amount,
                transaction_type: isOffertory,
                phone_number: phone,
                email: user.email,
                reason: prayer,
                network,
                device_id: expoPushToken
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const { status, payload } = response.data
            if (status) {
                setLoading(false)
                await WebBrowser.openBrowserAsync(payload.redirect_url)
            } else {
                setLoading(false)
                alert(payload)
            }
        } catch (error) {
            setLoading(false)
            alert(error.message)

        }
    }



    return (
        <SafeAreaView style={{ backgroundColor: '#fff' }}>
            <View style={tw`border-b border-gray-200`}>
                <HomeHeader />
            </View>
            <ScrollView >
                <View>
                    <Text style={tw`font-medium text-[#FF392B] ml-5 text-xl mt-5`}>
                        Support Our Ministry
                    </Text>
                    <Text style={tw`ml-8 text-lg font-medium mt-5`}>Type of Giving</Text>
                    <View style={tw`flex-row mt-2 ml-8`}>

                        <View style={tw`mt-2 `}>
                            <CheckBox
                                value={isOffertory === "OFFERTORY"}
                                onValueChange={() => setIsOffertory("OFFERTORY")}
                            />
                            <Text style={tw`ml-8 -mt-5`}>Offertory</Text>
                        </View>
                        <View style={tw`mt-2 ml-10`}>
                            <CheckBox value={isOffertory === "TITHE"}
                                onValueChange={() => setIsOffertory("TITHE")} />
                            <Text style={tw`ml-8 -mt-5`}>Tithe</Text>
                        </View>
                        <View style={tw`mt-2 ml-10`}>
                            <CheckBox value={isOffertory === "SEED"}
                                onValueChange={() => setIsOffertory("SEED")} />
                            <Text style={tw`ml-8 -mt-5`}>Seed</Text>
                        </View>
                    </View>
                    <View style={tw`bg-white mt-2`}>



                        <View>


                            <Text style={tw`ml-5 mt-5`}>
                                Phone Number
                            </Text>
                            <TextInput
                                placeholder="Phone Number"
                                style={tw`bg-gray-100 py-3 pl-5 mx-5 mt-2 border border-gray-200 rounded-md`}
                                value={phone}
                                onChangeText={setPhone}
                            />

                            <Text style={tw`ml-5 mt-5`}>
                                Enter Amount
                            </Text>
                            <TextInput
                                placeholder="Amount"
                                style={tw`bg-gray-100 py-3 pl-5 mx-5 mt-2 border border-gray-200 rounded-md`}
                                value={amount}
                                onChangeText={setAmount}
                            />
                            <Text style={tw`ml-5 mt-5`}>
                                Prayer Request
                            </Text>

                            <TextInput
                                placeholder="Prayer Request"
                                editable
                                multiline
                                numberOfLines={4}
                                maxLength={1000}
                                style={tw`bg-gray-100 p-3 mx-5 mt-2 border border-gray-200 rounded-md`}
                                value={prayer}
                                onChangeText={setPrayer} // 1000
                            />



                            {
                                loading ? (
                                    <View style={tw`flex-row justify-center bg-[#FF392B] m-5 p-2 rounded-md`}>
                                        <ActivityIndicator size="large" color="#fff" />
                                    </View>
                                ) : (
                                    <TouchableOpacity
                                        style={tw`bg-[#FF392B] m-5 p-2 rounded-md`}
                                        onPress={sendMobile}
                                    >

                                        <Text style={tw`text-white text-center font-bold text-lg`}>
                                            Send
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }
                        </View>




                    </View>
                </View>
                <View style={{ height: 150, backgroundColor: '#fff' }}>
                </View>
            </ScrollView>
        </SafeAreaView>


    )
}
export default Give


/* 
<TouchableOpacity onPress={openMobile} style={tw`p-3 rounded-md border-b border-gray-200 mx-5 my-2`}>

                            <View style={tw`flex-row`}>
                                <View style={tw`mt-1`}>
                                    <Feather name="smartphone" size={24} color="black" />
                                </View>
                                <View style={tw`ml-2`}>
                                    <Text style={tw`text-lg font-medium -mt-1`}>
                                        Mobile Money
                                    </Text>
                                    <Text style={tw`text-gray-500 -mt-1`}>
                                        Airtel Money & MTN Momo
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={openBank} style={tw`p-3 rounded-md border-b border-gray-200 mx-5 my-2`}>

                            <View style={tw`flex-row`}>
                                <View style={tw`mt-1`}>

                                    <FontAwesome name="cc-mastercard" size={24} color="black" />
                                </View>
                                <View style={tw`ml-2`}>
                                    <Text style={tw`text-lg font-medium -mt-1`}>
                                        Bank Transfer
                                    </Text>
                                    <Text style={tw`text-gray-500 -mt-1`}>
                                        Visa Card, Master Card, Debit Card ect
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity> 
                        
                        
                        
                        <TouchableOpacity onPress={() => {
                                setNetwork("Airtel")
                            }} >
                                <View style={
                                    network === "Airtel" ? tw`flex-row p-2 m-2 bg-gray-100` : tw`flex-row p-2 m-2`
                                }>
                                    <Image source={require('../../assets/airtel.png')} style={tw`w-10 h-10`} />
                                    <View>
                                        <Text style={tw`ml-5`}>
                                            Airtel
                                        </Text>
                                        <Text style={tw`ml-5 text-xs text-gray-500`}>
                                            Airtel Money
                                        </Text>
                                    </View>
                                </View >
                            </TouchableOpacity>


                            <TouchableOpacity
                                onPress={() => {
                                    setNetwork("MTN")
                                }}
                            >
                                <View style={
                                    network === "MTN" ? tw`flex-row p-2 m-2 bg-gray-100` : tw`flex-row p-2 m-2`
                                }>
                                    <Image source={require('../../assets/mtn.jpeg')} style={tw`w-10 h-10`} />
                                    <View>
                                        <Text style={tw`ml-5`}>
                                            MTN
                                        </Text>
                                        <Text style={tw`ml-5 text-xs text-gray-500`}>
                                            Momo Money
                                        </Text>
                                    </View>
                                </View >
                            </TouchableOpacity>
                        {bank ?

                            <View>
                                <Text style={tw`ml-5 mt-5`}>
                                    Bank Account Name
                                </Text>
                                <TextInput
                                    placeholder="Account Name"
                                    style={tw`bg-gray-100 py-3 pl-5 mx-5 mt-2 border border-gray-200 rounded-md`}
                                />
                                <Text style={tw`ml-5 mt-5`}>
                                    Select Bank
                                </Text>
                                <TextInput
                                    placeholder="Account Name"
                                    style={tw`bg-gray-100 py-3 pl-5 mx-5 mt-2 border border-gray-200 rounded-md`}
                                />
                                <Text style={tw`ml-5 mt-5`}>
                                    Amount
                                </Text>
                                <TextInput
                                    placeholder="Amount"
                                    style={tw`bg-gray-100 py-3 pl-5 mx-5 mt-2 border border-gray-200 rounded-md`}
                                />

                                <Text style={tw`ml-5 mt-5`}>
                                    Prayer Request
                                </Text>

                                <TextInput
                                    placeholder="Amount"
                                    editable
                                    multiline
                                    numberOfLines={4}
                                    maxLength={40}
                                    style={tw`bg-gray-100 py-3 pl-5 mx-5 mt-2 border border-gray-200 rounded-md`}
                                />


                                <TouchableOpacity
                                    style={tw`bg-[#FF392B] m-5 p-2 rounded-md`}

                                >
                                    <Text style={tw`text-white text-center font-bold text-lg`}>Send</Text>
                                </TouchableOpacity>
                            </View>
                            : null}

                        
                        
                            */