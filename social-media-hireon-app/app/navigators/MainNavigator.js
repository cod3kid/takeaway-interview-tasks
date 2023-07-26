import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import HomeNavigator from "./HomeNavigator";
import AuthContextProvider, { AuthContext } from "../store/auth-context";

export default function MainNavigator() {
  const user = useSelector((state) => state.userReducer);
  const authCtx = useContext(AuthContext);

  const Stack = createNativeStackNavigator();

  return (
    <AuthContextProvider>
      <NavigationContainer>
        {authCtx.isAuthenticated && <HomeNavigator />}
        {!authCtx.isAuthenticated && <AuthNavigator />}
      </NavigationContainer>
    </AuthContextProvider>
  );
}
