import React from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRestaurants } from "../../context/RestaurantData";

// Types for the data
interface Spot {
  id: string;
  name: string;
  location: string;
  image: string;
}

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  image: string;
}

// Sample data for Events (unchanged)
const events: Event[] = [
  { 
    id: '1', 
    name: 'Zamna India', 
    date: '29 Mar, 4 PM', 
    location: 'Gurugram', 
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    id: '2', 
    name: 'NH7 Weekender', 
    date: '29 Mar, 5 PM', 
    location: 'Noida', 
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    id: '3', 
    name: 'World Class Festival 2025', 
    date: '12 Apr, 4 PM', 
    location: 'Gurugram', 
    image: 'https://images.unsplash.com/photo-1533174072545-2d4f9d5e0425?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    id: '4', 
    name: 'SMAAASH FC-25 Championship', 
    date: '1 May - 31 May, 11 AM', 
    location: 'Dwarka', 
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    id: '5', 
    name: 'Sitar for Mental Health by Rishabh Rikhiram Sharma', 
    date: '6 Apr, 7 PM', 
    location: 'Delhi', 
    image: 'https://images.unsplash.com/photo-1610890684870-0a0b4e4a87e5?q=80&w=2070&auto=format&fit=crop'
  },
  { 
    id: '6', 
    name: 'Aadyam Theatre presents Saanp Seedhi', 
    date: '29 Mar - 30 Mar, 7:30 PM', 
    location: 'Delhi', 
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2070&auto=format&fit=crop'
  },
];

const App: React.FC = () => {
  const router = useRouter();
  const { places, loading, error } = useRestaurants() as { places: { id: string; name: string; location: string; image?: string; rating: number; }[]; loading: boolean; error: string | null; };

  // Get top 5 restaurants by rating
  const trendingSpots: Spot[] = places
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5)
    .map(place => ({
      id: place.id,
      name: place.name,
      location: place.location,
      image: place.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop',
    }));

  // Navigate to spot details page
  const handleSpotPress = (spotId: string) => {
    router.push({
      pathname: '/spots/[id]',
      params: { id: spotId, places: JSON.stringify(places) },
    });
  };

  // Navigate to event details page
  const handleEventPress = (eventId: string) => {
    router.push(`/events/${eventId}`);
  };

  // Render a trending spot card
  const renderTrendingSpot = ({ item }: { item: Spot }) => (
    <TouchableOpacity 
      style={styles.spotCard} 
      onPress={() => handleSpotPress(item.id)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.image }} style={styles.spotImage} />
      <Text style={styles.spotName}>{item.name}</Text>
      <Text style={styles.spotLocation}>{item.location}</Text>
    </TouchableOpacity>
  );

  // Render an event item
  const renderEvent = ({ item }: { item: Event }) => (
    <TouchableOpacity 
      style={styles.eventCard}
      onPress={() => handleEventPress(item.id)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.image }} style={styles.eventImage} />
      <View style={styles.eventDetails}>
        <Text style={styles.eventDate}>{item.date}</Text>
        <Text style={styles.eventName}>{item.name}</Text>
        <Text style={styles.eventLocation}>{item.location}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="gray" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Places"
            placeholderTextColor="gray"
          />
        </View>

        {/* Trending Spots */}
        <View>
          <Text style={styles.sectionTitle}>Trending Spots</Text>
          {loading ? (
            <Text style={styles.loadingText}>Loading trending spots...</Text>
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : trendingSpots.length === 0 ? (
            <Text style={styles.loadingText}>No restaurants found</Text>
          ) : (
            <FlatList
              data={trendingSpots}
              renderItem={renderTrendingSpot}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.trendingList}
              contentContainerStyle={styles.trendingListContent}
            />
          )}
        </View>

        {/* Top Events Near You */}
        <View style={styles.eventsContainer}>
          <Text style={styles.sectionTitle}>Top Events Near You</Text>
          {events.map((event) => (
            <View key={event.id}>
              {renderEvent({ item: event })}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {
    paddingBottom: 60,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: 'black',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
    paddingTop: 20,
  },
  trendingList: {
    marginBottom: 5,
  },
  trendingListContent: {
    paddingVertical: 5,
  },
  spotCard: {
    marginRight: 15,
    width: 150,
  },
  spotImage: {
    width: 150,
    height: 100,
    borderRadius: 10,
  },
  spotName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  spotLocation: {
    fontSize: 14,
    color: 'gray',
  },
  eventsContainer: {
    paddingTop: 10,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  eventImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  eventDetails: {
    flex: 1,
  },
  eventDate: {
    fontSize: 14,
    color: 'gray',
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventLocation: {
    fontSize: 14,
    color: 'gray',
  },
  loadingText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginVertical: 10,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default App;