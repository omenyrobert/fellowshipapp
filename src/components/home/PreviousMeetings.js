import { View, Text, SafeAreaView } from "react-native"
import tw from 'twrnc';
import { Feather, FontAwesome } from '@expo/vector-icons';

const PreviousMeeting = () => {

    const trans = [
        {
            id: 1,
            type: 'Jesus the healer',
            account: 'Mathew 11:32',
            date: '22nd June 2023'
        },
        {
            id: 2,
            type: 'Overcoming Trials',
            account: 'Genesis 7:33',
            date: '3rd Dec 2023'
        },
        {
            id: 3,
            type: 'Light to the world',
            account: 'Luke 22:3',
            date: '3rd Aug 2023'
        },
        {
            id: 4,
            type: 'The power of prayer',
            account: 'Philomon 1:4',
            date: '22nd June 2023'
        },
        {
            id: 5,
            type: 'Blessing in Giving',
            account: 'John 2:44',
            date: '22nd June 2023'
        }
    ]

    return (

        <View>
            <Text style={tw`font-medium ml-5 mt-8 text-xl`}>
                Previous Meeting
            </Text>
            {trans.map((item) => {
                return (
                    <View key={item.id} style={tw`p-3 rounded-md border-b border-gray-200 mx-5 my-2`}>
                        <View style={tw``}>
                            <View style={tw`flex-row`}>
                                <View style={tw`mt-1`}>
                                    <Feather name="video" size={24} color="blue" />
                                </View>
                                <View style={tw`ml-2`}>
                                    <Text style={tw`text-lg font-medium -mt-1`}>
                                        {item.type}
                                    </Text>
                                    {/* <Text style={tw`text-gray-500 -mt-1`}>
                                        {item.date}
                                    </Text> */}
                                </View>


                            </View>
                            

                        </View>
                        <View style={tw`flex-row mt-5`}>
                            <Text>
                                {item.account}
                            </Text>
                            <Text style={tw`ml-5 py-1 px-2 rounded text-gray-700 bg-gray-100`}>
                                {item.date}
                            </Text>
                        </View>

                    </View>
                )
            })}
            <View style={{ height: 100 }}>

            </View>
        </View>

    )
}
export default PreviousMeeting