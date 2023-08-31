import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import ForgotPin from "./screens/ForgotPin";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import { Feather, FontAwesome5, Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Meeting from "./screens/Meeting";
import Give from "./screens/Give";
import Chat from "./screens/Chat";
import ChatRoom from "./screens/ChatRoom";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
function TabNav() {
    return (
        <Tab.Navigator tabBarOptions={{
            activeTintColor: '#193296',

            labelStyle: {
                fontSize: 12,
                fontWeight: 'medium',
            },
        }} >

            {/* home icon */}
            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />, headerShown: false
            }} />


            {/* Meeting icomn */}
            <Tab.Screen name="Meeting"
                options={{
                    tabBarIcon: ({ color }) => <Feather name="video" size={24} color={color} />, headerShown: false

                }}
                component={Meeting} />



            {/* give icon */}
            <Tab.Screen name="Give"
                options={{
                    tabBarIcon: ({ color }) => <FontAwesome5 name="donate" size={24} color={color} />, headerShown: false
                }}
                component={Give} />



            {/* Chat icon */}
            <Tab.Screen name="Chat"
                options={{
                    tabBarIcon: ({ color }) => <Entypo name="chat" size={24} color={color} />, headerShown: false
                }}
                component={Chat} />

                

        </Tab.Navigator>
    )
}

function StackNav() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ForgotPin" component={ForgotPin} />
            <Stack.Screen name="ChatRoom" component={ChatRoom} />
            <Stack.Screen name="TabNav" component={TabNav} />
        </Stack.Navigator>
    )
}

export default function Navigation() {
    return (
        <>
            <NavigationContainer>
                <StackNav />
                {/* <TabNav /> */}
            </NavigationContainer>
        </>
    )
}