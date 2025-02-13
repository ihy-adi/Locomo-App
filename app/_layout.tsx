import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Start Directly from Get Started */}
      <Stack.Screen name="(auth)/get-started" options={{ headerShown: false }} />

      {/* Authentication Flow */}
      <Stack.Screen name="(auth)/auth" options={{ headerShown: false }} />

      {/* Main App (Tabs) - After Login */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Not Found Page */}
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
