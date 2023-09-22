import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import tw from 'twrnc';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';

const About = ({ navigation }) => {

    return (
        <SafeAreaView style={{ backgroundColor: '#fff' }}>
           
            <ScrollView style={{ backgroundColor: '#f5f5f5' }}>
                <View style={{ backgroundColor: '#3326AE', height: 200 }}>

                </View>
                <View>
                    <View style={tw`flex-row justify-center -mt-20`}>
                        <Image source={{ uri: 'https://media.istockphoto.com/id/1412450902/photo/african-beauty-woman-face-profile-natural-curly-afro-hairstyle-over-white-isolated-fashion.jpg?s=612x612&w=0&k=20&c=oe4sJL-yCi--R9RewYbhovlYN2WaJ_T7tp9pf_OSlzU=' }} style={{ objectFit: 'cover', borderColor: '#fff', borderWidth: 5, height: 170, width: 170, borderRadius: 100 }} />
                    </View>


                    <View style={tw` border-b border-gray-200  flex-row p-3  mx-5 mt-5`}>
                        <View>
                            <MaterialIcons name="email" style={tw`text-2xl mt-2`} />

                        </View>
                        <View>

                            <Text style={tw`ml-5 text-xl`}>
                                rob@gmail.com
                            </Text>
                            <Text style={tw`ml-5 font-light text-sm`}>
                                Omeny Robert
                            </Text>
                        </View>

                    </View>

                    <View style={tw` border-b border-gray-200  flex-row p-3 mx-5 mt-5`}>
                        <MaterialIcons name="email" style={tw`text-lg`} />
                        <Text style={tw`ml-5 font-light text-sm`}>
                            +256 768 890 876
                        </Text>

                    </View>
                    <View style={tw` border-b border-gray-200  flex-row p-3 mx-5 mt-5`}>
                        <MaterialIcons name="email" style={tw`text-lg`} />
                        <Text style={tw`ml-5 font-light text-sm`}>
                            +256 768 890 876
                        </Text>
                    </View>




                    <TouchableOpacity onPress={() => navigation.navigate('Login')} style={tw`p-3 m-5 bg-[#FF392B] rounded-md`}>
                        <Text style={tw`text-center`}>
                            Logout
                        </Text>
                    </TouchableOpacity>

                </View>
                <View style={{ height: 100 }}>

                </View>
            </ScrollView>
           
        </SafeAreaView>


    )
}
export default About