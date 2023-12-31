import React, { useContext } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from '../context/Auth';
import { useAuth } from '../hooks/auth';

const CustomDrawer = props => {
  const { setInit, user, init } = useContext(AuthContext);
  const { logout } = useAuth()

  // const activeItemStyle = {
  //   backgroundColor: '#000',
  // };

  // const inactiveItemStyle = {
  //   backgroundColor: 'white',
  // };

  async function handleLogout() {
    const isLoggedOut = await logout()
    if (isLoggedOut.status) {
      setInit(!init)
    } else {
      alert(isLoggedOut.data)
    }
  }


  const navigation = useNavigation();
  return (
    <DrawerContentScrollView
      {...props}
    >
      <View style={{ flex: 1 }}>

        <ImageBackground
          source={require('../../assets/bg.jpg')}
        >
          <View style={{ backgroundColor: '#00000093', padding: 20 }}>

            <Image
              source={
                user?.profile_picture ? {
                  uri: user?.profile_picture,
                } : require('./apic.jpeg')
              }
              style={{ height: 120, width: 120, borderRadius: 100, marginBottom: 10 }}
            />
            <Text
              style={{
                color: '#fff',
                fontSize: 18,

                marginBottom: 5,
              }}>
              {user?.full_name}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  color: '#fff',
                  marginRight: 5,
                }}>
                {user?.email}
              </Text>

            </View>
          </View>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
          <DrawerItemList  {...props} />
        </View>

        <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
          <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="share-social-outline" size={22} />
              <Text
                style={{
                  fontSize: 15,
                  
                  marginLeft: 5,
                }}>
                Tell a Friend
              </Text>
            </View> */}
          </TouchableOpacity>
          <TouchableOpacity style={tw`bg-[#FF392B] mt-2 p-2 rounded-md`} onPress={handleLogout} >
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
      </View>
    </DrawerContentScrollView >
  );
};

export default CustomDrawer;