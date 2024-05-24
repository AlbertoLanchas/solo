import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { theme } from "../theme";
import { image185 } from "../../api/moviedb";

var { width, height } = Dimensions.get("window");

export default function Cast({ cast, navigation, characters }) {
  // console.log(characters, "characters");
  let personName = "Keanu Reeves";
  let characterName = "John Wick";

  return (
    <View style={{ marginBottom: 6 }}>
      <Text
        style={{ color: "white", fontSize: 18, marginLeft: 4, marginBottom: 5 }}
      >
        Top Cast
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((person, index) => (
            <TouchableOpacity
              key={index}
              style={{ marginRight: 4, alignItems: "center" }}
              onPress={() => navigation.navigate("Person", person)}
            >
              <View
                style={{
                  overflow: "hidden",
                  borderRadius: 40,
                  width: 80,
                  height: 80,
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 1,
                  borderColor: "gray",
                }}
              >
                <Image
                  // source={require("../../assets/5fa483bab560f647d041f4654ae7f767.jpg")}
                  source={{ uri: item.cover_image_url }}
                  style={{ width: "100%", height: "100%", borderRadius: 40 }}
                />
              </View>

              <Text style={{ color: "white", fontSize: 14, marginTop: 1 }}>
                {person?.character.length > 10
                  ? person?.character.slice(0, 10) + "..."
                  : person?.character}
              </Text>
              <Text
                style={{
                  color: theme.textLight,
                  fontSize: 14,
                  marginTop: 1,
                }}
              >
                {person?.original_name.length > 10
                  ? person?.original_name.slice(0, 10) + "..."
                  : person?.original_name}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
}
