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

export default function ImagesScreen() {
    return (
        <ThemedView style={styles.Container}>
            <ThemedText>Image</ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1, backgroundColor: "#151718"
    },

});
