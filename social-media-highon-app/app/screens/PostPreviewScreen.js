import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  TextInput,
} from "react-native";
import axios from "../utils/axiosInstance";
import React, { useContext, useState } from "react";
import Screen from "../components/common/Screen";
import { AuthContext } from "../store/auth-context";
import { ADD_POST } from "../utils/api";
import { getThemeColors } from "../utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PostPreviewScreen = ({ route }) => {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();
  const [text, setText] = useState("");
  const { url } = route.params;

  const { main } = getThemeColors(false);
  const headers = {
    "x-auth-token": authCtx.token,
    "Content-Type": "multipart/form-data",
  };
  const { _id: userId, name } = authCtx?.user;

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: "#F7F7F7",
    },
    container: {
      marginVertical: 20,
      height: 140,
    },
    textArea: {
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 5,
      padding: 10,
      fontSize: 16,
      textAlignVertical: "top",
    },
    divider: {
      height: 2,
      width: "100%",
      backgroundColor: "#707070",
      opacity: 0.2,
    },
  });

  const handleAddPost = async () => {
    const formData = new FormData();
    formData.append("post", url);
    formData.append("description", text);
    formData.append("type", "image");

    try {
      await axios
        .post(ADD_POST, formData, headers)
        .then((response) => {
          console.log(response.data);
          navigation.navigate("Home");
        })
        .catch((err) => {
          console.log("Ax", JSON.stringify(err));
        });
    } catch (ex) {
      console.log("Axios", ex.message);
    }
  };

  return (
    <Screen style={styles.screen}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 20,
          marginHorizontal: 10,
        }}
      >
        <MaterialCommunityIcons name="arrow-left" size={30} color="black" />
        <TouchableWithoutFeedback onPress={handleAddPost}>
          <View
            style={{
              width: 100,
              height: 40,
              backgroundColor: "#00B2E8",
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Post</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={{ paddingHorizontal: 18 }}>
        <View>
          {url && (
            <Image
              source={{ uri: url }}
              style={{ height: 65, width: 65, borderRadius: 10 }}
            />
          )}
        </View>
        <View style={{ marginTop: 16 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16, color: "#0198C6" }}>
            Description
          </Text>
        </View>
        <View style={styles.container}>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={5}
            value={text}
            onChangeText={setText}
            placeholder="Description"
          />
        </View>
        <View style={styles.divider} />

        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 20,
              }}
            >
              <MaterialCommunityIcons name="tag" size={24} color="#0198C6" />
              <Text
                style={{
                  color: "#0198C6",
                  fontWeight: "bold",
                  marginLeft: 10,
                  fontSize: 14,
                }}
              >
                Tag People
              </Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="#454545"
            />
          </View>
          <View></View>
        </View>

        <View style={styles.divider} />

        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 20,
              }}
            >
              <MaterialCommunityIcons
                name="map-marker"
                size={24}
                color="#0198C6"
              />
              <Text
                style={{
                  color: "#0198C6",
                  fontWeight: "bold",
                  fontSize: 14,
                  marginLeft: 10,
                }}
              >
                Tag Location
              </Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="#454545"
            />
          </View>
          <View></View>
        </View>
        <View style={styles.divider} />
      </View>
    </Screen>
  );
};

export default PostPreviewScreen;
