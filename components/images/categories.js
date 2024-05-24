import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import React from "react";
import { data } from "../constants/cate";
import { wp, hp } from "../helpers/common";
import { theme } from "../constants/theme";
import { Animated, FadeInRight } from "react-native-reanimated";
// import { theme } from "../theme";

const Categories = ({ activeCategory, handleChangeCategory }) => {
  return (
    <FlatList
      horizontal
      contentContainerStyle={styles.flatlistContainer}
      showsHorizontalScrollIndicator={false}
      data={data.categories}
      keyExtractor={(item) => item}
      renderItem={({ item, index }) => (
        <CategoryItem
          isActive={activeCategory == item}
          handleChangeCategory={handleChangeCategory}
          title={item}
          index={index}
        />
      )}
    />
  );
};

const CategoryItem = ({ title, index, isActive, handleChangeCategory }) => {
  let color = isActive ? "white" : theme.colors.neutral(0.8);
  let backgroundColor = isActive ? "orange" : theme.colors.white;
  return (
    <View
    // entering={FadeInRight.delay(index * 200)
    //   .duration(1000)
    //   .springify()
    //   .damping(14)}
    >
      {/* <View> */}
      <Pressable
        onPress={() => handleChangeCategory(isActive ? null : title)}
        style={[styles.category, { backgroundColor }]}
      >
        <Text style={[styles.title, { color }]}>{title}</Text>
      </Pressable>
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  flatlistContainer: {
    paddingHorizontal: wp(4),
  },
  category: {
    padding: 12,
    paddingHorizontal: 15,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: "none",
    borderRadius: theme.radius.lg,
    borderCurve: "continuous",
  },
  title: {
    fontSize: hp(1.8),
    fontWeight: theme.fontWeights.medium,
    // color: "white",
  },
});

export default Categories;
