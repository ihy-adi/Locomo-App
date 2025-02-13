import { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Asset } from 'expo-asset';

const logo = Asset.fromModule(require('../../assets/images/Locomo_logo_nobg.png')).uri;

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/get-started");
    }, 3000); // Show splash for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/Locomo_logo_nobg.png")} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff", // White background
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});
