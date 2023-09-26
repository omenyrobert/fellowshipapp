import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import tw from 'twrnc';
const logourl = require('../../assets/icon.png')
const bg = require('../../assets/bg.jpg')

const ForgotPassword = ({ navigation }) => {

    const [phone, setPhone] = useState("");
    const [pin, setPin] = useState("");

    return (
        <View>
            <Image source={bg} style={tw`w-full h-72`} />
            <View style={tw`text-white rounded-3xl -mt-20 p-5 bg-white`}>
                <Image source={logourl} style={tw`-mt-5 w-full h-50`} />
            </View>
            <View style={tw`rounded-t-3xl -mt-14 bg-white p-5 h-full`}>
                <Text style={tw`text-2xl font-bold mt-2`}>Resset Password</Text>

                <Text style={tw`mt-2`}>Email</Text>
                <TextInput
                    placeholder="Email"
                    style={tw`bg-gray-100 p-3 my-2 rounded-md`}
                    onChangeText={setPhone}
                    value={phone}
                />
                <TouchableOpacity

                    style={tw`bg-[#FF392B] mt-2 p-2 rounded-md`}
                    onPress={() => navigation.navigate('Resset')}
                >
                    <Text style={tw`text-white text-center font-bold text-lg`}>Resset Password</Text>
                </TouchableOpacity>
                <View style={tw`mt-1 flex-row justify-between`}>
                    <View></View>
                    <Text onPress={() => navigation.navigate('Login')} style={tw`font-semibold text-lg`}>Login</Text>
                </View>
            </View>

        </View>
    )
}
export default ForgotPassword