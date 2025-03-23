import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For the back arrow icon
import { SafeAreaView } from 'react-native-safe-area-context';

// Define the type for each place item
interface Place {
  id: string;
  name: string;
  location: string;
  rating: number;
  price: string;
  image: string; // Placeholder for image URL or local asset
}

// Sample data for the places (you can replace this with your actual data)
const placesData: Place[] = [
  {
    id: '1',
    name: 'Niladri Reservoir',
    location: 'Tekergat, Sunamgnj',
    rating: 4.7,
    price: '$459/Person',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with actual image
  },
  {
    id: '2',
    name: 'Niladri Reservoir',
    location: 'Tekergat, Sunamgnj',
    rating: 4.7,
    price: '$459/Person',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D', // Replace with actual image
  },
  {
    id: '3',
    name: 'Niladri Reservoir',
    location: 'Tekergat, Sunamgnj',
    rating: 4.7,
    price: '$459/Person',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D', // Replace with actual image
  },
  {
    id: '4',
    name: 'Casa Las Tirtugas',
    location: 'Av Damero, Mexico',
    rating: 4.8,
    price: '$894/Person',
    image: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D', // Replace with actual image
  },
  {
    id: '5',
    name: 'Aonang Villa Resort',
    location: 'Bastola, Islampur',
    rating: 4.3,
    price: '$761/Person',
    image: 'https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZvb2R8ZW58MHx8MHx8fDA%3D', // Replace with actual image
  },
  {
    id: '6',
    name: 'Rangauti Resort',
    location: 'Sylhet, Airport Road',
    rating: 4.5,
    price: '$857/Person',
    image: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGZvb2R8ZW58MHx8MHx8fDA%3D', // Replace with actual image
  },
  {
    id: '7',
    name: 'hello Restaurant',
    location: 'Sylhet, Airport Road',
    rating: 4.5,
    price: '$857/Person',
    image: 'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZvb2R8ZW58MHx8MHx8fDA%3D', // Replace with actual image
  },
  {
    id: '8',
    name: 'New Resort',
    location: 'Sylhet, Airport Road',
    rating: 4.5,
    price: '$857/Person',
    image: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZWF0aW5nfGVufDB8fDB8fHww', // Replace with actual image
  },
];

// Component for the screen
const FoodScreen: React.FC = () => {
  // Render each place card
  const renderPlaceItem = ({ item }: { item: Place }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <TouchableOpacity style={styles.heartIcon}>
        <Ionicons name="heart-outline" size={20} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <View style={styles.locationRow}>
        <Ionicons name="location-outline" size={16} color="#666" />
        <Text style={styles.locationText}>{item.location}</Text>
      </View>
      <View style={styles.ratingPriceRow}>
        <View style={styles.rating}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
        <Text style={styles.priceText}>{item.price}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Food</Text>
      </View>

      {/* All Popular Places Section */}
      <Text style={styles.sectionTitle}>All Popular Places</Text>
      <FlatList
        data={placesData}
        renderItem={renderPlaceItem}
        keyExtractor={(item) => item.id}
        numColumns={2} // For a 2-column grid
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent} // Add padding to the bottom
      />
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  backButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 8,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  listContent: {
    paddingBottom: 80, // Adjust this value based on the height of your navigation bar
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    width: '48%', // Adjust for 2 columns with spacing
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  heartIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    marginHorizontal: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    marginTop: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  ratingPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 4,
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default FoodScreen;