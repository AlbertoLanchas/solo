import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
// import Loading from "../components/loading";
// import { debounce } from "lodash";
// import { fetchSearchMovies, image185 } from "../../api/moviedb";

const { width, height } = Dimensions.get("window");

export default function SearchScreen() {
  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  let movieName = "Ant-Man and the Wasp: Quantumania";

//   const handleSearch = (value) => {
//     if (value && value.length > 2) {
//       setLoading(true);
//       fetchSearchMovies({
//         query: value,
//         include_adult: "",
//         language: "",
//         page: "",
//       }).then((data) => {
//         setLoading(false);
//         if (data && data.results) {
//           setResults(data.results);
//         }
//       });
//     } else {
//       setLoading(false);
//       setResults([]);
//     }
//   };
//   const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView
      className="bg-neutral-800 flex-1"
      style={{ flex: 1, backgroundColor: " rgb(38 38 38)" }}
    >
      <View
        style={{
          marginLeft: 16,
          marginRight: 16,
          marginBottom: 12,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 999,
          borderWidth: 1,
          borderColor: "white",
        }}
      >
        <TextInput
        //   onChangeText={handleTextDebounce}
          placeholder="Search Movie"
          placeholderTextColor="lightgray"
          style={{
            paddingLeft: 24,
            flex: 1,
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: 0,
            fontSize: 16,
            lineHeight: 24,
            fontWeight: 600,
            color: "#ffffff",
          }}
        />
        <TouchableOpacity
        //   onPress={() => navigation.navigate("Home")}
          style={{
            padding: 12,
            margin: 4,
            backgroundColor: "#888",
            borderRadius: 999,
          }}
        >
          {/* <XMarkIcon size="25" color="white" /> */}
        </TouchableOpacity>
      </View>
      {/* Results */}
      {/* {loading ? (
        <Loading />
      ) : results.length > 0 ? ( */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          // style={{ marginTop: [12, 14] }}
        >
          <Text style={{ color: "white", marginLeft: 4, fontWeight: 600 }}>
            Results ({results.length})
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  // onPress={() => navigation.push("Movie", item)}
                >
                  <View style={{ marginBottom: 4, marginTop: 8 }}>
                    <Image
                      style={{
                        width: width * 0.44,
                        height: height * 0.3,
                        borderRadius: 8,
                      }}
                      // source={require("../../assets/134578l.jpg")}
                      // source={{ uri: image185(item?.poster_path) }}
                    />
                    <Text style={{ color: "#888", marginLeft: 4 }}>
                      {item?.title.length > 22
                        ? `${item?.title.slice(0, 22)}...`
                        : item?.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      {/* ) : (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Image
            style={{
              width: 400,
              height: 400,
            }}
            source={require("../../assets/noresults.png")}
          />
          {/* <Text style={{ color: "#888", marginLeft: 4 }}>No results</Text> */}

//
    </SafeAreaView>
  );
}
