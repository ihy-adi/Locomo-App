import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// Sample data for Trending Spots
const spotsData = [
  { 
    id: '1', 
    name: 'Barish Restaurant', 
    location: 'Delhi', 
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop',
    description: 'Barish Restaurant offers a unique dining experience with indoor rain and thunder effects. Enjoy delicious North Indian cuisine in an atmosphere that simulates a monsoon experience.',
    rating: '4.7',
    priceRange: '₹₹₹',
    cuisine: 'North Indian, Continental',
    openingHours: '12PM - 11PM',
    contactNumber: '+91 98765 43210'
  },
  { 
    id: '2', 
    name: 'Orana', 
    location: 'Delhi', 
    image: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=2070&auto=format&fit=crop',
    description: 'Orana is a fine dining restaurant that celebrates Australian native ingredients. The menu is a showcase of indigenous foods prepared with modern techniques, creating a unique and memorable dining experience.',
    rating: '4.8',
    priceRange: '₹₹₹₹',
    cuisine: 'Modern Australian, Fine Dining',
    openingHours: '6PM - 10PM',
    contactNumber: '+91 98765 12345'
  },
  { 
    id: '3', 
    name: 'Gulab', 
    location: 'Delhi', 
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=2070&auto=format&fit=crop',
    description: 'Gulab specializes in traditional Indian desserts and sweets. Their rose-flavored treats are particularly famous, and they offer a wide variety of regional Indian sweets prepared using authentic recipes.',
    rating: '4.5',
    priceRange: '₹₹',
    cuisine: 'Indian Desserts, Sweets',
    openingHours: '10AM - 10PM',
    contactNumber: '+91 98765 67890'
  },
  { 
    id: '4', 
    name: 'Pizza Lovers', 
    location: 'Delhi', 
    image: 'https://images.unsplash.com/photo-1513104890138-7c14e0f6290b?q=80&w=2070&auto=format&fit=crop',
    description: 'Pizza Lover\'s is a casual dining pizzeria offering a variety of artisanal pizzas with both classic and innovative toppings. Their wood-fired oven gives the pizzas a distinctive smoky flavor that keeps customers coming back.',
    rating: '4.6',
    priceRange: '₹₹',
    cuisine: 'Italian, Pizzeria',
    openingHours: '11AM - 11PM',
    contactNumber: '+91 98765 54321'
  },
];

const SpotDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  // Find the spot data based on id
  const spotData = spotsData.find(spot => spot.id === id);
  
  if (!spotData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Place Details</Text>
          <View style={{width: 24}} /> {/* Empty view for spacing */}
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.errorText}>Place not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Place Details</Text>
        <View style={{width: 24}} /> {/* Empty view for spacing */}
      </View>
      
      <ScrollView style={styles.scrollView}>
        <Image source={{ uri: spotData.image }} style={styles.spotImage} />
        
        <View style={styles.contentContainer}>
          <Text style={styles.spotName}>{spotData.name}</Text>
          
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={18} color="#FFD700" />
            <Text style={styles.ratingText}>{spotData.rating}</Text>
            <Text style={styles.priceRange}>{spotData.priceRange}</Text>
          </View>
          
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={18} color="#780EBF" />
            <Text style={styles.spotLocation}>{spotData.location}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{spotData.description}</Text>
          
          <View style={styles.divider} />
          
          <View style={styles.infoSection}>
            <View style={styles.infoItem}>
              <Ionicons name="restaurant-outline" size={20} color="#780EBF" />
              <Text style={styles.infoText}>Cuisine: {spotData.cuisine}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={20} color="#780EBF" />
              <Text style={styles.infoText}>Hours: {spotData.openingHours}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Ionicons name="call-outline" size={20} color="#780EBF" />
              <Text style={styles.infoText}>{spotData.contactNumber}</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.reserveButton}>
            <Text style={styles.reserveButtonText}>Make Reservation</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  spotImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 20,
  },
  spotName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
    marginRight: 15,
  },
  priceRange: {
    fontSize: 16,
    color: '#444',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spotLocation: {
    fontSize: 16,
    color: '#444',
    marginLeft: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
  infoSection: {
    marginTop: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#444',
  },
  reserveButton: {
    backgroundColor: '#780EBF',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  reserveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  }
});

export default SpotDetails;