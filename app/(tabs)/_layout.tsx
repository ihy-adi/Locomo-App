import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';

const _layout = () => {
  return (
    <Tabs
        screenOptions={{
            tabBarItemStyle:{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center'
            },
            tabBarStyle:{
                backgroundColor: 'black',
                borderRadius: 50,
                marginHorizontal: 10,
                marginBottom: 10,
                height: 60,
                position: 'absolute',
                overflow: 'hidden',
                borderWidth: 1,
                borderTopWidth: 0,
                elevation: 0,
                shadowOpacity: 0,
            }
        }}
        
    >
        <Tabs.Screen
        name = "home"
        options={{
            headerShown: false,
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
                <Ionicons
                    name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24}>
                </Ionicons>)
        }}
        />
        <Tabs.Screen
        name = "maps"
        options={{
            title: 'Maps',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => {
                return <Ionicons name={focused ? 'map' : 'map-outline'} color={color} size={24}/>}
        }}
        />
        <Tabs.Screen
        name = "events"
        options={{
            title: 'Events',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => {
                return <Ionicons name={focused ? 'calendar' : 'calendar-outline'} color={color} size={24}/>}
        }}
        />
        <Tabs.Screen
        name = "profile"
        options={{  
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => {
                return <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={24}/>}
        }} 
        />
    </Tabs>

  )
}

export default _layout