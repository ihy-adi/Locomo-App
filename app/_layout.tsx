import { StyleSheet, Text, View } from 'react-native';
import { Slot, Stack } from 'expo-router';
import './globals.css';


const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
      <Stack.Screen name="events/[id]" options = {{ headerShown: false}} />
    </Stack>
  )
}

export default RootLayout