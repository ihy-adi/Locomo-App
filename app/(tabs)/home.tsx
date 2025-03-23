import React from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

// Sample data
const trendingSpots: Spot[] = [
  { id: '1', name: 'Niladri Reservoir', location: 'Tekergat, Sunamgnj', image: 'https://images.unsplash.com/photo-1742218410244-6eb97a4a6229?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: '2', name: 'Casa Las Tirtugas', location: 'Av Americo, Mexico', image: 'https://plus.unsplash.com/premium_photo-1729068649620-5c17361782d6?q=80&w=2129&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: '3', name: 'Casa Las Tirtugas', location: 'Av Americo, Mexico', image: 'https://plus.unsplash.com/premium_photo-1729068649620-5c17361782d6?q=80&w=2129&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: '4', name: 'Casa Las Tirtugas', location: 'Av Americo, Mexico', image: 'https://plus.unsplash.com/premium_photo-1729068649620-5c17361782d6?q=80&w=2129&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];

const events: Event[] = [
  { id: '1', name: 'Niladri Reservoir', date: '26 Jan 2022', location: 'Tekergat, Sunamgnj', image: 'https://images.unsplash.com/photo-1741851373479-b43efb3b6e54?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: '2', name: 'Niladri Reservoir', date: '26 Jan 2022', location: 'Tekergat, Sunamgnj', image: 'https://images.unsplash.com/photo-1742201408341-29204ea79380?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: '3', name: 'Niladri Reservoir', date: '26 Jan 2022', location: 'Tekergat, Sunamgnj', image: 'https://images.unsplash.com/photo-1742201408341-29204ea79380?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: '4', name: 'Niladri Reservoir', date: '26 Jan 2022', location: 'Tekergat, Sunamgnj', image: 'https://images.unsplash.com/photo-1742201408341-29204ea79380?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: '5', name: 'Niladri Reservoir', date: '26 Jan 2022', location: 'Tekergat, Sunamgnj', image: 'https://images.unsplash.com/photo-1742201408341-29204ea79380?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: '6', name: 'Niladri Reservoir', date: '26 Jan 2022', location: 'Tekergat, Sunamgnj', image: 'https://images.unsplash.com/photo-1742275346989-2d696fa2c9b3?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];

const App: React.FC = () => {
  // Render a trending spot card
  const renderTrendingSpot = ({ item }: { item: Spot }) => (
    <View style={styles.spotCard}>
      <Image source={{ uri: item.image }} style={styles.spotImage} />
      <Text style={styles.spotName}>{item.name}</Text>
      <Text style={styles.spotLocation}>{item.location}</Text>
    </View>
  );

  // Render an event item
  const renderEvent = ({ item }: { item: Event }) => (
    <View style={styles.eventCard}>
      <Image source={{ uri: item.image }} style={styles.eventImage} />
      <View style={styles.eventDetails}>
        <Text style={styles.eventDate}>{item.date}</Text>
        <Text style={styles.eventName}>{item.name}</Text>
        <Text style={styles.eventLocation}>{item.location}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="gray" />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
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
          <FlatList
            data={trendingSpots}
            renderItem={renderTrendingSpot}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.trendingList}
            contentContainerStyle={styles.trendingListContent}
          />
        </View>

        {/* Top Events Near You */}
        <View style={styles.eventsContainer}>
          <Text style={styles.sectionTitle}>Top Events Near You</Text>
          <FlatList
            data={events}
            renderItem={renderEvent}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            style={styles.eventList}
            contentContainerStyle={styles.eventListContent}
          />
        </View>
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
    flex: 1,
    paddingTop: 10,
  },
  eventList: {
    flex: 1,
  },
  eventListContent: {
    paddingBottom: 60, // Add padding to account for the tab bar height
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

export default App;