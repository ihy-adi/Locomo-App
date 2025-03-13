import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import { useRouter } from "expo-router";

export default function GetStarted() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Background Image Wrapper for Rounded Corners */}
      <View style={styles.imageContainer}>
        <ImageBackground
          source={require("../assets/images/get-started.png")} // Ensure correct path
          style={styles.image}
        />
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        {/* Logo Icon */}
        <View style={styles.iconWrapper}>
          <Image
            source={require("../assets/images/Locomo_logo.jpeg")} // Ensure correct path
            style={styles.logo}
          />
        </View>

        {/* Heading with "wide" Image */}
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>
            Life is short and the world is{" "}
            <Text style={styles.highlight}>wide</Text>
          </Text>
          <Image
            source={require("../assets/images/wide.png")} // Ensure correct path
            style={styles.wideImage} 
          />
        </View>

        {/* Description */}
        <Text style={styles.description}>
          Providing you with the nearest, best places to visit when you want to explore,
          meet new people, or you just get bored!!
        </Text>

        {/* Navigation Button */}
        <TouchableOpacity style={styles.button} onPress={() => router.replace("/(tabs)/home")}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    width: "100%",
    height: "50%",
    borderRadius: 30,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 0, // Overlapping effect
  },
  iconWrapper: {
    backgroundColor: "white",
    borderRadius: 50,
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    shadowColor: "#000", // Soft shadow for 3D effect
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4, // Android shadow
  },
  logo: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
  headingContainer: {
    alignItems: "center", // Centers the text and image
    marginBottom: 10, // Space before the description
  },
  heading: {
    color: "#1B1E28", // Light Text Color
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 30,
    fontStyle: "normal",
    fontWeight: "900",
    lineHeight: 36, // 120% of font size
  },
  highlight: {
    color: "#780ebf",
  },
  wideImage: {
    width: 80, // Adjust width based on design
    height: 20, // Adjust height based on design
    resizeMode: "contain",
    marginTop: 0, // Small gap between text and image
    marginLeft: 110, // Small gap between text and image
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "gray",
    marginBottom: 30,
    paddingHorizontal: 15,
  },
  button: {
    width: 335,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#780EBF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#7D2EFF",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
