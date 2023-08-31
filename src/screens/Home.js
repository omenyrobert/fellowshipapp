import { View, Text, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import HomeHeader from "../components/HomeHeader"
import Banner from "../components/home/Banner"
import PrayerRequests from "../components/home/PrayerRequests"
import PreviousMeeting from "../components/home/PreviousMeetings"
import News from "../components/home/News"


const Home = () => {
    return (
        <SafeAreaView style={{ backgroundColor: '#fff' }}>
            <HomeHeader />
            <ScrollView>
                <Banner />
               <PrayerRequests/>
                <News/>
               <PreviousMeeting/>
      
            </ScrollView>
        </SafeAreaView>
    )
}
export default Home