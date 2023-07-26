import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { Switch } from "react-native-elements";

import { getThemeColors } from "../utils";
// import { settingsList } from "../../utils";
import Screen from "../components/common/Screen";
import { AuthContext } from "../store/auth-context";
import Button from "../components/Auth/Button";

export default function ProfileScreen({ navigation }) {
  const isDark = false;
  const authCtx = useContext(AuthContext);
  const { main, primary, blue } = getThemeColors(isDark);

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: main,
      padding: 18,
    },
    listItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingLeft: 20,
      paddingVertical: 5,
    },
    text: {
      fontSize: 16,
      marginLeft: 20,
      color: primary,
    },
    separator: {
      marginVertical: 10,
      marginLeft: 60,
    },
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      marginBottom: 15,
    },
    headerText: {
      fontSize: 20,
      marginLeft: 20,
      color: primary,
    },
  });

  const logout = () => {
    authCtx.logout();
  };

  return (
    <Screen style={styles.screen}>
      <Button
        color={blue}
        primary={primary}
        isValid
        onPress={logout}
        isLoaderVisible={false}
        title="Logout"
      />
    </Screen>
  );
}
