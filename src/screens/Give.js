import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import tw from 'twrnc';
import { Feather, FontAwesome } from '@expo/vector-icons';
import HomeHeader from "../components/HomeHeader";
import Banner from "../components/home/Banner";

const Give = () => {

    const trans = [
        {
            id: 1,
            name: 'Omeny Robert',
            amount: '350,000',
            sub: 1,
            account: '+256 756 8976 578',
            cat: 'Airtel Money',
            date: '22nd June 2023',
            isReady: 1,
        },
        {
            id: 2,
            name: 'William Omiel',
            amount: '50,000',
            sub: 1,
            account: '+256 776 8976 578',
            cat: 'Mobile Money',
            date: '3rd Dec 2023',
            isReady: 0,
        },
        {
            id: 3,
            name: 'Give Cash',
            amount: '1,050,000',
            sub: 2,
            account: 'ABSA Bank',
            cat: 'Benard Joel',
            date: '3rd Aug 2023',
            isReady: 1,
        },
        {
            id: 4,
            name: 'Cash Top up',
            amount: '90,000',
            account: '+256 776 8976 578',
            cat: 'Equity Bank',
            sub: 2,
            date: '22nd June 2023',
            isReady: 0,
        },
        {
            id: 5,
            name: 'Withdrawal',
            amount: '750,000',
            account: '+256 776 8976 578',
            cat: 'Centinary Bank',
            sub: 2,
            date: '22nd June 2023',
            isReady: 0,
        },
    ]

    return (
        <SafeAreaView style={{ backgroundColor: '#fff' }}>
            <HomeHeader />
            <ScrollView>
                <Banner />
                <View>
                    <Text style={tw`font-medium ml-5 text-xl`}>
                        Give Cash
                    </Text>
                    <View style={tw`bg-white mt-2 pt-5`}>

                        {trans.map((item) => {
                            return (
                                <View key={item.id} style={tw`p-3 rounded-md border-b border-gray-200 mx-5 my-2`}>
                                    <View style={tw`flex-row justify-between`}>
                                        <View style={tw`flex-row`}>
                                            <View style={tw`mt-1`}>
                                                {item.sub === 1 ? <Feather name="smartphone" size={24} color="black" /> : <FontAwesome name="cc-mastercard" size={24} color="black" />}
                                            </View>
                                            <View style={tw`ml-2`}>
                                                <Text style={tw`text-lg font-medium -mt-1`}>
                                                    {item.cat}
                                                </Text>
                                                <Text style={tw`text-gray-500 -mt-1`}>
                                                    {item.date}
                                                </Text>
                                                <View style={tw`mt-5`}>
                                                    <Text>
                                                        {item.account}
                                                    </Text>
                                                    <Text style={tw`-mt-1 font-light  text-gray-700`}>
                                                        {item.name}
                                                    </Text>
                                                </View>
                                            </View>


                                        </View>
                                        <View>
                                            <Text style={tw`text-2xl font-bold text-[#149A1A]`}>
                                                {item.amount}
                                            </Text>
                                            {item.isReady === 1 ? <TouchableOpacity style={tw`text-white mt-5 font-bold p-2 rounded-md bg-[#149A1A]`}>
                                                <Text style={tw`text-white font-bold text-center`} >Withdraw</Text>
                                            </TouchableOpacity> : <TouchableOpacity style={tw`text-white mt-5 p-2 rounded-md bg-gray-100`}>
                                                <Text style={tw`font-bold text-center`} >Not Mature</Text>
                                            </TouchableOpacity>}


                                        </View>

                                    </View>


                                </View>
                            )
                        })}
                    </View>
                </View>
                <View style={{ height: 100 }}>

                </View>
            </ScrollView>
        </SafeAreaView>


    )
}
export default Give