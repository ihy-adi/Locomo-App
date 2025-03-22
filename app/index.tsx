import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { auth } from "@/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function GetStarted() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                router.replace("/(tabs)/home"); // Redirect if user is signed in
            } else {
                setLoading(false);
            }
        });
        return unsubscribe;
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#780EBF" style={{ flex: 1, justifyContent: "center" }} />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <ImageBackground source={require("../assets/images/get-started.png")} style={styles.image} />
            </View>
            <View style={styles.content}>
                <View style={styles.iconWrapper}>
                    <Image source={require("../assets/images/Locomo_logo.jpeg")} style={styles.logo} />
                </View>
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>
                        Life is short and the world is{" "}
                    </Text>
                    <View style={styles.wideTextContainer}>
                        <Text style={styles.highlight}>wide</Text>
                        <Image source={require("../assets/images/wide.png")} style={styles.wideImage} />
                    </View>
                </View>
                <Text style={styles.description}>
                    Providing you with the nearest, best places to visit when you want to explore, meet new people, or you just get bored!!
                </Text>
                <TouchableOpacity style={styles.button} onPress={() => router.replace("/sign-in")}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    imageContainer: { width: "100%", height: "50%", borderRadius: 30, overflow: "hidden" },
    image: { width: "100%", height: "100%", resizeMode: "cover" },
    content: { alignItems: "center", paddingHorizontal: 20 },
    iconWrapper: { backgroundColor: "white", borderRadius: 50, width: 80, height: 80, alignItems: "center", justifyContent: "center", marginBottom: 10 },
    logo: { width: 70, height: 70, resizeMode: "contain" },
    headingContainer: { alignItems: "center", marginBottom: 10 },
    heading: { color: "#1B1E28", textAlign: "center", fontSize: 30, fontWeight: "900", lineHeight: 36 },
    wideTextContainer: { flexDirection: "column", alignItems: "center" }, // Ensures correct alignment
    highlight: { color: "#780ebf", fontSize: 30, fontWeight: "900" }, // Matches heading size
    wideImage: { width: 80, height: 20, resizeMode: "contain", marginTop: 5 }, // Adds spacing below "wide"
    description: { fontSize: 16, textAlign: "center", color: "gray", marginBottom: 30, paddingHorizontal: 15 },
    button: { width: 335, height: 56, borderRadius: 16, backgroundColor: "#780EBF", alignItems: "center", justifyContent: "center" },
    buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});
