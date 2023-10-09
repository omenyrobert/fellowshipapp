import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Alert } from "react-native";
import tw from 'twrnc';
import CheckBox from "expo-checkbox";
import { useAuth } from "../hooks/auth";



const logourl = require('../../assets/icon.png')
const bg = require('../../assets/bg.jpg')



const SignUp = ({ navigation }) => {

    const [phone, setPhone] = useState("");
    const [pin, setPin] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [ref, setRef] = useState("");
    const [isMother, setIsMother] = useState(false);
    const [children, setChildren] = useState("");
    const { register } = useAuth();

    async function signup() {
        const result = await register(
            fullname,
            phone,
            email,
            ref,
            isMother,
            children,
            pin
        )

        if (result.status) {
            Alert.alert(
                "Success",
                "Account created successfully",
                [
                    {
                        text: "OK",
                        onPress: () => navigation.navigate("Login")
                    }
                ]
            )
        } else {
            alert(result.data)
        }
    }


    return (
        <ScrollView>
            <View>
                <Image source={bg} style={tw`w-full h-72`} />
                <View style={tw`text-white rounded-3xl -mt-20 p-5 bg-white`}>
                    <Image source={logourl} style={tw` -mt-5 w-full h-50`} />
                </View>
                <View style={tw`rounded-t-3xl -mt-20 bg-white p-5 h-full`}>

                    <Text style={tw`text-2xl text-[#FF392B] font-bold mt-2`}>SignUp</Text>

                    <Text style={tw`mt-2`}>Full Name</Text>
                    <TextInput
                        placeholder="Full Name"
                        style={tw`bg-gray-100 p-3 my-2 rounded-md`}
                        onChangeText={setFullname}
                        value={fullname}
                    />
                    <Text style={tw`mt-5`}>Email</Text>
                    <TextInput
                        placeholder="Enter Email"
                        style={tw`bg-gray-100 p-3 my-2 rounded-md`}
                        onChangeText={setEmail}
                        value={email}
                    />
                    <Text style={tw`mt-5`}>Phone number/whatsApp</Text>
                    <TextInput
                        placeholder="WhatsApp Number"
                        style={tw`bg-gray-100 p-3 my-2 rounded-md`}
                        onChangeText={setPhone}
                        value={phone}
                    />

                    <Text style={tw`mt-5`}>Password</Text>
                    <TextInput
                        placeholder="Password"
                        style={tw`bg-gray-100 p-3 my-2 rounded-md`}
                        onChangeText={setPin}
                        value={pin}
                    />

                    <Text style={tw`mt-5`}>Who recommended You</Text>

                    <TextInput
                        placeholder="Enter Name"
                        style={tw`bg-gray-100 p-3 my-2 rounded-md`}
                        onChangeText={setRef}
                        value={ref}
                    />
                    <Text style={tw`mt-5`}>  Are you a mother</Text>
                    <View style={tw`flex-row`}>

                        <View style={tw`mt-2`}>
                            <CheckBox value={isMother}
                                onValueChange={(value) => {
                                    setIsMother(value)
                                }}
                                color={isMother ? "#FF392B" : undefined} />
                            <Text style={tw`ml-8 -mt-5`}>{
                                isMother ? "Yes (Click to Change)" : "No (Click to Change)"
                            }</Text>
                        </View>
                    </View>

                    <Text style={tw`mt-5`}>  how many children</Text>

                    <TextInput
                        placeholder="Enter Name"
                        style={tw`bg-gray-100 p-3 my-2 rounded-md`}
                        onChangeText={setChildren}
                        value={children}
                    />

                    <Text style={tw`my-2`}>
                        Our fellowship happends every 2am
                    </Text>
                    <TouchableOpacity

                        style={tw`bg-[#FF392B] mt-2 p-2 rounded-md`}
                        onPress={() => {
                            signup()
                        }}
                    >
                        <Text style={tw`text-white text-center font-bold text-lg`}>Signup</Text>
                    </TouchableOpacity>
                    <View style={tw`mt-1 flex-row justify-between`}>
                        <View></View>
                        <Text onPress={() => navigation.navigate('Login')} style={tw`font-semibold text-lg text-[#3326AE]`}>Login</Text>
                    </View>

                </View>
                <View style={{ height: 70 }}>

                </View>
            </View>
        </ScrollView>
    )
}
export default SignUp