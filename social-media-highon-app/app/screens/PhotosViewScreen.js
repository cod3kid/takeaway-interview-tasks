import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Screen from "../components/common/Screen";
import { getThemeColors } from "../utils";
import axios from "../utils/axiosInstance";
import { LIKE_ACTION, MY_POSTS } from "../utils/api";
import ImagePostCard from "../components/PhotosView/ImagePostCard";
import { AuthContext } from "../store/auth-context";
import Header from "../components/common/Header";
import { all } from "axios";

const PhotosViewScreen = ({ route }) => {
  const { allPosts } = route.params;
  console.log("mui all posts", allPosts);
  const [fetchedPosts, setFetchedPosts] = useState([...allPosts]);
  const [localLikedPosts, setLocalLikedPosts] = useState([]);
  const authCtx = useContext(AuthContext);
  const { main, primary, dividerColor, blue, containerColor } =
    getThemeColors(false);

  const headers = { "x-auth-token": authCtx.token };
  const userId = authCtx?.user?._id;

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: "#FAFAFA",
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
  });

  useEffect(() => {
    setLocalLikedPosts(
      fetchedPosts.map((post) => {
        return { postId: post._id, likes: post.likes };
      })
    );
  }, []);

  const handlePressLikeButton = (postId) => {
    const url = `${LIKE_ACTION}/${postId}`;

    axios
      .put(url, {}, { headers })
      .then((response) => {
        const { added } = response.data;
        const previousLocalLikedPosts = [...localLikedPosts];
        previousLocalLikedPosts.forEach((item) => {
          if (item.postId === postId) {
            if (!added) {
              item.likes.push(userId);
            } else {
              item.likes = item.likes.filter((item) => item !== userId);
            }
          }
        });
        setLocalLikedPosts(previousLocalLikedPosts);
      })
      .catch((err) => {
        console.log("misis", err.message);
      });
  };

  const WelcomeContent = ({ styles }) => {
    return (
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeHeader}>Welcome to HighOn</Text>
      </View>
    );
  };

  return (
    <Screen style={styles.screen}>
      <Header styles={styles} primary={primary} dividerColor={dividerColor} />

      {fetchedPosts.length ? (
        <FlatList
          data={fetchedPosts}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item, index }) => {
            return (
              <ImagePostCard
                post={item}
                likedPosts={localLikedPosts}
                setLikedPosts={setLocalLikedPosts}
                userId={userId}
                handlePressLikeButton={handlePressLikeButton}
              />
            );
          }}
        />
      ) : (
        <WelcomeContent styles={styles} />
      )}
    </Screen>
  );
};

export default PhotosViewScreen;
