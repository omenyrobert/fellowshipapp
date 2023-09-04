import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import tw from 'twrnc';
const logourl = require('../../assets/logo.png')

const Resset = ({ navigation }) => {

    const [phone, setPhone] = useState("");
    const [pin, setPin] = useState("");

    return (
        <View>
            <View style={tw`text-white h-1/4 p-5 bg-[#193296]`}>
                <Image source={logourl} style={tw`mt-5 w-50 ml-[20%] h-50`} />
            </View>
            <View style={tw`rounded-t-3xl -mt-10 bg-white p-5 h-full`}>
                <Text style={tw`text-2xl font-bold mt-2`}>Resset Password</Text>

                <Text style={tw`mt-2`}>Password</Text>
                <TextInput
                    placeholder="Password"
                    style={tw`bg-gray-100 p-3 my-2 rounded-md`}
                    onChangeText={setPhone}
                    value={phone}
                />
                 <Text style={tw`mt-2`}>Confirm Password</Text>
                <TextInput
                    placeholder="Confirm Password"
                    style={tw`bg-gray-100 p-3 my-2 rounded-md`}
                    onChangeText={setPhone}
                    value={phone}
                />
                <TouchableOpacity

                    style={tw`bg-[#FE7D06] mt-2 p-2 rounded-md`}
                    onPress={() => navigation.navigate('Login')}
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
export default Resset