import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function GetStarted() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome! Please log in.</Text>
      <Button title="Go to Home" onPress={() => router.replace("/(tabs)")} />
    </View>
  );
}
