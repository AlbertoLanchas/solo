import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const verticalMargin = ios ? 12 : 16;

const SeeAll = () => {
  const { params: results } = useRoute();
  const navigation = useNavigation();
  // const [results, setResults] = useState([]);
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <TouchableOpacity
          style={[styles.background, { borderRadius: 20, padding: 10 }]}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
          {/* <HeartIcon size={35} color={isFavourite ? "red" : "white"} /> */}
        </TouchableOpacity>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <Text style={styles.resultsText}>Results ({results?.length})</Text>
        <View style={styles.characterContainer}>
          {results.map((item, index) => {
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() =>
                  item.name
                    ? navigation.push("Person", item)
                    : navigation.push("Movie", item)
                }
              >
                <View style={styles.characterItem}>
                  <Image
                    style={styles.characterImage}
                    source={{ uri: item?.cover_image_url }}
                  />
                  <Text style={styles.characterName}>
                    {item?.name
                      ? item.name.length > 22
                        ? `${item.name.slice(0, 22)}...`
                        : item.name
                      : item.title.length > 22
                      ? `${item.title.slice(0, 22)}...`
                      : item.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default SeeAll;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(38 38 38)",
  },
  header: {
    zIndex: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: verticalMargin,
  },
  background: {
    backgroundColor: "#eab308",
  },
  scrollViewContent: {
    paddingHorizontal: 15,
    marginTop: 12,
  },
  resultsText: {
    color: "white",
    marginLeft: 4,
    fontWeight: "600",
    marginBottom: 8,
  },
  characterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  characterItem: {
    marginBottom: 4,
    marginTop: 8,
  },
  characterImage: {
    width: width * 0.44,
    height: height * 0.3,
    borderRadius: 8,
  },
  characterName: {
    color: "white",
    marginLeft: 4,
  },
});
