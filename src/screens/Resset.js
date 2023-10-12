import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import tw from 'twrnc';
const logourl = require('../../assets/icon.png')
const bg = require('../../assets/bg.jpg')

const Resset = ({ route, navigation }) => {
    const { email } = route.params

    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");

    async function resset() {
        if (!token) {
            return alert("Token is required")
        }
        if (!password) {
            return alert("Password is required")
        }
        if (password.length < 4) {
            return alert("Password must be at least 4 characters")
        }
        try {
            const response = await axiosInstance.post('/users/update-password', {
                email,
                token,
                password
            })

            const { status, payload } = response.data

            if (status) {
                alert("Password Changed")
                navigation.navigate('Login')
            } else {
                alert(payload)
            }
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <View>
            <Image source={bg} style={tw`w-full h-72`} />
            <View style={tw`text-white rounded-3xl -mt-20 p-5 bg-white`}>
                <Image source={logourl} style={tw`-mt-5 w-50 ml-[20%] h-50`} />
            </View>
            <View style={tw`rounded-t-3xl -mt-14 bg-white p-5 h-full`}>
                <Text style={tw`text-2xl font-bold mt-2`}>Resset Password</Text>

                <Text style={tw`mt-2`}>Token</Text>
                <TextInput
                    placeholder="Password"
                    style={tw`bg-gray-100 p-3 my-2 rounded-md`}
                    onChangeText={setToken}
                    value={token}
                />
                <Text style={tw`mt-2`}>Password</Text>
                <TextInput
                    placeholder="Confirm Password"
                    style={tw`bg-gray-100 p-3 my-2 rounded-md`}
                    onChangeText={setPassword}
                    value={password}
                />
                <TouchableOpacity

                    style={tw`bg-[#FF392B] mt-2 p-2 rounded-md`}
                    onPress={resset}
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