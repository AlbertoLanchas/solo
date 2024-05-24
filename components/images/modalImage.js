import {
  Platform,
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import { hp, wp } from "../helpers/common";
import { Animated, Button, useLocaleContext } from "react-native-web";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image } from "expo-image";
import { theme } from "../constants/theme";
import { FontAwesome, Ionicons, Feather } from "@expo/vector-icons";
import { FadeIn, FadeInDown } from "react-native-reanimated";
import * as FileSystem from "expo-file-system";
import Toast from "react-native-toast-message";

const ModalImage = () => {
  const navigation = useNavigation();
  const { params: item } = useRoute();
  const [status, setStatus] = useState("");
  const fileName = item?.cover_image_url;
  const uri = fileName;
  const filePath = `${FileSystem.documentDirectory}${fileName}`;

  const getSize = () => {
    const aspectRatio = item?.width / item?.height;
    const maxWidth = Platform.OS == "web" ? wp(50) : wp(92);
    let calculatedHeight = maxWidth / aspectRatio;
    let calculatedWidth = maxWidth;

    if (aspectRatio < 1) {
      calculatedWidth = calculatedHeight * aspectRatio;
    }
    return {
      width: calculatedWidth,
      height: calculatedHeight,
    };
  };

  const onLoad = () => {
    setStatus("");
  };

  const handleDownloadImage = () => {
    const fileUrl = item.cover_image_url;
    const fileName = fileUrl.split("/").pop();
    fetch(fileUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        setStatus("Imagen descargada con éxito");
        if (uri) {
          showToast("Image downloaded");
        }
      })
      .catch((error) => {
        console.error("Error al descargar la imagen:", error);
        Alert.alert("Error", "No se pudo descargar la imagen.");
      });
  };

  const handleSetBackground = () => {};

  const showToast = (message) => {
    Toast.show({ type: "success", text1: message, position: "bottom" });
  };

  const toasConfig = {
    succes: ({ text1, props, ...rest }) => {
      return (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{text1}</Text>
        </View>
      );
    },
  };

  return (
    <BlurView style={styles.container} tint="dark" intensity={60}>
      <View sytle={getSize()}>
        <Image
          transition={100}
          style={[styles.image, getSize()]}
          source={uri}
          onLoad={onLoad}
        />
      </View>
      {/* <Button title="back"  /> */}
      <View style={styles.buttons}>
        <Animated.View entering={FadeInDown.springify()}>
          <Pressable style={styles.button} onPress={handleSetBackground}>
            <FontAwesome
              name="mobile"
              size={24}
              color={theme.colors.white}
            ></FontAwesome>
          </Pressable>
        </Animated.View>
        <Animated.View entering={FadeInDown.springify().delay(100)}>
          {status == "downloading" ? (
            <View style={styles.button}>
              <ActivityIndicator size="small" color="white" />
            </View>
          ) : (
            <Pressable style={styles.button} onPress={handleDownloadImage}>
              <Feather
                name="download"
                size={24}
                color={theme.colors.white}
              ></Feather>
            </Pressable>
          )}
        </Animated.View>
        <Animated.View entering={FadeInDown.springify().delay(200)}>
          <Pressable style={styles.button} onPress={() => navigation.goBack()}>
            <Ionicons
              name="close"
              size={24}
              color={theme.colors.white}
            ></Ionicons>
          </Pressable>
        </Animated.View>
      </View>
      <Toast config={toasConfig} visibilityTime={2500} />
    </BlurView>
  );
};

export default ModalImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(4),
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  image: {
    borderRadius: theme.radius.lg,
    borderWidth: 2,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderColor: "rgba(255,255,255,0.1)",
  },
  buttons: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 50,
  },
  button: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: theme.radius.lg,
    borderCurve: "continuous",
  },
  toast: {
    padding: 15,
    paddingHorizontal: 30,
    borderRadius: theme.radius.xl,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  toastText: {
    fontSize: hp(1.8),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.white,
  },
});
