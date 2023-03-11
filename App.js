import React from "react";
import Login from "./assets/AppScreen/Login";
import Signup from "./assets/AppScreen/Signup";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserScreen from "./assets/AppScreen/UserScreen";
import AppBarScreen from "./assets/matDesign/AppBarScreen";
import HomeScreen from "./assets/AppScreen/HomeScreen";
import ChatScreen from "./assets/AppScreen/ChatScreen";

const Stack = createNativeStackNavigator();

function App(props) {
  return (
    // <NavigationContainer initialRouteName="login">
    //   <Stack.Navigator>
    //     <Stack.Screen name="login" component={Login} />
    //     <Stack.Screen name="register" component={Signup} />
    //     <Stack.Screen name="welcome" component={UserScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>

    // <HomeScreen />
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="register" component={Signup} />
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
