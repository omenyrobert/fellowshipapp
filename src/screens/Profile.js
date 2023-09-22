import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import tw from 'twrnc';
import { Feather, FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import HomeHeader from "../components/HomeHeader";

const Profile = ({ navigation }) => {

    return (
        <SafeAreaView style={{ backgroundColor: '#fff' }}>

            <ScrollView style={{ backgroundColor: '#f5f5f5' }}>
                <HomeHeader />
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
                        <Ionicons name="ios-pencil" size={20} style={tw`ml-5 font-light`} color="gray" />

                    </View>

                    <View style={tw` border-b border-gray-200  flex-row p-3 mx-5 mt-5`}>
                        <Feather name="phone" size={24} color="black" />
                        <Text style={tw`ml-5 font-light text-sm`}>
                            +256 768 890 876
                        </Text>
                        <Ionicons name="ios-pencil" size={20} style={tw`ml-5 font-light`} color="gray" />

                    </View>
                    <View style={tw` border-b border-gray-200  flex-row p-3 mx-5 mt-5`}>
                        <FontAwesome name="child" size={24} color="black" />
                        <Text style={tw`ml-5 font-light text-sm`}>
                            2 children
                        </Text>
                        <Ionicons name="ios-pencil" style={tw`ml-5 font-light`} size={20} color="gray" />
                    </View>


                </View>
                <View style={{ height: 100 }}>

                </View>
            </ScrollView>

        </SafeAreaView>


    )
}
export default Profile