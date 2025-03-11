import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#ffd33d',
                headerStyle: {
                    backgroundColor: '#25292e',
                },
                headerShadowVisible: false,
                headerTintColor: '#fff',
                tabBarStyle: {
                    backgroundColor: '#25292e',
                },
            }}
        >
            
            <Tabs.Screen name="home" options={{
                title: 'Home',
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons
                        name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24}>
                    </Ionicons>)
            }} />
            {/* <Tabs.Screen name="events" options={{
                title: 'map',
                tabBarIcon: ({ color, focused }) => {
                    return <Ionicons name={focused ? 'map' : 'map-outline'} color={color} size={24}/>}
            }} /> */}
            <Tabs.Screen name="events" options={{
                title: 'Events',
                tabBarIcon: ({ color, focused }) => {
                    return <Ionicons name={focused ? 'calendar' : 'calendar-outline'} color={color} size={24}/>}
            }} />
            <Tabs.Screen name="you" options={{
                title: 'Profile',
                tabBarIcon: ({ color, focused }) => {
                    return <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={24}/>}
            }} />
        </Tabs>
    );
}
