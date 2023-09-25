import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import HomeHeader from "../components/HomeHeader"
import tw from 'twrnc';

const Users = () => {
    return (
        <SafeAreaView style={{ backgroundColor: '#fff' }}>
            <HomeHeader />
            <ScrollView>


                <View style={{ margin: 20 }}>
                    <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#FF392B' }}>Users</Text>
                    <View style={tw`bg-gray-100 p-2`}>
                        <Text style={tw`text-xl font-medium`}>Omeny Robert</Text>
                        <Text style={tw`my-2`}>rob@gmail.com</Text>
                        <Text>+256 789 6986</Text>
                        <Text style={tw`my-2`}>4 children</Text>
                        <Text>Recommended by : Nakato Jamima</Text>
                        <TouchableOpacity
                            style={tw`bg-[#FF392B] mt-2 p-2 rounded-md`}
                        >
                            <Text style={tw`text-white text-center font-bold text-lg`}>Approve</Text>
                        </TouchableOpacity>
                    </View>
                </View>



            </ScrollView>
        </SafeAreaView>
    )
}
export default Users