import { View, Text, ScrollView, ImageBackground } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import HomeHeader from "../components/HomeHeader"
import tw from 'twrnc';


const News = () => {
    const news = [
        {
            id: 1,
            name: 'Pray For the Sick',
            description: 'All sick people in the hospitals and the ones who are still at home helpless',
            date: '12th June',
            photo: 'https://media.istockphoto.com/id/1312641893/photo/african-man-with-oxygen-support-in-hospital-room.jpg?s=612x612&w=0&k=20&c=aZFpfoxbIqjnPIphkRd5M7Z6NW139TU2PKkaB264SBc=',
        },
        {
            id: 2,
            name: 'Peace',
            description: 'Lets pray for peace in our nation and the whole world at large',
            date: '1st July',
            photo: 'https://media.istockphoto.com/id/1345174163/photo/people-with-raised-fists-at-a-demonstration-in-the-city.jpg?s=612x612&w=0&k=20&c=O9UAMvOuvCVm6DYk_r5_VhMLPHZUHeQVr4Kxc63nZcI=',
        },
        {
            id: 3,
            name: 'Financila Break through',
            description: 'To God who supplies to all His people and abandantly',
            date: '12th Aug',
            photo: 'https://media.istockphoto.com/id/1178153976/photo/successful-two-african-american-young-businesspeople-sitting-on-desk-using-digital-tablet.jpg?s=612x612&w=0&k=20&c=l3Hl3n4ua0k-SXpDKed5mh1AbAB4yBWBJJxiz4USuF0=',
        },
        {
            id: 4,
            name: 'Orphans',
            description: 'Pray for God provision to all the kids on streets and other else wher',
            date: '10th Dec',
            photo: 'https://media.istockphoto.com/id/992079008/photo/poor-dirty-masai-children-with-faces-and-mouth-covered-with-flies.jpg?s=612x612&w=0&k=20&c=wpbOX49ZB3kEC4cgbvyDZ0i9WbHh1_PPTZeayBClj30=',
        },

    ]
    return (
        <SafeAreaView style={{ backgroundColor: '#fff' }}>
            <HomeHeader />
            <ScrollView style={{ padding: 20 }}>

                <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#FF392B' }}>News</Text>

                {news.map((pray) => {
                    return (
                        <View style={tw`border border-gray-200 rounded-lg my-2`}>

                            <ImageBackground
                                source={{ uri: pray.photo }} // Replace with your image path or URL

                                key={pray.id}
                            >
                                <View style={tw`rounded-lg h-40 p-5 bg-black/50`}>
                                    <View style={tw`h-18`}>

                                    </View>
                                    <View style={tw`flex-row justify-between`}>
                                        <Text style={tw`text-lg font-bold text-white`}>
                                            {pray.name}
                                        </Text>
                                        <Text style={tw`text-white p-2 rounded-md text-xs bg-[#FF392B]`}>
                                            {pray.date}
                                        </Text>
                                    </View>
                                    <Text style={tw`font-medium text-white`}>
                                        {pray.name}
                                    </Text>



                                </View>
                            </ImageBackground>
                            <Text style={tw`text-lg mt-2 ml-5`} >
                                Venue: Kira
                            </Text>
                            <Text style={tw`text-gray-500 mt-2 m-5`} >
                                {pray.description}
                            </Text>
                        </View>
                    )
                })}
                <View style={{height: 200}}>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default News