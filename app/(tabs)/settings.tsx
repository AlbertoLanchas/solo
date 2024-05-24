import { StyleSheet, TouchableOpacity, Image, Switch } from "react-native";
import { useEffect, useState } from "react";
import { useColorScheme } from "nativewind";
import { MyLightTheme } from "../../utilities/themeOptions";
import { useTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

const Settings = () => {
  const { setColorScheme, colorScheme } = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleColorScheme = async (themeValue: "light" | "dark") => {
    setIsDarkMode(themeValue === "dark");
    setColorScheme(themeValue);
    await AsyncStorage.setItem("theme", themeValue);
  };

  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    toggleColorScheme(newTheme);
  };

  useEffect(() => {
    const getTheme = async () => {
      try {
        const themeValue = (await AsyncStorage.getItem("theme")) as
          | "light"
          | "dark";
        if (themeValue) {
          setIsDarkMode(themeValue === "dark");
          setColorScheme(themeValue);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getTheme();
  }, []);

  const { colors } = useTheme();
  const color = colorScheme === "light" ? Colors.light.text : Colors.dark.text;

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Settings</ThemedText>

      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Language</ThemedText>
        <ThemedView style={styles.containerFlags}>
          <TouchableOpacity style={styles.button}>
            <Image
              source={require("@/assets/images/flags/english.png")}
              style={styles.flagIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image
              source={require("@/assets/images/flags/spain.png")}
              style={styles.flagIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image
              source={require("@/assets/images/flags/portugal.png")}
              style={styles.flagIcon}
            />
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText style={[styles.sectionTitle]}>
          Dark Mode: {colorScheme}
        </ThemedText>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDarkMode}
          value={isDarkMode}
        />
      </ThemedView>
    </ThemedView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginBottom: 40,
    width: "100%",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  containerFlags: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  flagIcon: {
    width: 30,
    height: 20,
  },
});
