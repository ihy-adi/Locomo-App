import { StyleSheet, Text, View } from 'react-native';
import { Slot, Stack } from 'expo-router';
import './globals.css';
import { RestaurantProvider } from '.././context/RestaurantData'; // Import RestaurantProvider

const RootLayout = () => {
  return (
    <RestaurantProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="events/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="spots/[id]" options={{ headerShown: false }} />
      </Stack>
    </RestaurantProvider>
  );
};

export default RootLayout;