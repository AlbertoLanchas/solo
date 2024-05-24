import { StyleSheet, Pressable, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { getImageSize } from "../helpers/common";
import { theme } from "../constants/theme";
import { wp } from "../helpers/common";
import { useNavigation } from "@react-navigation/native";

const ImageCard = ({ item, index, columns }) => {
  const isLastInRow = () => {
    return (index + 1) % columns === 0;
  };
  const getImageHeight = () => {
    let { height, width } = item;
    return { height: getImageSize(height, width) };
  };
  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.navigate("Modal", item);
  };
  return (
    <Pressable
      onPress={() => handleClick(item)}
      style={[styles.imageWrapper, !isLastInRow() && styles.spacing]}
    >
      <Image
        style={[styles.image, getImageHeight()]}
        source={{ uri: item?.cover_image_url }}
        transition={100}
      />
    </Pressable>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: "100%",
  },
  imageWrapper: {
    backgroundColor: theme.colors.grayBG,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    overflow: "hidden",
    marginBottom: wp(2),
  },
  spacing: {
    marginRight: wp(2),
  },
});
