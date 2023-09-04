import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from "react-native";
import tw from 'twrnc';
import CheckBox from "expo-checkbox";
const logourl = require('../../assets/logo.png')


const SignUp = ({ navigation }) => {

    const [phone, setPhone] = useState("");
    const [pin, setPin] = useState("");
    const [agree, setAgree] = useState(false);
    const [no, setNo] = useState(false);
    return (
        <ScrollView>
            <View>
                <View style={tw`text-white h-70 p-5 bg-[#193296]`}>
                    <Image source={logourl} style={tw`mt-5 w-50 ml-[20%] h-50`} />
                </View>
                <View style={tw`rounded-t-3xl -mt-10 bg-white p-5 h-full`}>

                    <Text style={tw`text-2xl font-bold mt-2`}>SignUp</Text>

                    <Text style={tw`mt-2`}>Full Name</Text>
                    <TextInput
                        placeholder="Full Name"
                        style={tw`bg-gray-100 p-3 my-2 rounded-md`}
                        onChangeText={setPhone}
                        value={phone}
                    />
                    <Text style={tw`mt-5`}>Email</Text>
                    <TextInput
                        placeholder="Enter Email"
                        style={tw`bg-gray-100 p-3 my-2 rounded-md`}
                        onChangeText={setPhone}
                        value={phone}
                    />
                    <Text style={tw`mt-5`}>Phone number/whatsApp</Text>
                    <TextInput
                        placeholder="WhatsApp Number"
                        style={tw`bg-gray-100 p-3 my-2 rounded-md`}
                        onChangeText={setPin}
                        value={pin}
                    />
                    <Text style={tw`mt-5`}>Who recommended You</Text>

                    <TextInput
                        placeholder="Enter Name"
                        style={tw`bg-gray-100 p-3 my-2 rounded-md`}
                        onChangeText={setPin}
                        value={pin}
                    />
                    <Text style={tw`mt-5`}>  Are you a mother</Text>
                    <View style={tw`flex-row mt-2`}>
                        <CheckBox value={agree}
                            onValueChange={() => setAgree(!agree)}
                            color={agree ? "#FE7D06" : undefined} />
                        <Text style={tw`ml-5`}>Yes</Text>
                    </View>
                    <View style={tw`flex-row mt-2`}>
                        <CheckBox value={no}
                            onValueChange={() => setAgree(!no)}
                            color={no ? "#FE7D06" : undefined} />
                        <Text style={tw`ml-5`}>No</Text>
                    </View>

                    <Text style={tw`mt-5`}>  how many children</Text>

                    <TextInput
                        placeholder="Enter Name"
                        style={tw`bg-gray-100 p-3 my-2 rounded-md`}
                        onChangeText={setPin}
                        value={pin}
                    />

                    <Text style={tw`my-2`}>
                        Our fellowship happends every 2am
                    </Text>
                    <TouchableOpacity

                        style={tw`bg-[#FE7D06] mt-2 p-2 rounded-md`}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={tw`text-white text-center font-bold text-lg`}>Signup</Text>
                    </TouchableOpacity>
                    <View style={tw`mt-1 flex-row justify-between`}>
                        <View></View>
                        <Text onPress={() => navigation.navigate('Login')} style={tw`font-semibold text-lg text-[#193296]`}>Login</Text>
                    </View>

                </View>
                <View style={{ height: 70 }}>

                </View>
            </View>
        </ScrollView>
    )
}
export default SignUp