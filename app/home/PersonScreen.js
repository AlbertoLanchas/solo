import React, { useState, useEffect } from "react";
import {
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Dimensions,
  View,
  Text,
  Image,
  ImageBackground,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation, useRoute } from "@react-navigation/native";
// import { styles, theme } from "../theme";
// import MovieList from "../components/movieList";
// import Loading from "../components/loading";
// import {
//   fetchPersonDetails,
//   fetchPersonMovies,
//   image342,
// } from "../../api/moviedb";
// import TrendingMovies from "../components/trendingMovies";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const verticalMargin = ios ? 12 : 16;

export default function PersonScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);
  const [personMovies, setPersonMovies] = useState([]);
  const [personDetails, setPersonDetails] = useState({});
  const [loading, setLoading] = useState(false);

  return (
    <ImageBackground
      source={(item.cover_image_url) }
      // blurRadius={20}
      style={{ flex: 1 }}
    >
      <LinearGradient
        colors={["rgba(0,0,0,0.65)", "rgba(0,0,0,0.85)"]}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20 }}
          style={{ flex: 1, opacity: 1 }}
        >
          {/* back button */}
          <SafeAreaView
            style={{
              zIndex: 20,
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 10,
              marginVertical: verticalMargin,
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
              <HeartIcon size={35} color={isFavourite ? "red" : "white"} />
            </TouchableOpacity>
          </SafeAreaView>

          {/* Person details */}
          {loading ? (
            // <Loading />
            <></>
          ) : (
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  shadowColor: "white",
                  shadowRadius: 30,
                  shadowOffset: { width: 0, height: 2 },
                  borderRadius: width * 0.6,
                  shadowOpacity: 4,
                  margin: 15,
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    borderRadius: width * 0.36,
                    borderWidth: 3,
                    borderColor: "white",
                  }}
                >
                  <Image
                    source={{ uri: item?.cover_image_url }}
                    style={{ height: height * 0.43, width: width * 0.74 }}
                  />
                </View>
              </View>
              <View style={{ marginTop: 6 }}>
                <Text
                  style={{
                    fontSize: 24,
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {item?.name}
                </Text>
                {/* <Text
              style={{ fontSize: 16, color: "#A8A8A8", textAlign: "center" }}
            >
              {personDetails?.place_of_birth}
            </Text> */}
              </View>
              <View
                style={{
                  marginHorizontal: "0.75rem",
                  padding: "1rem",
                  marginTop: "1.5rem",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  borderRadius: 20,
                }}
              >
                <View
                  style={{
                    borderRightWidth: 2,
                    borderRightColor: " rgb(163 163 163)",
                    paddingHorizontal: 6,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>
                    Rank
                  </Text>
                  <Text style={{ color: "#ccc", fontSize: 10 }}>
                    {item?.rank}
                  </Text>
                </View>
                <View
                  style={{
                    borderRightWidth: 2,
                    borderRightColor: " rgb(163 163 163)",
                    paddingHorizontal: 6,
                    // marginHorizontal: 4,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>
                    Class
                  </Text>
                  <Text style={{ color: "#ccc", fontSize: 10 }}>
                    {item?.class}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    borderRightWidth: 2,
                    borderRightColor: "rgb(163, 163, 163)",
                    paddingHorizontal: 6,
                    // marginHorizontal: 4,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>
                    Guild
                  </Text>
                  {item?.guild.map((guild, index) => (
                    <Text key={index} style={{ color: "#cccc", fontSize: 10 }}>
                      {guild}
                    </Text>
                  ))}
                </View>
                <View
                  style={{
                    paddingHorizontal: 6,
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>
                    Occupation
                  </Text>
                  {item?.occupation.map((occupation, index) => (
                    <Text key={index} style={{ color: "#ccc", fontSize: 10 }}>
                      {occupation}
                    </Text>
                  ))}
                </View>
              </View>
              <View
                style={{
                  marginLeft: "1rem",
                  marginRight: "1rem",
                  marginTop: "1.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    lineHeight: 28,
                    color: "#ffffff",
                    marginBottom: "0.5rem",
                  }}
                >
                  Description
                </Text>
                <Text style={{ letterSpacing: 0.25, color: "#ccc" }}>
                  {item?.description || "N/A"}
                </Text>
              </View>

              {/* Movies */}
              <TrendingMovies
                title={"Episodes"}
                hideSeeAll={true}
                // data={episodes}
              />
            </View>
          )}
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
}
