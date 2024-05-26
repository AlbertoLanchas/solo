// import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
//
import React, { useEffect, useState } from "react";
import {
    Platform,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import TrendingMovies from "@/components/characters/trendingMovies"
import MovieList from "@/components/characters/movieList"
import { Link, useNavigation } from "@react-navigation/native";
import { router } from "expo-router";


import charactersData from "@/api/characters";
import episodesData from "@/api/episodes";


export default function HomeScreen() {
    const [episodes, setEpisodes] = useState(episodesData);
    const [characters, setCharacters] = useState(charactersData);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    return (
        // <ParallaxScrollView
        //     headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        //     headerImage={
        //         <Image
        //             source={require("@/assets/images/partial-react-logo.png")}
        //             style={styles.reactLogo}
        //         />
        //     }
        // >
        <ThemedView style={styles.Container}>
            <SafeAreaView>
                <ThemedView style={styles.titleContainer}>
                    <ThemedText style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
                        <ThemedText style={{ color: "#eab308",fontSize: 24 }} >S</ThemedText>
                        olo&nbsp;
                        <ThemedText style={{ color: "#eab308", fontSize: 24 }}>L</ThemedText>
                        eveling
                    </ThemedText>
                    {/* <TouchableOpacity onPress={() => router.push("/explore")}>Ey</TouchableOpacity> */}
                </ThemedView>
            </SafeAreaView>
            <StatusBar style="light" />
            <ThemedView style={styles.Container}>
            <TrendingMovies episodes={episodes} hideSeeAll={false} />
            <MovieList characters={characters} hideSeeAll={false} title={"Characters"}/>
            </ThemedView>

        </ThemedView>
        // </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 18,
        backgroundColor: "transparent"
    },
    Container: {
        flex: 1, backgroundColor: "#151718"
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: "absolute",
    },
});
