import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Header = ({ styles, primary }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <View>
        <Image
          source={require("../../../assets/icons/high-on-logo.png")}
          style={{ height: 30, width: 63 }}
          resizeMode="cover"
        />
      </View>
      <View style={styles.searchInputContainer}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("AddPostModal")}
        >
          <MaterialCommunityIcons
            name="plus-box-outline"
            size={32}
            color={primary}
          />
        </TouchableWithoutFeedback>
        <MaterialCommunityIcons name="magnify" size={32} color={primary} />
      </View>
    </View>
  );
};

export default Header;
