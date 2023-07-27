import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { get } from "lodash";
import { useNavigation } from "@react-navigation/core";
import { AuthContext } from "../../store/auth-context";
import { IMAGE_URL } from "@env";
import { lightColors } from "../../utils";

export default function ImagePostCard({
  post,
  likedPosts,
  setLikedPosts,
  userId,
  handlePressLikeButton,
}) {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);
  const { primary } = lightColors;

  const styles = StyleSheet.create({
    postContainer: {
      marginHorizontal: 18,
      elevation: 1,
      borderRadius: 10,
      backgroundColor: "white",
      marginVertical: 15,
    },
    postHeaderContainer: {
      paddingVertical: 9,
      paddingHorizontal: 10,
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
    },
    postHeaderProfile: {
      flexDirection: "row",
      alignItems: "center",
    },
    postHeaderDisplayPic: {
      height: 33,
      width: 33,
      borderRadius: 20,
    },
    actionContainerStyle: {
      padding: 10,
      paddingBottom: 5,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    captionContainerStyle: {
      marginHorizontal: 10,
      flexDirection: "row",
    },
    postHeaderUsername: {
      marginLeft: 10,
      fontSize: 14,
      fontWeight: "bold",
      color: primary,
    },
    media: {
      height: 200,
      width: "100%",
    },
    captionUsername: {
      fontWeight: "bold",
      paddingRight: 5,
      color: primary,
    },
    actionMain: {
      flexDirection: "row",
    },
    bold: {
      fontWeight: "bold",
      paddingHorizontal: 10,
      color: primary,
    },
    actionIconStyle: {
      marginRight: 10,
    },
    captionText: {
      color: primary,
    },
  });

  const handleLike = async () => {};

  const isLiked = likedPosts.find((eachPost) => {
    if (eachPost.postId === post._id) {
      const currentPostsLikes = eachPost.likes;
      return currentPostsLikes.find((item) => item === userId);
    }
  });

  return (
    <View style={styles.postContainer}>
      <PostHeader
        post={post}
        url={`https://picsum.photos/200/200`}
        styles={styles}
        primary={primary}
      />
      <ImageContainer
        imageUrl={`${IMAGE_URL}/${post?.path}`}
        styles={styles}
        isLiked={isLiked}
        handlePressLikeButton={handlePressLikeButton}
        postId={post._id}
      />
      {get(post, "likes.length") > 0 && (
        <LikesContainer post={post} styles={styles} />
      )}
      <CaptionContainer post={post} styles={styles} />
    </View>
  );
}

const PostHeader = ({ post, styles, primary, url }) => {
  const { name } = post.userId;
  return (
    <View style={styles.postHeaderContainer}>
      <View style={styles.postHeaderProfile}>
        <Image source={{ uri: url }} style={styles.postHeaderDisplayPic} />
        <Text style={styles.postHeaderUsername}>{name}</Text>
      </View>
      <MaterialCommunityIcons name="dots-horizontal" size={24} color="black" />
    </View>
  );
};

const ImageContainer = ({
  imageUrl,
  styles,
  isLiked,
  handlePressLikeButton,
  postId,
}) => {
  return (
    <View>
      <Image
        source={{
          uri: imageUrl,
        }}
        style={styles.media}
      />
      <TouchableWithoutFeedback
        onPress={(e) => {
          e.stopPropagation();
          handlePressLikeButton(postId);
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
            paddingBottom: 5,
          }}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

const LikesContainer = ({ styles, post }) => {
  return (
    <View style={styles.actionMain}>
      <Text style={styles.bold}>{get(post, "likes.length")} emoted</Text>
    </View>
  );
};

const CaptionContainer = ({ post, styles }) => {
  const { description } = post;
  return (
    <View style={styles.captionContainerStyle}>
      <Text>
        <Text style={styles.captionText}>{description}</Text>
      </Text>
    </View>
  );
};
const ActionIcon = ({ children, styles, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.actionIconStyle}>{children}</View>
    </TouchableWithoutFeedback>
  );
};
