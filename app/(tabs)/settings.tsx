import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Switch,
} from "react-native";
import React, { createContext, useState, useContext, useEffect } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { Appearance } from "react-native";

const Settings = () => {
  const colorScheme = useColorScheme();
  const color = colorScheme === "light" ? Colors.dark.text : Colors.light.text;
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      Appearance.setColorScheme("light");
    } else {
      Appearance.setColorScheme("dark");
    }
    setIsDarkMode((previousState) => !previousState);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Language</Text>
        <View style={styles.containerFlags}>
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
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: color }]}>
          Dark Mode: {colorScheme}
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDarkMode}
          value={isDarkMode}
        />
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(51,51,51)",
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
