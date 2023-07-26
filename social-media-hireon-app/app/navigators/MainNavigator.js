import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import HomeNavigator from "./HomeNavigator";

export default function MainNavigator() {
  const user = useSelector((state) => state.userReducer);
  console.log("mui", user);

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen
            options={{ headerShown: false }}
            name="HomeNav"
            component={HomeNavigator}
          />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
