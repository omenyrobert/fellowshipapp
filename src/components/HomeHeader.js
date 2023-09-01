
import { View, Image, TouchableOpacity, Text } from 'react-native';
import tw from 'twrnc';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const HomeHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={tw`flex-row px-3 pb-5 pt-8 justify-between`} >
      {/* Logo */}
      <View >
        <Text style={tw`text-xl text-[#193296] font-bold`}>
          Omeny Robert
        </Text>
        <Text>
          Welcome to prayer room
        </Text>
      </View>

      {/* Profile Avatar */}
      <View style={tw`flex-row `}>
        <TouchableOpacity onPress={() => navigation.navigate('Chat')} >
          <AntDesign name="message1" size={30} style={tw`relative`} color="black" />
          <View style={tw`bg-red-700 ml-5  rounded-full h-5 w-5 pl-1 absolute`}>
            <Text style={tw`text-white font-bold`} >O</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={tw`bg-amber-600 ml-10  rounded-full h-8 w-8 pl-2`} onPress={() => navigation.navigate('About')}>
          <Text style={tw`text-white font-bold text-xl`} >O</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;
