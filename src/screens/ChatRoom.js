import { View, Text, Image, ScrollView, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import tw from 'twrnc';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import HomeHeader from "../components/HomeHeader";
const logourl = require('../../assets/icon.png')
import { Ionicons } from '@expo/vector-icons';
const ChatRoom = () => {

    const chat = [
        {
            id: 1,
            name: 'Mercy Hut',
            time: '3:10pm',
            isSend: 1,
            description: 'Good eveing',
            photo: 'https://media.istockphoto.com/id/1412450902/photo/african-beauty-woman-face-profile-natural-curly-afro-hairstyle-over-white-isolated-fashion.jpg?s=612x612&w=0&k=20&c=oe4sJL-yCi--R9RewYbhovlYN2WaJ_T7tp9pf_OSlzU=',
        },
        {
            id: 2,
            name: 'Akao Teddy',
            time: '7:00pm',
            isSend: 0,
            description: 'Yes',
            photo: 'https://media.istockphoto.com/id/534308672/photo/beautiful-young-african-woman-laughing-outdoors.jpg?s=612x612&w=0&k=20&c=TtvBLZvZDCD-_XcIv27E3Oq3-yJredgR3EaQXACsOck=',
        },
        {
            id: 3,
            name: 'Nakalema Jane',
            time: '6:10am',
            isSend: 1,
            description: 'We had court case about our land that the God helped us to win',
            photo: 'https://media.istockphoto.com/id/1471295100/photo/senior-black-woman-wearing-white-glasses.jpg?s=612x612&w=0&k=20&c=rdnzD53iVZkXa7O_3qLX-duYLn8q9qPeqyOa4Hbpd7E=',
        },
        {
            id: 4,
            name: 'Julian Mukibi',
            time: '3:10pm',
            isSend: 0,
            description: 'How have you been',
            photo: 'https://media.istockphoto.com/id/1340257475/photo/young-black-african-woman-explaining-on-video-call-job-interview-why-is-she-the-best-choice.jpg?s=612x612&w=0&k=20&c=VtNFp4dT1a-ivLF-4CIWMT5SNfhSqN4v3qtMoeNuZ6Y=',
        },
        {
            id: 5,
            name: 'Mercy Hut',
            time: '3:10pm',
            isSend: 1,
            description: 'Hey Praise God',
            photo: 'https://media.istockphoto.com/id/1412450902/photo/african-beauty-woman-face-profile-natural-curly-afro-hairstyle-over-white-isolated-fashion.jpg?s=612x612&w=0&k=20&c=oe4sJL-yCi--R9RewYbhovlYN2WaJ_T7tp9pf_OSlzU=',
        },
        {
            id: 6,
            name: 'Mercy Hut',
            time: '3:10pm',
            isSend: 1,
            description: 'I wont attend today',
            photo: 'https://media.istockphoto.com/id/1412450902/photo/african-beauty-woman-face-profile-natural-curly-afro-hairstyle-over-white-isolated-fashion.jpg?s=612x612&w=0&k=20&c=oe4sJL-yCi--R9RewYbhovlYN2WaJ_T7tp9pf_OSlzU=',
        },
        {
            id: 7,
            name: 'Nakalema Jane',
            isSend: 0,
            description: 'its ok',
            photo: 'https://media.istockphoto.com/id/1471295100/photo/senior-black-woman-wearing-white-glasses.jpg?s=612x612&w=0&k=20&c=rdnzD53iVZkXa7O_3qLX-duYLn8q9qPeqyOa4Hbpd7E=',
        },
        {
            id: 8,
            name: 'Nakalema Jane',
            isSend: 0,
            description: 'We will miss you',
            photo: 'https://media.istockphoto.com/id/1471295100/photo/senior-black-woman-wearing-white-glasses.jpg?s=612x612&w=0&k=20&c=rdnzD53iVZkXa7O_3qLX-duYLn8q9qPeqyOa4Hbpd7E=',
        },
        {
            id: 9,
            name: 'Julian Mukibi',
            time: '11:10am',
            isSend: 1,
            description: 'We bought a new house for our retirement in Gulu',
            photo: 'https://media.istockphoto.com/id/1340257475/photo/young-black-african-woman-explaining-on-video-call-job-interview-why-is-she-the-best-choice.jpg?s=612x612&w=0&k=20&c=VtNFp4dT1a-ivLF-4CIWMT5SNfhSqN4v3qtMoeNuZ6Y=',
        },
        {
            id: 10,
            name: 'Hellen Lukoma',
            time: '03:10pm',
            isSend: 0,
            description: 'I want to thank God for the Job that my Husband got',
            photo: 'https://media.istockphoto.com/id/1465454175/photo/portrait-of-beautiful-black-millennial-entrepreneur-woman-with-an-afro-hairstyle-and-looking.jpg?s=612x612&w=0&k=20&c=jtvDUfJGhxlT6S5vCgdhe7NNeOfCM4n4rmjvUuZGfWk=',
        }

    ]

    return (
        <SafeAreaView style={{ backgroundColor: '#fff' }}>
            <HomeHeader />
            <View style={tw`flex-row p-2`}>
                <View>
                    <Image source={logourl} style={tw`w-14 h-14 border-2 border-blue-700 rounded-full`} />
                </View>
                <View style={{ marginLeft: 10 }}>
                    <Text style={tw`text-xl font-bold text-[#FF392B]`}>Prayer room</Text>
                    <Text>Talk to everyone</Text>
                </View>

            </View>
            <ScrollView style={tw`bg-gray-100 p-3 h-[65%]`}>
                <View style={tw`mx-2 mt-2`}>

                    {chat.map((item) => {
                        return (
                            <>
                                <View key={item.id}>
                                    {
                                        item.isSend === 1 ?
                                            <View style={tw`flex-row  m-5`}>
                                                <View style={tw`bg-gray-100 h-10 w-10 rounded-full  p-1 border border-[#3326AE]`}>
                                                    <Image source={{ uri: item.photo }} style={{ objectFit: 'cover', height: '100%', width: '100%', borderRadius: 100 }} />

                                                </View>

                                                <View style={tw`mx-2 w-[70%] `}>
                                                    <View style={tw`flex-row `}>
                                                        <Text style={tw`text-[#3326AE] font-bold`}>
                                                            {item.name}
                                                        </Text>
                                                        <Text style={tw`text-[#3326AE] ml-5`}>
                                                            {item.time}
                                                        </Text>
                                                    </View>


                                                    <Text style={tw`text-white bg-[#3326AE] mt-1 p-2 rounded-md`}>
                                                        {item.description}
                                                    </Text>
                                                </View>
                                                <View style={tw`w-10`}>

                                                </View>

                                            </View> :
                                            <View style={tw`flex-row m-5`}>
                                                <View style={tw`w-[20%]`}>

                                                </View>
                                                <View style={tw`mx-2 w-[80%]`}>
                                                    <View style={tw`flex-row justify-between`}>
                                                        <View>

                                                        </View>
                                                        <Text style={tw`text-[#3326AE] ml-5`}>
                                                            {item.time}
                                                        </Text>
                                                        <Text style={tw`text-[#3326AE] font-bold`}>
                                                            {item.name}
                                                        </Text>
                                                        <View style={tw`bg-gray-100 h-10 w-10 rounded-full  p-1 border border-[#3326AE]`}>
                                                            <Image source={{ uri: item.photo }} style={{ objectFit: 'cover', height: '100%', width: '100%', borderRadius: 100 }} />

                                                        </View>
                                                        <View>

                                                        </View>
                                                    </View>

                                                    <View style={tw`flex-row -mt-5`}>
                                                        <View style={tw`w-[75%]`}>
                                                            <Text style={tw`text-gray-700 bg-white mt-1 p-2 rounded-md`}>
                                                                {item.description}
                                                            </Text>
                                                        </View>
                                                        <View style={tw`w-[25%]`}>

                                                        </View>
                                                    </View>

                                                </View>


                                            </View>

                                    }
                                </View>
                            </>

                        )
                    })}


                </View>
                <View style={{ height: 50 }}>

                </View>
            </ScrollView>
            <View style={tw`flex-row p-2`}>

                <TextInput placeholder="text message"
                    style={tw`bg-gray-100 p-3 m-2 w-[80%] rounded-md`} />
                <Ionicons name="send-sharp" style={{marginLeft: 10, marginTop: 20}} size={32} color="#FF392B" />
            </View>
        </SafeAreaView>


    )

}
export default ChatRoom