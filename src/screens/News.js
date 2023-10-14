import { View, Text, ScrollView, ImageBackground, RefreshControl } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import HomeHeader from "../components/HomeHeader"
import tw from 'twrnc';
import React, { useState, useEffect, useContext } from 'react';
import axiosInstance, { UPLOADS_URL } from "../hooks/axios";
import { AuthContext } from "../context/Auth";
import { useAppData } from "../hooks/app-data";
import { AppContext } from "../context/AppData";


const News = () => {
    const { user } = useContext(AuthContext)
    const { news } = useContext(AppContext)
    const { getNews } = useAppData()
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getNews().then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        getNews()
    }, [])


    return (
        <SafeAreaView style={{ backgroundColor: '#fff' }}>
            <HomeHeader />
            <ScrollView style={{ padding: 20 }} refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>

                <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#FF392B' }}>News</Text>

                {news.map((pray) => {
                    return (
                        <View key={pray.id} style={tw`border border-gray-200 rounded-lg my-2`}>

                            <ImageBackground
                                source={{ uri: pray.image }} // Replace with your image path or URL


                            >
                                <View style={tw`rounded-lg h-40 p-5 bg-black/50`}>
                                    <View style={tw`h-18`}>

                                    </View>
                                    <View style={tw`flex-row justify-between`}>
                                        <Text style={tw`text-lg font-bold text-white`}>
                                            {pray.title}
                                        </Text>
                                        <Text style={tw`text-white p-2 rounded-md text-xs bg-[#FF392B]`}>
                                            {
                                                new Date(pray.date).toLocaleDateString()
                                            }
                                        </Text>
                                    </View>
                                    <Text style={tw`font-medium text-white`}>
                                        {pray.sub_title}
                                    </Text>



                                </View>
                            </ImageBackground>
                            <Text style={tw`text-lg mt-2 ml-5`} >
                                Venue: {pray.location}
                            </Text>
                            <Text style={tw`text-gray-500 mt-2 m-5`} >
                                {pray.description}
                            </Text>
                        </View>
                    )
                })}
                <View style={{ height: 200 }}>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default News