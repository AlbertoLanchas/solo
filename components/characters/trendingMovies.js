import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { image500 } from "../../api/moviedb";

var { width, height } = Dimensions.get("window");

export default function TrendingMovies({ episodes, hideSeeAll }) {
  // console.log(episodes, "episodes");
  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };
  return (
    <View style={{ marginBottom: 0 }}>
      <View
        style={{
          marginHorizontal: 14,
          marginBottom: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 24,
            fontWeight: "bold",
            // marginLeft: 20,
          }}
        >
          EPISODES
        </Text>
        {!hideSeeAll && (
          <TouchableOpacity onPress={() => navigation.push("SeeAll", episodes)}>
            <Text style={{ color: "#eab308", fontSize: 16 }}>See All</Text>
          </TouchableOpacity>
        )}
      </View>
      <Carousel
        data={episodes}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={handleClick} />
        )}
        // firstItem={0}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.75}
        slideStyle={{ display: "flex", alignItems: "center" }}
        // autoplay={true}
        // autoplayInterval={300}
      />
    </View>
  );
}

const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <View>
        <Text style={{ color: "white", fontSize: 18, marginTop: 16 }}>
          Episode {item.episode_number}: {item.title}
        </Text>
        <Image
          source={{ uri: item.cover_image_url }}
          style={{
            width: width * 0.75,
            height: height * 0.35,
            borderRadius: 24,
            resizeMode: "contain",
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
