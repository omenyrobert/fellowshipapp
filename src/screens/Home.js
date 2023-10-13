import { View, Text, ScrollView, RefreshControl } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import HomeHeader from "../components/HomeHeader"
import Banner from "../components/home/Banner"
import PreviousMeeting from "../components/home/PreviousMeetings"
import News from "../components/home/News"
import { useCallback, useState } from "react"
import { useAppData } from "../hooks/app-data"


const Home = () => {
    const [refreshing, setRefreshing] = useState(false);
    const { getNews, getPrayers, getTestimonies, getMeetings, getUsers, getChatUsers, getNotes } = useAppData()
    const onRefresh = useCallback(() => {
        async function refresh() {
            setRefreshing(true);
            await getNews()
            await getPrayers()
            await getTestimonies()
            await getMeetings()
            await getUsers()
            await getChatUsers()
            await getNotes()
            setRefreshing(false);
        }
        refresh()
    }, []);

    return (
        <SafeAreaView style={{ backgroundColor: '#fff' }}>
            <ScrollView style={{ backgroundColor: '#fff' }} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            } >
                <HomeHeader />
                <ScrollView>
                    <Banner />
                    {/* <PrayerRequests /> */}
                    <News />
                    <PreviousMeeting />

                </ScrollView>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Home