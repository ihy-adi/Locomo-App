import { StatusBar } from "expo-status-bar";;
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

export default function RootLayout() {
  return (
    <View className = "flex-1 justify-center items-center">
      <Text className = "text-5xl text-primary text-primary font-bold">Locomo</Text>

      <Link href="/profile" style = {{color: "red"}}>
        Go to Profile
      </Link>
    </View>
  );
}
