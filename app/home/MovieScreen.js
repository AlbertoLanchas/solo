import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
  ImageBackground
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
// import Loading from "../components/loading";

// import { styles, theme } from "../theme";
import { LinearGradient } from "expo-linear-gradient";
// import Cast from "../components/cast";
// import MovieList from "../components/movieList";
// import {
//   fetchMovieCredits,
//   fetchMovieDetails,
//   fetchSimilarMovies,
//   image500,
// } from "../../api/moviedb";
// import { ImageBackground } from "react-native-web";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? 12 : 16;

export default function MovieScreen() {
  const { params: item } = useRoute();
  const [isFavourite, toggleFavourite] = useState(false);
  const navigation = useNavigation();
  // const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});

  const {
    characters,
    cover_image_url,
    directed_by,
    episode_number,
    id,
    original_air_date,
    screenplay_by,
    season_number,
    summary,
    title,
    written_by,
  } = item;

  return (
    <ImageBackground
      source={(item.cover_image_url)}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <LinearGradient
        colors={["transparent", "rgba(23,23,23,0.6)", "rgba(23,23,23,0.7)"]}
        style={{
          flex: 1,
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        style={{ flex: 1, backgroundColor: "transparent" }}
      >
        {/* Botón de retroceso y póster de la película */}
        <View style={{ width: "100%" }}>
          <SafeAreaView
            style={{
              position: "absolute",
              zIndex: 20,
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 10,
              marginTop: topMargin,
            }}
          >
            <TouchableOpacity
              // style={[styles.background, { borderRadius: 20, padding: 10 }]}
              style={{ borderRadius: 20, padding: 10 }}
              onPress={() => navigation.goBack()}
            >
              <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
              <HeartIcon
                size={35}
                color={isFavourite ? theme.background : "white"}
              />
            </TouchableOpacity>
          </SafeAreaView>

          {loading ? (
            // <Loading />
            <></>
          ) : (
            <View>
              {/* Agregar el gradiente lineal aquí si es necesario */}
            </View>
          )}
        </View>

        {/* Movie Details */}
        <View
          style={{
            marginTop: height * 0.1,
            backgroundColor: "rgba(0,0,0,0.4)",
            borderRadius: 20,
            width: width * 0.9,
            alignSelf: "center",
            paddingBottom: 20,
            // alignItems: "center",
          }}
        >
          {/* title */}
          <Text
            style={{
              color: "white",
              fontSize: 34,
              marginLeft: 26,
              fontWeight: "bold",
              letterSpacing: 1,
              marginBottom: 25,
            }}
          >
            {title}
          </Text>
          {/* status, release, runtime */}
          <Text
            style={{
              color: theme.textLight,
              fontWeight: "600",
              fontSize: 20,
              marginHorizontal: 20,
              marginBottom: 10,
            }}
          >
            {`Directed by: ${directed_by}\nAir date: ${original_air_date}\nSeason: ${season_number}\nEpisode: ${episode_number}`}
          </Text>
          {/* description */}
          <Text
            style={{
              color: "white",
              marginTop: 10,
              marginHorizontal: 20,
              letterSpacing: 1,
              fontSize: 18,
            }}
          >
            {summary}
          </Text>
        </View>
        {/* cast */}
        {/* {cast.length > 0 && <Cast navigation={navigation} cast={cast} />} */}

        {/* Similar Movies */}
        {/* {similarMovies.length > 0 && (
          <MovieList
            title="Similar Movies"
            hideSeeAll={true}
            data={similarMovies}
          />
        )} */}
      </ScrollView>
    </ImageBackground>
  );
}
