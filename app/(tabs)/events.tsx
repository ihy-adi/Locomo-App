import React from 'react';
import { 
  View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity, SafeAreaView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Import useRouter

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  image: string;
}

const featuredEvent = {
  id: '1', // Add an ID for the featured event
  name: 'Zamna India',
  location: 'Gurugram',
  time: '4 PM, 29 Mar',
  rating: 4.8, // Hypothetical rating
  attendees: 120, // Hypothetical number of attendees
  image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=2070&auto=format&fit=crop'
};

const events: Event[] = [
  { 
    id: '2', // Changed to '2' since '1' is now the featured event
    name: 'NH7 Weekender', 
    date: '29 Mar, 5 PM', 
    location: 'Noida', 
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=2070&auto=format&fit=crop' // Music festival vibe
  },
  { 
    id: '3', 
    name: 'World Class Festival 2025', 
    date: '12 Apr, 4 PM', 
    location: 'Gurugram', 
    image: 'https://images.unsplash.com/photo-1533174072545-2d4f9d5e0425?q=80&w=2070&auto=format&fit=crop' // Party/festival atmosphere
  },
  { 
    id: '4', 
    name: 'SMAAASH FC-25 Championship', 
    date: '1 May - 31 May, 11 AM', 
    location: 'Dwarka', 
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop' // Gaming event vibe
  },
  { 
    id: '5', 
    name: 'Sitar for Mental Health by Rishabh Rikhiram Sharma', 
    date: '6 Apr, 7 PM', 
    location: 'Delhi', 
    image: 'https://images.unsplash.com/photo-1610890684870-0a0b4e4a87e5?q=80&w=2070&auto=format&fit=crop' // Classical music event
  },
  { 
    id: '6', 
    name: 'Aadyam Theatre presents Saanp Seedhi', 
    date: '29 Mar - 30 Mar, 7:30 PM', 
    location: 'Delhi', 
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2070&auto=format&fit=crop' // Theatre performance vibe
  },
];

const EventsScreen: React.FC = () => {
  const router = useRouter(); // Use useRouter for navigation

  // Handle navigation to event details
  const handleEventPress = (eventId: string) => {
    router.push(`/events/${eventId}`);
  };

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
        <Text style={styles.eventLocation}>
          <Ionicons name="location-outline" size={16} color="gray" /> {item.location}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="gray" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Events</Text>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="black" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
          <TextInput style={styles.searchInput} placeholder="Search Events" placeholderTextColor="gray" />
        </View>

        {/* Featured Event - Now Clickable */}
        <TouchableOpacity 
          style={styles.featuredCard}
          onPress={() => handleEventPress(featuredEvent.id)}
          activeOpacity={0.9}
        >
          <Text style={styles.featuredName}>{featuredEvent.name}</Text>
          <View style={styles.featuredDetails}>
            <Text style={styles.featuredLocation}>
              <Ionicons name="location-outline" size={16} color="white" /> {featuredEvent.location}
            </Text>
            <Text style={styles.featuredTime}>
              <Ionicons name="time-outline" size={16} color="white" /> {featuredEvent.time}
            </Text>
          </View>
          <View style={styles.featuredStats}>
            <Text style={styles.featuredRating}>
              <Ionicons name="star" size={16} color="yellow" /> {featuredEvent.rating}
            </Text>
            <Text style={styles.featuredAttendees}>
              <Ionicons name="people-outline" size={16} color="white" /> +{featuredEvent.attendees}
            </Text>
          </View>
          <View style={styles.mapButtonContainer}>
            <TouchableOpacity
              style={styles.mapButton}
              onPress={(e) => {
                e.stopPropagation(); // Prevent triggering the parent TouchableOpacity
                router.push('/maps');
              }}
            >
              <Text style={styles.mapButtonText}>See On The Map</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        {/* Event List */}
        <FlatList
          data={events}
          renderItem={renderEvent}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          style={styles.eventList}
          contentContainerStyle={styles.eventListContent}
        />
      </View>
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
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 10,
    height: 10,
    backgroundColor: 'red',
    borderRadius: 5,
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
  featuredCard: {
    backgroundColor: '#333',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  featuredName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  featuredDetails: {
    marginBottom: 10,
  },
  featuredLocation: {
    fontSize: 14,
    color: 'white',
    marginBottom: 5,
  },
  featuredTime: {
    fontSize: 14,
    color: 'white',
  },
  featuredStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  featuredRating: {
    fontSize: 14,
    color: 'white',
  },
  featuredAttendees: {
    fontSize: 14,
    color: 'white',
  },
  mapButtonContainer: {
    // This container helps with event propagation
    width: '100%',
  },
  mapButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: 'center',
  },
  mapButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  eventList: {
    flex: 1,
  },
  eventListContent: {
    paddingBottom: 60, // Account for tab bar height
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
});

export default EventsScreen;