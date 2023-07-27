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

export default function ProfileScreen({ navigation }) {
  const isDark = false;
  const authCtx = useContext(AuthContext);
  const { main, primary } = getThemeColors(isDark);

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: main,
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
      <TouchableWithoutFeedback onPress={logout}>
        <Text>Logout</Text>
      </TouchableWithoutFeedback>
    </Screen>
  );
}
const SettingsHeader = ({ styles, primary, goBack }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableWithoutFeedback onPress={goBack}>
        <MaterialCommunityIcons
          name="keyboard-backspace"
          size={34}
          color={primary}
        />
      </TouchableWithoutFeedback>
      <Text style={styles.headerText}>Settings</Text>
    </View>
  );
};

const SettingsListContainer = ({ styles, theme, setTheme, primary }) => {
  return (
    <FlatList
      data={settingsList}
      keyExtractor={(item) => item.name.toString()}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => {
        return (
          <SettingsListItem
            styles={styles}
            name={item.name}
            icon={item.icon}
            onPress={item.icon === "logout-variant" ? signout : item.onPress}
            theme={theme}
            setTheme={setTheme}
            isDark={item.isDark}
            primary={primary}
          />
        );
      }}
    />
  );
};

const SettingsListItem = ({
  onPress,
  icon,
  name,
  styles,
  theme,
  setTheme,
  isDark,
  primary,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.listItem}>
        <View style={{ flexDirection: "row" }}>
          <MaterialCommunityIcons name={icon} size={28} color={primary} />
          <Text style={styles.text}>{name}</Text>
        </View>

        {isDark && (
          <View>
            <Switch value={theme} onValueChange={setTheme} />
          </View>
        )}
      </View>
      <View></View>
    </TouchableOpacity>
  );
};
