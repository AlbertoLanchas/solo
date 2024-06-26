import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import { Link, router } from "expo-router";
// import { styles } from "../theme";
// import { image185 } from "../../api/moviedb";
// import SeeAll from "./seeAll";

var { width, height } = Dimensions.get("window");

export default function MovieList({ characters, title, hideSeeAll }) {
  return (
    <View style={{ marginBottom: 8, backgroundColor: "transparent" }}>
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
          {title}
        </Text>
        {!hideSeeAll && (
          <Link
            href={{                 
              pathname: 'seeAll',
              params: { characters: JSON.stringify(characters) },
            }}
            asChild
          >
            <Text style={{ color: "orange", fontSize: 16 }}>See All</Text>
          </Link>
        )}
      </View>
      {/* movie row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {characters?.map((item, index) => (
          <TouchableWithoutFeedback
            key={index}
          // onPress={() => navigation.push("Person", item)}
          >
            <View
              style={{
                marginHorizontal: 4,
              }}
            >
              <Image
                source={(item.cover_image_url)}
                imgName={item.name}
                // source={require("@/assets/images/characters/Baek Yoonho.jpg")}
                // source={{ uri: item.cover_image_url }}
                style={{
                  width: width * 0.53,
                  height: height * 0.35,
                  borderRadius: 20,
                }}
              />
              <Text
                className="text-neutral-300 ml-1"
                style={{ color: "white", marginLeft: 4, marginTop: 2 }}
              >
                {item.name.length > 14
                  ? item.name.slice(0, 14) + "..."
                  : item.name}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
}
