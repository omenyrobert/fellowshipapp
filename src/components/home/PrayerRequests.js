import { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import tw from 'twrnc';
import { useNavigation } from "@react-navigation/native";


const PrayerRequests = () => {
    const navigation = useNavigation();
    const prayers = [
        {
            id: 1,
            name: 'Pray For the Sick',
            description: 'All sick people in the hospitals and the ones who are still at home helpless',
            photo: 'https://media.istockphoto.com/id/1312641893/photo/african-man-with-oxygen-support-in-hospital-room.jpg?s=612x612&w=0&k=20&c=aZFpfoxbIqjnPIphkRd5M7Z6NW139TU2PKkaB264SBc=',
        },
        {
            id: 2,
            name: 'Peace',
            description: 'Lets pray for peace in our nation and the whole world at large',
            photo: 'https://media.istockphoto.com/id/1345174163/photo/people-with-raised-fists-at-a-demonstration-in-the-city.jpg?s=612x612&w=0&k=20&c=O9UAMvOuvCVm6DYk_r5_VhMLPHZUHeQVr4Kxc63nZcI=',
        },
        {
            id: 3,
            name: 'Financila Break through',
            description: 'To God who supplies to all His people and abandantly',
            photo: 'https://media.istockphoto.com/id/1178153976/photo/successful-two-african-american-young-businesspeople-sitting-on-desk-using-digital-tablet.jpg?s=612x612&w=0&k=20&c=l3Hl3n4ua0k-SXpDKed5mh1AbAB4yBWBJJxiz4USuF0=',
        },
        {
            id: 4,
            name: 'Orphans',
            description: 'Pray for God provision to all the kids on streets and other else wher',
            photo: 'https://media.istockphoto.com/id/992079008/photo/poor-dirty-masai-children-with-faces-and-mouth-covered-with-flies.jpg?s=612x612&w=0&k=20&c=wpbOX49ZB3kEC4cgbvyDZ0i9WbHh1_PPTZeayBClj30=',
        },

    ]
    return (
        <>
            <Text style={tw`font-medium ml-5 text-xl`}>
                Prayer points
            </Text>
            <View style={tw`mx-2 rounded-md mt-2`}>
                <ScrollView horizontal contentContainerStyle={StyleSheet.container}>
                    {prayers.map((item) => {
                        return (
                            <View style={tw`flex-row m-2 w-[62] h-28 rounded-lg border border-gray-100`}>
                                <View style={tw`w-5/12`}>
                                    <Image key={item.id} source={{ uri: item.photo }} style={tw`rounded-md h-28  w-full`} />
                                </View>

                                <View style={tw`w-7/12 p-2`}>
                                    <Text style={tw`font-bold`}>
                                        {item.name}
                                    </Text>
                                    <Text numberOfLines={3} ellipsizeMode='tail' style={tw`mt-5 text-xs`}>
                                        {item.description}
                                    </Text>
                                </View>

                            </View>



                        )
                    })}

                </ScrollView>
            </View>
        </>
    )
}




export default PrayerRequests;