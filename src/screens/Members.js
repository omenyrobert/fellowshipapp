import { View, Text, Image, ScrollView, TouchableOpacity, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import tw from 'twrnc';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import HomeHeader from "../components/HomeHeader";
import { useNavigation } from "@react-navigation/native";
const Members = () => {
    const buses = [
        {
            id: 1,
            name: 'Mercy Hut',
            time: '3:10pm',
            description: 'I thank God for saving my son in a car accident last week',
            photo: 'https://media.istockphoto.com/id/1412450902/photo/african-beauty-woman-face-profile-natural-curly-afro-hairstyle-over-white-isolated-fashion.jpg?s=612x612&w=0&k=20&c=oe4sJL-yCi--R9RewYbhovlYN2WaJ_T7tp9pf_OSlzU=',
        },
        {
            id: 2,
            name: 'Akao Teddy',
            time: '7:00pm',
            description: 'My daughter was admited in University in USA',
            photo: 'https://media.istockphoto.com/id/534308672/photo/beautiful-young-african-woman-laughing-outdoors.jpg?s=612x612&w=0&k=20&c=TtvBLZvZDCD-_XcIv27E3Oq3-yJredgR3EaQXACsOck=',
        },
        {
            id: 3,
            name: 'Nakalema Jane',
            time: '6:10am',
            description: 'We had court case about our land that the God helped us to win',
            photo: 'https://media.istockphoto.com/id/1471295100/photo/senior-black-woman-wearing-white-glasses.jpg?s=612x612&w=0&k=20&c=rdnzD53iVZkXa7O_3qLX-duYLn8q9qPeqyOa4Hbpd7E=',
        },
        {
            id: 4,
            name: 'Julian Mukibi',
            time: '3:10pm',
            description: 'We bought a new house for our retirement in Gulu',
            photo: 'https://media.istockphoto.com/id/1340257475/photo/young-black-african-woman-explaining-on-video-call-job-interview-why-is-she-the-best-choice.jpg?s=612x612&w=0&k=20&c=VtNFp4dT1a-ivLF-4CIWMT5SNfhSqN4v3qtMoeNuZ6Y=',
        },
        {
            id: 5,
            name: 'Hellen Lukoma',
            time: '3:10pm',
            description: 'I want to thank God for the Job that my Husband got',
            photo: 'https://media.istockphoto.com/id/1465454175/photo/portrait-of-beautiful-black-millennial-entrepreneur-woman-with-an-afro-hairstyle-and-looking.jpg?s=612x612&w=0&k=20&c=jtvDUfJGhxlT6S5vCgdhe7NNeOfCM4n4rmjvUuZGfWk=',
        },
        {
            id: 6,
            name: 'Mercy Hut',
            time: '3:10pm',
            description: 'I thank God for saving my son in a car accident last week',
            photo: 'https://media.istockphoto.com/id/1412450902/photo/african-beauty-woman-face-profile-natural-curly-afro-hairstyle-over-white-isolated-fashion.jpg?s=612x612&w=0&k=20&c=oe4sJL-yCi--R9RewYbhovlYN2WaJ_T7tp9pf_OSlzU=',
        },
        {
            id: 7,
            name: 'Akao Teddy',
            time: '3:10pm',
            description: 'My daughter was admited in University in USA',
            photo: 'https://media.istockphoto.com/id/534308672/photo/beautiful-young-african-woman-laughing-outdoors.jpg?s=612x612&w=0&k=20&c=TtvBLZvZDCD-_XcIv27E3Oq3-yJredgR3EaQXACsOck=',
        },
        {
            id: 8,
            name: 'Nakalema Jane',
            description: 'We had court case about our land that the God helped us to win',
            photo: 'https://media.istockphoto.com/id/1471295100/photo/senior-black-woman-wearing-white-glasses.jpg?s=612x612&w=0&k=20&c=rdnzD53iVZkXa7O_3qLX-duYLn8q9qPeqyOa4Hbpd7E=',
        },
        {
            id: 9,
            name: 'Julian Mukibi',
            time: '11:10am',
            description: 'We bought a new house for our retirement in Gulu',
            photo: 'https://media.istockphoto.com/id/1340257475/photo/young-black-african-woman-explaining-on-video-call-job-interview-why-is-she-the-best-choice.jpg?s=612x612&w=0&k=20&c=VtNFp4dT1a-ivLF-4CIWMT5SNfhSqN4v3qtMoeNuZ6Y=',
        },
        {
            id: 10,
            name: 'Hellen Lukoma',
            time: '03:10pm',
            description: 'I want to thank God for the Job that my Husband got',
            photo: 'https://media.istockphoto.com/id/1465454175/photo/portrait-of-beautiful-black-millennial-entrepreneur-woman-with-an-afro-hairstyle-and-looking.jpg?s=612x612&w=0&k=20&c=jtvDUfJGhxlT6S5vCgdhe7NNeOfCM4n4rmjvUuZGfWk=',
        }

    ]
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ backgroundColor: '#fff' }}>
            <HomeHeader />
            <ScrollView style={{ backgroundColor: '#f5f5f5' }}>
                <View style={tw`flex-row relative ml-6 mt-3`}>
                    <FontAwesome style={tw`absolute z-50 mt-3 ml-4`} name="search" size={24} color="black" />
                    <TextInput
                        placeholder="Search for user"
                        style={tw`bg-gray-200 py-3 pl-10 ml-1 border w-[90] border-gray-300 rounded-md`}
                    />
                </View>
                <ScrollView horizontal>
                    {buses.map((item) => {
                        return (
                            <TouchableOpacity key={item.id} onPress={() => navigation.navigate('ChatRoom')} style={tw`m-2 border-b pb-2 border-gray-200`}>
                                <View style={tw`w-20`}>
                                    <View style={tw`bg-gray-100 ml-2 h-14 w-14 rounded-full  p-1 border border-[#193296]`}>
                                        <Image source={{ uri: item.photo }} style={{ objectFit: 'cover', height: '100%', width: '100%', borderRadius: 100 }} />
                                    </View>
                                </View>
                                <Text style={tw`text-[#193296] w-20 text-center font-bold`}>
                                    {((item.name).length > 9) ?
                                        (((item.name).substring(0, 9 - 1)) + '...') :
                                        item.name}
                                    {/* {item.name} */}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>

                <View style={tw`mx-2 mt-2`}>

                    {buses.map((item) => {
                        return (

                            <TouchableOpacity key={item.id} onPress={() => navigation.navigate('ChatRoom')} style={tw`flex-row  m-2 border-b pb-2 border-gray-200`}>
                                <View style={tw`bg-gray-100 h-14 w-14 rounded-full  p-1 border border-[#193296]`}>
                                    <Image source={{ uri: item.photo }} style={{ objectFit: 'cover', height: '100%', width: '100%', borderRadius: 100 }} />

                                </View>

                                <View style={tw`mx-2 w-[80%] `}>
                                    <View style={tw`flex-row justify-between `}>
                                        <Text style={tw`text-[#193296] font-bold`}>
                                            {item.name}
                                        </Text>
                                        <View>

                                            <Text style={tw`text-[#193296]`}>
                                                {item.time}
                                            </Text>


                                        </View>
                                    </View>

                                    <View style={tw`flex-row`}>
                                        <Text style={tw`text-gray-600 w-[85%]`}>
                                            {item.description}
                                        </Text>
                                        <View style={tw`text-gray-600 w-[15%]`} >
                                            <View style={tw`bg-[#FE7D06] w-6  mt-1 rounded-full px-2`} onPress={() => navigation.navigate('About')}>
                                                <Text style={tw`font-bold`} >2</Text>
                                            </View>
                                        </View>
                                    </View>

                                </View>
                                <View style={tw`w-5`}>

                                </View>

                            </TouchableOpacity>
                        )
                    })}


                </View>
                <View style={{ height: 100 }}>

                </View>
            </ScrollView>
        </SafeAreaView>


    )

}
export default Members