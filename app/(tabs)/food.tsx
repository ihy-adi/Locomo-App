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

// Sample data for the places (Restaurants from the image)
const placesData: Place[] = [
  {
    id: '1',
    name: 'Barish Restaurant',
    location: 'Delhi',
    rating: 4.2,
    price: '$300/Person',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop', // Restaurant interior
  },
  {
    id: '2',
    name: 'Orana',
    location: 'Delhi',
    rating: 4.5,
    price: '$500/Person',
    image: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=2070&auto=format&fit=crop', // Fine dining vibe
  },
  {
    id: '3',
    name: 'Gulab',
    location: 'Delhi',
    rating: 4.0,
    price: '$250/Person',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=2070&auto=format&fit=crop', // Indian cuisine
  },
  {
    id: '4',
    name: 'Pizza Lover’s',
    location: 'Delhi',
    rating: 4.1,
    price: '$200/Person',
    image: 'https://images.unsplash.com/photo-1513104890138-7c14e0f6290b?q=80&w=2070&auto=format&fit=crop', // Pizza image
  },
  {
    id: '5',
    name: 'Jazbaa',
    location: 'Delhi',
    rating: 4.3,
    price: '$400/Person',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a000?q=80&w=2070&auto=format&fit=crop', // Party lounge vibe
  },
  {
    id: '6',
    name: 'Bawarchi Kitchen',
    location: 'Delhi',
    rating: 4.0,
    price: '$280/Person',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop', // Indian kitchen vibe
  },
  {
    id: '7',
    name: 'Shivam Mangla Chebo',
    location: 'Delhi',
    rating: 4.2,
    price: '$350/Person',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop', // Casual dining
  },
  {
    id: '8',
    name: 'Royal Mutton & Royal Chicken',
    location: 'Delhi',
    rating: 4.1,
    price: '$320/Person',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=2070&auto=format&fit=crop', // North Indian food
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