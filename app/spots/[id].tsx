import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';

const GOOGLE_API_KEY = Constants.expoConfig?.extra?.googleMapsApiKey || '';

interface RestaurantDetails {
  id: string;
  name: string;
  address: string;
  rating: number;
  price_level?: number;
  image?: string;
  description?: string;
  types: string[];
  opening_hours?: { weekday_text: string[] };
  formatted_phone_number?: string;
  website?: string;
}

const SpotDetails = () => {
  const router = useRouter();
  const { id, places } = useLocalSearchParams();
  const [restaurantDetails, setRestaurantDetails] = useState<RestaurantDetails | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch restaurant details from Google Places API
  useEffect(() => {
    const fetchDetails = async () => {
      if (!GOOGLE_API_KEY || !id) {
        console.error('API key or place ID missing');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&fields=name,formatted_address,rating,price_level,photos,editorial_summary,types,opening_hours,formatted_phone_number,website&key=${GOOGLE_API_KEY}`
        );
        const data = await response.json();
        if (data.status === 'OK') {
          const result = data.result;
          setRestaurantDetails({
            id: id as string,
            name: result.name,
            address: result.formatted_address,
            rating: result.rating || 0,
            price_level: result.price_level,
            image: result.photos?.[0]
              ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${result.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`
              : 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop',
            description: result.editorial_summary?.overview,
            types: result.types || [],
            opening_hours: result.opening_hours,
            formatted_phone_number: result.formatted_phone_number,
            website: result.website,
          });
        } else {
          console.error('Places API error:', data.status, data.error_message || 'Unknown error');
        }
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Place Details</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.errorText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!restaurantDetails) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Place Details</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.errorText}>Restaurant not found</Text>
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
        <Text style={styles.headerTitle}>Restaurant Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView}>
        <Image source={{ uri: restaurantDetails.image }} style={styles.spotImage} />

        <View style={styles.contentContainer}>
          <Text style={styles.spotName}>{restaurantDetails.name}</Text>

          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={18} color="#FFD700" />
            <Text style={styles.ratingText}>{restaurantDetails.rating.toFixed(1) || 'N/A'}</Text>
            <Text style={styles.priceRange}>
              {restaurantDetails.price_level ? '$'.repeat(restaurantDetails.price_level) : 'N/A'}
            </Text>
          </View>

          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={18} color="#780EBF" />
            <Text style={styles.spotLocation}>{restaurantDetails.address}</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>
            {restaurantDetails.description || 'No description available.'}
          </Text>

          <View style={styles.divider} />

          <View style={styles.infoSection}>
            <View style={styles.infoItem}>
              <Ionicons name="restaurant-outline" size={20} color="#780EBF" />
              <Text style={styles.infoText}>
                Cuisine: {restaurantDetails.types.filter(type => type !== 'restaurant' && type !== 'food' && type !== 'point_of_interest' && type !== 'establishment').join(', ') || 'N/A'}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={20} color="#780EBF" />
              <Text style={styles.infoText}>
                Hours:{' '}
                {restaurantDetails.opening_hours?.weekday_text
                  ? restaurantDetails.opening_hours.weekday_text.join('\n')
                  : 'N/A'}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Ionicons name="call-outline" size={20} color="#780EBF" />
              <Text style={styles.infoText}>
                {restaurantDetails.formatted_phone_number || 'N/A'}
              </Text>
            </View>

            {restaurantDetails.website && (
              <View style={styles.infoItem}>
                <Ionicons name="globe-outline" size={20} color="#780EBF" />
                <Text
                  style={[styles.infoText, { color: '#780EBF' }]}
                  onPress={() => Linking.openURL(restaurantDetails.website!)}
                >
                  Visit Website
                </Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={styles.mapButton}
            onPress={() =>
              router.push({
                pathname: '/maps',
                params: { places, selectedPlaceId: id },
              })
            }
          >
            <Text style={styles.mapButtonText}>See on the Map</Text>
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
  mapButton: {
    backgroundColor: '#780EBF',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  mapButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SpotDetails;