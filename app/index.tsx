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
      {/* Background Image */}
      <ImageBackground
        source={require("../assets/images/get-started.png")} // Ensure correct path
        style={styles.image}
      >
      </ImageBackground>

      {/* Content */}
      <View style={styles.content}>
        {/* Logo Icon */}
        <View style={styles.iconWrapper}>
          <Image
            source={require("../assets/images/Locomo_logo.jpeg")} // Ensure correct path
            style={styles.logo}
          />
        </View>

        {/* Heading */}
        <Text style={styles.heading}>
          Life is short and the world is <Text style={styles.highlight}>wide</Text>
        </Text>

        {/* Description */}
        <Text style={styles.description}>
          Providing you with the nearest, best places to visit when you want to explore,
          meet new people, or you just get bored!!
        </Text>

        {/* Navigation Button */}
        <TouchableOpacity style={styles.button} onPress={() => router.replace("/(tabs)/events")}>
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
  image: {
    width: "100%",
    height: "65%", // Adjusted for better layout
    resizeMode: "cover",
    borderRadius: 20, // Adjust the value to change the roundness
    overflow: "hidden",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: -70, // Overlapping effect
  },
  iconWrapper: {
    backgroundColor: "white",
    borderRadius: 50,
    width: 80, // Increased size
    height: 80, // Increased size
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  logo: {
    width: 80, // Adjusted size
    height: 80, // Adjusted size
    resizeMode: "contain",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  highlight: {
    color: "#7D2EFF",
    textDecorationLine: "underline",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "gray",
    marginBottom: 30,
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: "#7D2EFF",
    paddingVertical: 16, // Increased size
    paddingHorizontal: 89, // Increased size
    borderRadius: 30, // More rounded for a modern look
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
