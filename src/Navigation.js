import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import ForgotPassword from "./screens/ForgotPassword";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import { Feather, FontAwesome5, Entypo, Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Meeting from "./screens/Meeting";
import Give from "./screens/Give";
import Chat from "./screens/Chat";
import ChatRoom from "./screens/ChatRoom";
import Profile from "./screens/Profile";
import Resset from "./screens/Resset";
import Notes from "./screens/Notes";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "./components/CustomDrawer";
import Prayer from "./screens/Prayer";
import Testmonies from "./screens/Testmonies";
import News from "./screens/News";
import Users from "./screens/Users";
import { AuthContext } from "./context/Auth";
import Testimonies from "./screens/Testmonies";



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function TabNav() {
    return (
        <Tab.Navigator screenOptions={{
            activeTintColor: '#3326AE',

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
                    unmountOnBlur: true,
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
            <Stack.Screen name="Resset" component={Resset} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="ChatRoom" component={ChatRoom} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Notes" component={Notes} />
            <Stack.Screen name="Prayer" component={Prayer} />
            <Stack.Screen name="Testimonies" component={Testimonies} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="News" component={News} />
            <Stack.Screen name="TabNav" component={TabNav} />
        </Stack.Navigator>
    )
}

function DrawNav() {
    const { isAuthenticated } = useContext(AuthContext);
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={{ headerShown: false }}>

            {
                isAuthenticated ? null : (
                    <>
                        <Drawer.Screen options={{
                            drawerIcon: ({ color }) => (
                                <MaterialIcons name="login" size={22} color="black" />
                            ),
                        }} name="Login" component={Login} />
                        <Drawer.Screen options={{
                            drawerIcon: ({ color }) => (
                                <Entypo name="user" size={22} color="black" />
                            ),
                        }} name="SignUp" component={SignUp} />

                        <Drawer.Screen options={{
                            drawerIcon: ({ color }) => (
                                <Entypo name="user" size={22} color="black" />
                            ),
                        }} name="ForgotPassword" component={ForgotPassword} />

                        <Drawer.Screen options={{
                            drawerIcon: ({ color }) => (
                                <Entypo name="user" size={22} color="black" />
                            ),
                        }} name="Resset" component={Resset} />
                    </>
                )
            }
            <Drawer.Screen options={{
                drawerIcon: ({ color }) => (
                    <Ionicons name="home-outline" size={22} color={color} />
                ),
            }} name="Homepage" component={TabNav} />
            <Drawer.Screen options={{
                drawerIcon: ({ color }) => (
                    <FontAwesome name="user-circle" size={22} color="black" />

                ),
            }} name="Profile" component={Profile} />

            <Drawer.Screen options={{
                drawerIcon: ({ color }) => (
                    <Ionicons name="ios-happy-outline" size={22} color="black" />
                ),
            }} name="Testimonies" component={Testmonies} />

            <Drawer.Screen options={{
                drawerIcon: ({ color }) => (
                    <FontAwesome name="thumbs-o-up" size={22} color="black" />
                ),
            }} name="News" component={News} />


            <Drawer.Screen options={{
                drawerIcon: ({ color }) => (
                    <Entypo name="pencil" size={22} color="black" />
                ),
            }} name="Notes" component={Notes} />



            <Drawer.Screen options={{
                unmountOnBlur: true,
                drawerIcon: ({ color }) => (
                    <Entypo name="chat" size={22} color="black" />
                ),
            }} name="ChatRoom" component={ChatRoom} />




        </Drawer.Navigator>
    )
}

export default function Navigation() {
    return (
        <>
            <NavigationContainer>
                {/* <StackNav /> */}
                <DrawNav />
                {/* <TabNav /> */}
            </NavigationContainer>
        </>
    )
}