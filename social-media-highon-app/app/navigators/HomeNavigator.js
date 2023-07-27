import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import PhotosViewScreen from "../screens/PhotosViewScreen";
import AddPostModalScreen from "../screens/AddPostModalScreen";
import PostPreviewScreen from "../screens/PostPreviewScreen";
// import AddPostScreen from "../screens/AppScreens/AddPostScreen";
// import CommentsScreen from "../screens/AppScreens/CommentsScreen";

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="PhotosView" component={PhotosViewScreen} />
      <Stack.Screen name="AddPostModal" component={AddPostModalScreen} />
      <Stack.Screen name="PostPreview" component={PostPreviewScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
