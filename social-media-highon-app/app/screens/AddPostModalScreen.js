import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

const AddPostModalScreen = () => {
  const navigation = useNavigation();
  const selectFile = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        alert("Permission to access media library is required!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        console.log("Selected file:", result.assets[0].uri);
        navigation.navigate("PostPreview", { url: result?.assets[0]?.uri });
      }
    } catch (error) {
      console.error("Error selecting file:", error);
    }
  };

  return (
    <View
      style={{
        paddingHorizontal: 18,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
      }}
    >
      <View
        style={{
          backgroundColor: "#D0D0D0",
          height: 175,
          width: "100%",
          borderRadius: 25,
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "row",
            padding: 10,
          }}
        >
          <Entypo name="circle-with-cross" size={28} color="#434343" />
        </View>
        <View
          style={{
            display: "flex",
            direction: "column",
            justifyContent: "flex-start",
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "row",
              padding: 10,
            }}
          >
            <Image
              style={{ height: 30, width: 30 }}
              source={require("../../assets/icons/post-icon.png")}
            />
            <View
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TouchableWithoutFeedback onPress={selectFile}>
                <Text
                  style={{ color: "#414141", fontSize: 18, fontWeight: "bold" }}
                >
                  Create a post
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: 16,
              marginVertical: 5,
              height: 1,
              backgroundColor: "#000000",
            }}
          />
          <View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              padding: 10,
            }}
          >
            <Image
              style={{ height: 30, width: 30 }}
              source={require("../../assets/icons/story-icon.png")}
            />
            <View
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ color: "#414141", fontSize: 18, fontWeight: "bold" }}
              >
                Create a story
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddPostModalScreen;
