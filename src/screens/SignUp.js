import { useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, TextInput, Image, Alert } from "react-native";
import tw from 'twrnc';
import CheckBox from "expo-checkbox";
import { useAuth } from "../hooks/auth";



const logourl = require('../../assets/icon.png')
const bg = require('../../assets/bg.jpg')



const SignUp = ({ navigation }) => {

    const [phone, setPhone] = useState("");
    const [pin, setPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [ref, setRef] = useState("");
    const [isMother, setIsMother] = useState(false);
    const [children, setChildren] = useState("0");
    const { register } = useAuth();

    const [posting, setPosting] = useState(false)
    async function signup() {
        if (pin !== confirmPin) {
            alert("Password does not match")
            return
        }

        setPosting(true)
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
            setPosting(false)
        } else {
            alert(result.data)
            setPosting(false)
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
                        secureTextEntry={true}
                    />

                    <Text style={tw`mt-5`}>Confirm Password</Text>
                    <TextInput
                        placeholder="Confirm Password"
                        style={tw`bg-gray-100 p-3 my-2 rounded-md`}
                        onChangeText={setConfirmPin}
                        value={confirmPin}
                        secureTextEntry={true}
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
                                    setIsMother(true)
                                }}
                                color={isMother ? "#FF392B" : undefined} />
                            <Text style={tw`ml-8 -mt-5`}>
                                Yes {" "}
                            </Text>
                        </View>
                        <View style={tw`mt-2`}>
                            <CheckBox value={!isMother}
                                onValueChange={(value) => {
                                    setIsMother(false)
                                }}
                                color={!isMother ? "#FF392B" : undefined} />
                            <Text style={tw`ml-8 -mt-5`}>
                                No
                            </Text>
                        </View>
                    </View>
                    {
                        isMother && (<>
                            <Text style={tw`mt-5`}>  how many children</Text>

                            <TextInput
                                placeholder="Enter Number of Children"
                                style={tw`bg-gray-100 p-3 my-2 rounded-md`}
                                onChangeText={setChildren}
                                value={children}
                                keyboardType="numeric"
                            />
                        </>)
                    }



                    <Text style={tw`my-2`}>
                        We fellowship daily starting at 2am
                    </Text>


                    {posting ? <View style={tw`bg-[#FF392B] mt-2 flex-row justify-center items-center p-1.5 rounded-md`}>
                        <ActivityIndicator size="large" color="#fff" />
                    </View> : <TouchableOpacity
                        style={tw`bg-[#FF392B] mt-2 p-2 rounded-md`}
                        onPress={() => {
                            signup()
                        }}
                    >
                        <Text style={tw`text-white text-center font-bold text-lg`}>Signup</Text>
                    </TouchableOpacity>}



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