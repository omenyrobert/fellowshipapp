
import { View, Image, TouchableOpacity, Text } from 'react-native';
import tw from 'twrnc';
import { AntDesign, Foundation, Entypo } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from '../context/Auth';
import { useContext, useState } from 'react';
import DrawerComp from './DrawerComp';

const HomeHeader = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext)

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };



  return (
    <View style={tw`flex-row px-3 border-b border-gray-200 mb-2 pb-5 pt-8 justify-between`} >
      {/* Logo */}
      <View >
        <Text style={tw`text-xl text-[#3326AE] font-bold`}>
          {user?.full_name}
        </Text>
        <Text>
          Welcome to prayer room
        </Text>
      </View>

      {/* Profile Avatar */}
      <View style={tw`flex-row `}>
        <TouchableOpacity onPress={() => navigation.navigate('Notes')} style={tw`mr-5`}>
          <Entypo name="pencil" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Chat')} >
          <AntDesign name="message1" size={30} style={tw`relative`} color="black" />
          {/* <View style={tw`bg-red-700 ml-5  rounded-full h-5 w-5 pl-1 absolute`}>
            <Text style={tw`text-white font-bold`} >O</Text>
          </View> */}
        </TouchableOpacity>
        <TouchableOpacity style={tw`ml-8  rounded-full p-2 -mt-2`} onPress={openModal}>
          <AntDesign name="menu-unfold" size={36} color="black" />
        </TouchableOpacity>
        <DrawerComp visible={modalVisible} onClose={closeModal} />
      </View>
    </View>
  );
};

export default HomeHeader;
