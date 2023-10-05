import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import tw from 'twrnc';
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../hooks/auth";

const logourl = require('../../assets/icon.png')
const bg = require('../../assets/bg.jpg')

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    const { login } = useAuth()

    async function loginUser() {
        const result = await login(
            email,
            password
        )

        if (result.status) {
            navigation.navigate('TabNav')
        } else {
            alert(result.data)
        }
    }
    return (
        <View>
            <Image source={bg} style={tw`w-full h-72`} />
            <View style={tw`text-white h-1/4 rounded-3xl -mt-20 p-5 bg-white`}>
                <Image source={logourl} style={tw`-mt-5 w-full h-56`} />
            </View>
            <View style={tw`rounded-t-3xl bg-white px-5 -mt-14  h-full`}>
                <Text style={tw`text-2xl text-[#FF392B] font-bold -mt-14`}>Login</Text>

                <Text style={tw`mt-8`}>Email</Text>
                <TextInput
                    placeholder="Email"
                    style={tw`bg-gray-100 p-3 my-2 rounded-md`}
                    onChangeText={setEmail}
                    value={email}
                />
                <Text style={tw`mt-5`}>Password</Text>
                <TextInput
                    placeholder="Password"
                    style={tw`bg-gray-100 p-3 my-2 rounded-md`}
                    onChangeText={setPassword}
                    value={password}
                />
                <TouchableOpacity

                    style={tw`bg-[#FF392B] mt-2 p-2 rounded-md`}
                    onPress={() => {
                        // navigation.navigate('TabNav')
                        loginUser()
                    }}
                >
                    <Text style={tw`text-white text-center font-bold text-lg`}>Login</Text>
                </TouchableOpacity>
                <View style={tw`mt-5 flex-row justify-between`}>
                    <Text onPress={() => navigation.navigate('SignUp')} style={tw`font-semibold text-lg`}>Signup</Text>
                    <Text onPress={() => navigation.navigate('ForgotPassword')} style={tw`font-semibold text-lg text-[#3326AE]`}>Forgot Password?</Text>
                </View>
            </View>

        </View>
    )
}

export default Login;