import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { getThemeColors, getLightIcon, getDarkIcon } from "../utils";
import HomeNavigator from "./HomeNavigator";
import ProfileScreen from "../screens/ProfileScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const AppNavigator = () => {
  const isDark = false;
  const { main, primary } = getThemeColors(isDark);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "black",
        headerShown: false,
        showLabel: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: main,
        },
      }}
    >
      <Tab.Screen
        name="HomeNav"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Image
              source={
                isDark
                  ? getDarkIcon(focused, "home")
                  : getLightIcon(focused, "home")
              }
              style={{ height: 24, width: 24 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name="account"
              color={primary}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
