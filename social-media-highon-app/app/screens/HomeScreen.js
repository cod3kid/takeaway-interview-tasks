import React, { useContext, useEffect, useState } from "react";
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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { IMAGE_URL } from "@env";

import { getThemeColors } from "../utils";
import Screen from "../components/common/Screen";
import axios from "../utils/axiosInstance";
import { MY_POSTS, LIKE_ACTION } from "../utils/api";
import { AuthContext } from "../store/auth-context";
import Header from "../components/common/Header";

const screenWidth = Dimensions.get("window").width;

const HomeScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const authCtx = useContext(AuthContext);
  const [fetchedPosts, setFetchedPosts] = useState([]);
  const [localLikedPosts, setLocalLikedPosts] = useState([]);
  const { main, primary, dividerColor, blue, containerColor } =
    getThemeColors(false);

  const headers = { "x-auth-token": authCtx.token };
  const userId = authCtx?.user?._id;

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
    headerContainer: {
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

  useEffect(() => {
    axios
      .get(MY_POSTS, { headers })
      .then((response) => {
        const { data } = response.data;
        setFetchedPosts(data);
        setLocalLikedPosts(
          data.map((post) => {
            return { postId: post._id, likes: post.likes };
          })
        );
      })
      .catch((err) => {
        console.log("Error");
      });
  }, []);

  const handleLikePress = (postId) => {
    const url = `${LIKE_ACTION}/${postId}`;

    axios
      .put(url, {}, { headers })
      .then((response) => {
        console.log("data", response.data);
      })
      .catch((err) => {
        console.log("misis", err.message);
      });
  };

  return (
    <Screen style={styles.screen}>
      <Header styles={styles} primary={primary} dividerColor={dividerColor} />
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
            gridSide="left"
            likedPosts={localLikedPosts}
            setLikedPosts={setLocalLikedPosts}
            fetchedPosts={[...fetchedPosts].filter(
              (item, index) => index % 2 === 0
            )}
            combinedPosts={fetchedPosts}
            handleLikePress={handleLikePress}
            userId={userId}
            navigation={navigation}
          />
          <ExploreGrid
            styles={styles}
            getImageStyle={getImageStyle}
            gridSide="right"
            likedPosts={localLikedPosts}
            setLikedPosts={setLocalLikedPosts}
            fetchedPosts={[...fetchedPosts].filter(
              (item, index) => index % 2 !== 0
            )}
            combinedPosts={fetchedPosts}
            handleLikePress={handleLikePress}
            userId={userId}
            navigation={navigation}
          />
        </View>
      </ScrollView>
    </Screen>
  );
};

const ExploreGrid = ({
  styles,
  getImageStyle,
  gridSide,
  fetchedPosts,
  combinedPosts,
  handleLikePress,
  userId,
  likedPosts,
  setLikedPosts,
  navigation,
}) => {
  return (
    <FlatList
      data={fetchedPosts}
      keyExtractor={(item, index) => `${gridSide}-${index}`}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      numColumns={1}
      scrollEnabled={false}
      renderItem={({ item, index }) => {
        const type = index % 3;
        const key = `${gridSide}-${index}`;

        const isLiked = likedPosts.find((post) => {
          if (post.postId === item._id) {
            const currentPostsLikes = post.likes;
            return currentPostsLikes.find((item) => item === userId);
          }
        });

        const handlePressLikeButton = (postId) => {
          const previousLocalLikedPosts = [...likedPosts];
          previousLocalLikedPosts.forEach((item) => {
            if (item.postId === postId) {
              if (!isLiked) {
                item.likes.push(userId);
              } else {
                item.likes = item.likes.filter((item) => item !== userId);
              }
            }
          });
          setLikedPosts(previousLocalLikedPosts);
          handleLikePress(postId);
        };

        const getCombinedPostsToPass = () => {
          const currentCombinedPosts = [...combinedPosts];
          const postsWithoutCurrent = currentCombinedPosts.filter(
            (post) => post._id !== item._id
          );

          // const temp = currentCombinedPosts[0];
          // currentCombinedPosts[0] = currentCombinedPosts[actualIndex];
          // currentCombinedPosts[actualIndex] = temp;

          return [item, ...postsWithoutCurrent];
        };

        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PhotosView", {
                allPosts: getCombinedPostsToPass(),
              });
            }}
          >
            <View style={[styles.imageContainer]}>
              <Image
                source={{
                  uri: `${IMAGE_URL}/${item.path}`,
                }}
                style={[getImageStyle(type, gridSide), { borderRadius: 10 }]}
              />
              <TouchableWithoutFeedback
                onPress={(e) => {
                  e.stopPropagation();
                  handlePressLikeButton(item._id);
                }}
              >
                <MaterialCommunityIcons
                  name={isLiked ? "cards-heart" : "cards-heart-outline"}
                  size={24}
                  color={isLiked ? "red" : "white"}
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
