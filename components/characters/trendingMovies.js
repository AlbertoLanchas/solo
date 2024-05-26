import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";

const { width, height } = Dimensions.get("window");
const episodeWidth = width * 0.90;

export default function TrendingMovies({ episodes, hideSeeAll }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handleClick = (item, index) => {
    scrollViewRef.current.scrollTo({ x: index * width, animated: true });
    setActiveIndex(index);
  };

  const handleScroll = (event) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollX / width);
    setActiveIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % episodes.length;
      scrollViewRef.current.scrollTo({ x: nextIndex * width, animated: true });
      setActiveIndex(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, episodes.length]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>EPISODES</Text>
        {!hideSeeAll && (
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16} 
        ref={scrollViewRef}
      >
        {episodes.map((item, index) => (
          <TouchableWithoutFeedback key={index} onPress={() => handleClick(item, index)}>
            <View style={styles.episodeContainer}>
              <Text style={styles.episodeText}>
                Episode {item.episode_number}: {item.title}
              </Text>
              <Image
                source={(item.cover_image_url)}
                style={styles.episodeImage}
              />
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {episodes.map((_, index) => (
          <TouchableOpacity key={index} onPress={() => handleClick(_, index)}>
            <View
              style={[
                styles.paginationDot,
                { backgroundColor: index === activeIndex ? "#eab308" : "white" },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  header: {
    marginHorizontal: 14,
    marginBottom: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  seeAll: {
    color: "#eab308",
    fontSize: 16,
  },
  episodeContainer: {
    width: episodeWidth,
    alignItems: "left",
    marginHorizontal: 14,
  },
  episodeText: {
    color: "white",
    fontSize: 14,
    marginTop: 16,
  },
  episodeImage: {
    width: episodeWidth,
    height: height * 0.25,
    borderRadius: 24,
    resizeMode: "contain",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});
