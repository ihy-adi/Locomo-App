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
  latitude: number;
  longitude: number;
  type: 'event' | 'spot';
}

const featuredEvent = {
  id: '1', // Add an ID for the featured event
  name: 'Zamna India',
  location: 'Gurugram',
  time: '4 PM, 29 Mar',
  rating: 4.8, // Hypothetical rating
  attendees: 120, // Hypothetical number of attendees
  image : "https://images.unsplash.com/photo-1665667283041-5709a0bfc88f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHVycGxlJTIwY29uY2VydHxlbnwwfHwwfHx8MA%3D%3D",
};

const events: Event[] = [
  {
    id: '1',
    name: 'Zamna India',
    date: '29 Mar, 4 PM',
    location: 'Gurugram',
    latitude: 28.6980,
    longitude: 77.1325,
    image : "https://images.unsplash.com/photo-1665667283041-5709a0bfc88f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHVycGxlJTIwY29uY2VydHxlbnwwfHwwfHx8MA%3D%3D",
    type: 'event',
  },
  {
    id: '2',
    name: 'Devi: Traditional Indian Art Workshop',
    date: '2 Apr, 1 PM',
    location: 'Pitampura, Delhi',
    latitude: 28.6980,
    longitude: 77.1325,
    image:"https://images.unsplash.com/photo-1569263835889-9e47e06115f2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGV2aSUyMGFydHxlbnwwfHwwfHx8MA%3D%3D",
    type: 'event',
  },
  {
    id: '3',
    name: 'Education Worldwide India Fair',
    date: '5 Apr, 10 AM',
    location: 'Connaught Place, New Delhi',
    latitude: 28.6270,
    longitude: 77.2190,
    image : "https://images.unsplash.com/photo-1557734864-c78b6dfef1b1?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGVkdWNhdGlvbiUyMGZhaXJ8ZW58MHx8MHx8fDA%3D",
    type: 'event',
  },
  {
    id: '4',
    name: 'Mothers Day Run 2025',
    date: '11 May, 6 AM',
    location: 'Dwarka, Delhi',
    latitude: 28.5916,
    longitude: 77.0460,
    image : "https://images.unsplash.com/photo-1719299246434-9fa4f89f61e8?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1vbSUyMG1hcmF0aG9ufGVufDB8fDB8fHww",
    type: 'event',
  },
  {
    id: '5',
    name: 'MachAuto 2025 Expo',
    date: '15 May, 10 AM',
    location: 'Pragati Maidan, New Delhi',
    latitude: 28.6139,
    longitude: 77.2480,
    image : "https://images.unsplash.com/photo-1682591701233-b2dfab9d6424?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNhciUyMGV4aGliaXRpb258ZW58MHx8MHx8fDA%3D",
    type: 'event',
  },
  {
    id: '6',
    name: '59th IHGF Delhi Fair (Spring)',
    date: '16 Apr, 9 AM',
    location: 'Greater Noida',
    latitude: 28.4618,
    longitude: 77.5001,
    image : "https://images.unsplash.com/photo-1703439524413-5ac9e2059f8b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAwfHxjYXJuaXZhbCUyMGRlbGhpfGVufDB8fDB8fHww",
    type: 'event',
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