import { View, Image, TouchableOpacity, StyleSheet, ImageBackground, Text } from 'react-native';
import tw from 'twrnc';
import { AntDesign, MaterialIcons, FontAwesome5, Feather, Foundation, Entypo } from '@expo/vector-icons';
const bg = require('../../assets/bg.jpg')
import { useNavigation, useRoute } from "@react-navigation/native";
import Modal from 'react-native-modal';
import { AuthContext } from '../context/Auth';
import { useAuth } from '../hooks/auth';
import React, { useContext } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DrawerComp = ({ visible, onClose }) => {
    if (!visible) {
        return null;
    }

    const { setInit, user, init } = useContext(AuthContext);
    const { logout } = useAuth()

    async function handleLogout() {
        const isLoggedOut = await logout()
        if (isLoggedOut.status) {
            setInit(!init)
        } else {
            alert(isLoggedOut.data)
        }
    }

    const navigation = useNavigation();
    const route = useRoute();

    const gotohome = () => {
        navigation.navigate('Home')
        onClose(!visible)
    }

    const gotoprofile = () => {
        navigation.navigate('Profile')
        onClose(!visible)
    }



    const gotonotes = () => {
        navigation.navigate('Notes')
        onClose(!visible)
    }


    const gotoprayer = () => {
        navigation.navigate('Prayer')
        onClose(!visible)
    }

    const gotonews = () => {
        navigation.navigate('News')
        onClose(!visible)
    }


    const gototest = () => {
        navigation.navigate('Testimonies')
        onClose(!visible)
    }




    return (
        <Modal isVisible={visible}
            animationIn="slideInLeft"  // Set the desired animation type
            animationInTiming={800}
            animationOutTiming={1000}
            animationOut="slideOutLeft" visible={visible}>
            <View style={tw`h-[200] w-[120%] flex-row -ml-5 top-0 left-0 right-0`}>
                <View style={tw`bg-white h-full w-[60%]`}>

                    <View style={tw`p-5 border-b border-gray-200`}>

                        <Image
                            source={
                                user?.profile_picture ? {
                                    uri: user?.profile_picture,
                                } : require('./apic.jpeg')
                            }
                            style={{ height: 120, width: 120, marginLeft: '20%', borderRadius: 100, marginBottom: 10 }}
                        />

                        <View>
                            <Text
                                style={{

                                    fontSize: 20,
                                    color: '#3326AE',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    marginBottom: 5,
                                }}>
                                {user?.full_name}

                            </Text>
                            <Text
                                style={{
                                    color: '#000',
                                    marginRight: 5,
                                    marginTop: -5,
                                    textAlign: 'center'
                                }}>
                                {user?.email}
                            </Text>

                        </View>
                    </View>

                    <View style={{ height: '60%', marginTop: 5 }}>

                        <TouchableOpacity onPress={gotohome} style={route.name === 'Home' ? styles.activeView : styles.inactiveView}>
                            <Entypo name="home" size={22} style={route.name === 'Home' ? styles.activeIcon : styles.inactiveIcon} />
                            <Text size={22} style={route.name === 'Home' ? styles.activeText : styles.inactiveText}>Home</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={gotoprofile} style={route.name === 'Profile' ? styles.activeView : styles.inactiveView}>
                            <Entypo name="user" size={22} style={route.name === 'Profile' ? styles.activeIcon : styles.inactiveIcon} />
                            <Text style={route.name === 'Profile' ? styles.activeText : styles.inactiveText}>Profile</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={gotonotes} style={route.name === 'Notes' ? styles.activeView : styles.inactiveView}>
                            <Entypo name="pencil" size={22} style={route.name === 'Notes' ? styles.activeIcon : styles.inactiveIcon} />
                            <Text style={route.name === 'Notes' ? styles.activeText : styles.inactiveText}>Notes</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={gotoprayer} style={route.name === 'Prayer' ? styles.activeView : styles.inactiveView}>
                            <FontAwesome5 name="praying-hands" size={22} style={route.name === 'Prayer' ? styles.activeIcon : styles.inactiveIcon} />
                            <Text style={route.name === 'Prayer' ? styles.activeText : styles.inactiveText}>Prayer Requests</Text>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={gototest} style={route.name === 'Testimonies' ? styles.activeView : styles.inactiveView}>
                            <Entypo name="emoji-happy" size={22} style={route.name === 'Testimonies' ? styles.activeIcon : styles.inactiveIcon} />
                            <Text style={route.name === 'Testimonies' ? styles.activeText : styles.inactiveText}>Testimonies</Text>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={gotonews} style={route.name === 'News' ? styles.activeView : styles.inactiveView}>
                            <Foundation name="clipboard-notes" size={22} style={route.name === 'News' ? styles.activeIcon : styles.inactiveIcon} />
                            <Text style={route.name === 'News' ? styles.activeText : styles.inactiveText}>News</Text>
                        </TouchableOpacity>



                    </View>


                    <TouchableOpacity style={tw`bg-[#FF392B] p-2 mx-5 rounded-md`} onPress={handleLogout} >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="exit-outline" style={{ color: '#fff', marginLeft: 70 }} size={22} />
                            <Text
                                style={{
                                    fontSize: 15,
                                    textAlign: 'center',
                                    marginLeft: 5,
                                    color: '#fff'
                                }}>
                                logout
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={onClose} style={tw`h-full w-[40%]`}>

                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    activeView: {
        backgroundColor: '#3326AE',
        marginHorizontal: 10,
        marginVertical: 5,
        flexDirection: 'row',
        padding: 10,
        borderRadius: 8
    },
    activeIcon: {
        color: '#fff',
    },
    inactiveIcon: {
        color: '#000',
    },
    activeText: {
        color: '#fff',
        marginLeft: 30,
        fontSize: 18,
        marginTop: -2
    },
    inactiveText: {
        color: '#000',
        marginLeft: 30,
        fontSize: 18,
        marginTop: -2
    },
    inactiveView: {
        marginHorizontal: 10,
        marginVertical: 5,
        flexDirection: 'row',
        padding: 10,
    },
});

export default DrawerComp;
