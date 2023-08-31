import { View, Text, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import tw from 'twrnc';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import HomeHeader from "../components/HomeHeader";

const Support = () => {



    return (
        <SafeAreaView style={{ backgroundColor: '#fff' }}>
            <HomeHeader />
            <ScrollView style={{ backgroundColor: '#f5f5f5' }}>
                <View>
                    <Text style={tw`font-medium ml-5 text-2xl mt-5`}>
                        Contact Support
                    </Text>

                    <View style={tw`bg-white flex-row p-3 rounded mx-5 mt-5`}>
                        <View>
                            <FontAwesome name="whatsapp" style={tw`text-green-600 text-2xl mt-2`} />
                        </View>
                        <View>

                            <Text style={tw`ml-5 text-xl`}>
                                +256 708 964347
                            </Text>
                            <Text style={tw`ml-5 font-light text-sm`}>
                                WhatsApp
                            </Text>
                        </View>

                    </View>

                    <View style={tw`bg-white flex-row p-3 rounded mx-5 mt-5`}>
                        <View>
                            <Feather name="phone" style={tw`text-gray-600 text-2xl mt-2`} />
                        </View>
                        <View>

                            <Text style={tw`ml-5 text-xl`}>
                                +256 708 964347
                            </Text>
                            <Text style={tw`ml-5 font-light text-sm`}>
                                Call
                            </Text>
                        </View>

                    </View>

                    <View style={tw`bg-white flex-row p-3 rounded mx-5 mt-5`}>
                        <View>
                            <MaterialIcons name="email" style={tw`text-2xl mt-2`} />

                        </View>
                        <View>

                            <Text style={tw`ml-5 text-xl`}>
                                info@transportmoney.com
                            </Text>
                            <Text style={tw`ml-5 font-light text-sm`}>
                                Send an Email
                            </Text>
                        </View>

                    </View>

                    <View style={tw`bg-white flex-row p-3 rounded mx-5 mt-5`}>
                        <View>
                            <MaterialIcons name="email" style={tw`text-2xl mt-2`} />

                        </View>
                        <View>

                            <Text style={tw`ml-5 text-xl`}>
                                admin@transportmoney.com
                            </Text>
                            <Text style={tw`ml-5 font-light text-sm`}>
                                Send an Email
                            </Text>
                        </View>

                    </View>

                    

                  


                </View>
                <View style={{ height: 100 }}>

                </View>
            </ScrollView>
        </SafeAreaView>


    )
}
export default Support