import { View, Text, Image, ScrollView, TouchableOpacity, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import tw from 'twrnc';
import { Feather, EvilIcons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import HomeHeader from "../components/HomeHeader";
import { useNavigation } from "@react-navigation/native";

const Notes = () => {
    const navigation = useNavigation();
    
    return (
        <SafeAreaView style={{ backgroundColor: '#fff' }}>
            <HomeHeader />
            <ScrollView style={{ backgroundColor: '#f5f5f5' }}>
                <View style={tw`p-5`}>
                    <Text>Take Notes</Text>
                    <View style={tw`p-2 border-b border-gray-300 flex-row`}>
                        <View>
                            <EvilIcons style={tw`mt-5`} name="pencil" size={34} color="black" />
                        </View>
                        <View style={tw`ml-5`} >
                            <Text style={tw`text-xl font-medium `}>Serving God</Text>
                            <Text style={tw`text-gray-500`}>Tuesday 20th 2023</Text>
                        </View>
                    </View>
                    <View style={tw`p-2 border-b mb-5 border-gray-300 flex-row`}>
                        <View>
                            <EvilIcons style={tw`mt-5`} name="pencil" size={34} color="black" />
                        </View>
                        <View style={tw`ml-5`} >
                            <Text style={tw`text-xl font-medium `}>Power Of Prayer</Text>
                            <Text style={tw`text-gray-500`}>Wed 10th 2023</Text>
                        </View>
                    </View>
                
                </View>

                <View style={{ height: 100 }}>

                </View>
            </ScrollView>
        </SafeAreaView>


    )

}
export default Notes