import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { DarkTheme, NavigationContainer, ThemeProvider } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "nativewind";
import "../global.css";
import { MyLightTheme } from "../utilities/themeOptions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Icon from "react-native-vector-icons/FontAwesome";

//Components
import SeeAll from "@/components/seeAll";
// Screens
import ImageScreen from "@/app/images"
import HomeScreen from "@/app/(tabs)/index";
import Settings from "@/app/settings";
import MovieScreen from "@/app/home/MovieScreen"
import PersonScreen from "@/app/home/PersonScreen"

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    // position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    border: "none",
    backgroundColor: "#151718",
    // #eab308
  },
};

// export default function RootLayout() {
//   const { colorScheme, setColorScheme } = useColorScheme();
//   useEffect(() => {
//     const loadTheme = async () => {
//       // await AsyncStorage.removeItem('theme');
//       const stored = (await AsyncStorage.getItem("theme")) as ThemeOptions;
//       if (stored) {
//         setColorScheme(stored);
//       } else {
//         // Default to light if nothing or unexpected value is stored
//         setColorScheme("light");
//       }
//     };

//     loadTheme();
//   }, [colorScheme]);

//   return (
//   <NavigationContainer >
//     <ThemeProvider value={colorScheme === "dark" ? DarkTheme : MyLightTheme}>
//       <GestureHandlerRootView style={{ flex: 1 }}>
//         <Stack.Navigator>
//           <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//           <Stack.Screen name="seeAll" options={{ headerShown: false }} />
//           <Stack.Screen name="explore" options={{ headerShown: false }} />
//           <Stack.Screen name="+not-found" />
//         </Stack.Navigator>
//       </GestureHandlerRootView>
//     </ThemeProvider>

//   </NavigationContainer>

//   );
// }

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeTab"
        options={{ headerShown: false }}
        component={HomeScreen}
      />
      <Stack.Screen
        name="Movie"
        options={{ headerShown: false }}
        component={MovieScreen}
      />
      <Stack.Screen
        name="Person"
        options={{ headerShown: false }}
        component={PersonScreen}
      />
      {/* <Stack.Screen
        name="Search"
        options={{ headerShown: false }}
        component={SearchScreen}
      /> */}
      <Stack.Screen
        name="SeeAll"
        options={{ headerShown: false }}
        component={SeeAll}
      />
      {/* <Stack.Screen
        name="Modal"
        options={{
          headerShown: false,
          presentation: "transparentModal",
          animation: "fade",
        }}
        component={ModalImage}
      /> */}
    </Stack.Navigator>
  );
};

const ImagesStack = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Images"
            options={{ headerShown: false }}
            component={ImageScreen}
          />
        </Stack.Navigator>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const SettingsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        options={{ headerShown: false }}
        component={Settings}
      />
    </Stack.Navigator>
  );
};

export default function RootLayout() {
  return (
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="(tabs)"
          component={MainStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon
                name="home"
                color={focused ? "#eab308" : "#fff"}
                size={24}
              />
            ),
          }}
        />
        <Tab.Screen
          name="images"
          component={ImagesStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon
                name="image"
                color={focused ? "#eab308" : "#fff"}
                size={24}
              />
            ),
          }}
        />

        <Tab.Screen
          name="settings"
          component={SettingsStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon
                name="gear"
                color={focused ? "#eab308" : "#fff"}
                size={24}
              />
            ),
          }}
        />
      </Tab.Navigator>
  );
};
