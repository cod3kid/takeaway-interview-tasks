import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  FlatList,
  Alert,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { getThemeColors } from "../utils";
import Screen from "../components/common/Screen";

const screenWidth = Dimensions.get("window").width;

const HomeScreen = ({ navigation }) => {
  const isDark = useSelector((state) => state.themeReducer);
  const [search, setSearch] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);
  const [likedPosts, setLikedPosts] = useState([]);
  const { main, primary, dividerColor, blue, containerColor } =
    getThemeColors(isDark);

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: main,
    },
    imageContainer: {
      width: screenWidth / 2 - 1,
      backgroundColor: main,
    },
    separator: {
      marginTop: 2,
    },
    imageOne: {
      flex: 1,
      height: 130,
      width: "100%",
    },
    imageTwo: {
      flex: 1,
      height: 200,
      width: "100%",
    },
    imageThree: {
      flex: 1,
      height: 300,
      width: "100%",
    },
    searchContainer: {
      margin: 10,
      marginBottom: 5,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    searchInputContainer: {
      backgroundColor: containerColor,
      padding: 5,
      borderRadius: 10,
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    searchButtonContainer: {
      flexDirection: "row",
      justifyContent: "center",
      padding: 10,
      marginHorizontal: 10,
      marginVertical: 5,
      marginBottom: 10,
      borderRadius: 6,
      backgroundColor: blue,
    },
    buttonFont: {
      color: "white",
    },
  });

  const getImageStyle = (type, gridSide) => {
    if (
      (type === 0 && gridSide === "left") ||
      (type === 2 && gridSide === "right")
    ) {
      return styles.imageOne;
    }

    if (
      (type === 1 && gridSide === "left") ||
      (type === 1 && gridSide === "right")
    ) {
      return styles.imageTwo;
    }

    return styles.imageThree;
  };

  const fetchImagesBasedOnType = (type, gridSide) => {
    if (
      (type === 0 && gridSide === "left") ||
      (type === 2 && gridSide === "right")
    ) {
      return "https://picsum.photos/200/130";
    }

    if (
      (type === 1 && gridSide === "left") ||
      (type === 1 && gridSide === "right")
    ) {
      return "https://picsum.photos/200/200";
    }

    return "https://picsum.photos/200/300";
  };

  return (
    <Screen style={styles.screen}>
      <SearchInputContainer
        styles={styles}
        primary={primary}
        dividerColor={dividerColor}
        value={search}
        onChangeText={(text) => setSearch(text)}
      />

      <SearchButton styles={styles} onPress={() => searchUsers()} />
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <ExploreGrid
            styles={styles}
            getImageStyle={getImageStyle}
            fetchImagesBasedOnType={fetchImagesBasedOnType}
            gridSide="left"
            likedPosts={likedPosts}
            setLikedPosts={setLikedPosts}
          />
          <ExploreGrid
            styles={styles}
            getImageStyle={getImageStyle}
            fetchImagesBasedOnType={fetchImagesBasedOnType}
            gridSide="right"
            likedPosts={likedPosts}
            setLikedPosts={setLikedPosts}
          />
        </View>
      </ScrollView>
    </Screen>
  );
};

const SearchInputContainer = ({
  styles,
  primary,
  dividerColor,
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.searchContainer}>
      <View>
        <Text>High On Logo</Text>
      </View>
      <View style={styles.searchInputContainer}>
        <MaterialCommunityIcons
          name="plus-box-outline"
          size={32}
          color={primary}
        />
        <MaterialCommunityIcons name="magnify" size={32} color={primary} />

        {/* <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Username"
          placeholderTextColor={dividerColor}
          style={{
            flex: 1,
            marginLeft: 10,
            fontSize: 16,
            color: primary,
          }}
        /> */}
      </View>
    </View>
  );
};
const SearchButton = ({ styles, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.searchButtonContainer}>
        <Text style={styles.buttonFont}>Search</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const ExploreGrid = ({
  styles,
  gridStyle,
  getImageStyle,
  fetchImagesBasedOnType,
  gridSide,
  likedPosts,
  setLikedPosts,
}) => {
  const exploreImages = new Array(20);
  return (
    <FlatList
      data={exploreImages}
      keyExtractor={(item, index) => `${gridSide}-${index}`}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      numColumns={1}
      scrollEnabled={false}
      renderItem={({ item, index }) => {
        const type = index % 3;
        const key = `${gridSide}-${index}`;
        let found = false;
        likedPosts.forEach((element) => {
          if (element === key) {
            found = true;
          }
        });

        return (
          <TouchableOpacity>
            <View style={[styles.imageContainer]}>
              <Image
                source={{
                  uri: `${fetchImagesBasedOnType(
                    type,
                    gridSide
                  )}?t=${Date.now()}`,
                }}
                style={[getImageStyle(type, gridSide), { borderRadius: 10 }]}
              />
              <TouchableWithoutFeedback
                onPress={() => {
                  if (found) {
                    const newLikedPosts = likedPosts.filter(
                      (element) => element !== key
                    );
                    setLikedPosts(newLikedPosts);
                  } else {
                    setLikedPosts((prev) => [...prev, key]);
                  }
                }}
              >
                <MaterialCommunityIcons
                  name={found ? "cards-heart" : "cards-heart-outline"}
                  size={24}
                  color={found ? "red" : "white"}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    paddingRight: 5,
                  }}
                />
              </TouchableWithoutFeedback>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default HomeScreen;
