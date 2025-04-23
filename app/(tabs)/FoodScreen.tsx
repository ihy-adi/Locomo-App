import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import { auth, db } from '@/FirebaseConfig';
import { FavoriteService } from '@/app/services/firestore-services';
import { collection, query, onSnapshot } from 'firebase/firestore';

// Define the type for each place item
interface Place {
  id: string;
  name: string;
  location: string;
  rating: number;
  price?: string;
  image?: string;
  latitude: number;
  longitude: number;
}

const GOOGLE_API_KEY = Constants.expoConfig?.extra?.googleMapsApiKey || '';

const FoodScreen: React.FC = () => {
  const router = useRouter();
  const [places, setPlaces] = useState<Place[]>([]);
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
  const [favoritedItems, setFavoritedItems] = useState<Set<string>>(new Set());
  const [loadingFavorites, setLoadingFavorites] = useState(true);

  // Fetch user location and nearby restaurants with pagination
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Location permission is required to find nearby restaurants.');
          return;
        }
        let currentLocation = await Location.getCurrentPositionAsync({});
        setUserLocation(currentLocation);

        // Fetch nearby restaurants
        if (GOOGLE_API_KEY) {
          let allPlaces: Place[] = [];
          let nextPageToken: string | undefined = undefined;
          const maxPages = 3; // Fetch up to 3 pages (60 results)

          for (let page = 0; page < maxPages; page++) {
            const url = nextPageToken
              ? `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${nextPageToken}&key=${GOOGLE_API_KEY}`
              : `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${currentLocation.coords.latitude},${currentLocation.coords.longitude}&radius=5000&type=restaurant&key=${GOOGLE_API_KEY}`;

            const response: Response = await fetch(url);
            const data = await response.json();

            if (data.status === 'OK') {
              const fetchedPlaces: Place[] = data.results.map((place: any) => ({
                id: place.place_id,
                name: place.name,
                location: place.vicinity,
                rating: place.rating || 0,
                price: place.price_level ? `$${place.price_level * 100}/Person` : 'N/A',
                image: place.photos?.[0]
                  ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`
                  : 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop',
                latitude: place.geometry.location.lat,
                longitude: place.geometry.location.lng,
              }));
              allPlaces = [...allPlaces, ...fetchedPlaces];
              setPlaces(allPlaces); // Update state incrementally to show results as they load

              nextPageToken = data.next_page_token;
              if (!nextPageToken || page === maxPages - 1) break;

              // Wait 2 seconds before requesting the next page, as per API requirements
              await new Promise((resolve) => setTimeout(resolve, 2000));
            } else {
              console.error('Places API error:', data.status, data.error_message || 'Unknown error');
              Alert.alert('Error', 'Failed to fetch restaurants. Please try again.');
              break;
            }
          }
        } else {
          Alert.alert('Error', 'Google API Key is missing.');
        }
      } catch (error) {
        console.error('Error fetching location or places:', error);
        Alert.alert('Error', 'Could not load restaurants. Please check your connection.');
      }
    })();
  }, []);

  // Subscribe to auth state and favorites
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoadingFavorites(true);
        const q = query(collection(db, 'users', user.uid, 'Favourites'));
        const unsubscribeSnapshot = onSnapshot(
          q,
          (querySnapshot) => {
            const favs = new Set<string>();
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              favs.add(`${data.type}-${data.originalId}`);
            });
            setFavoritedItems(favs);
            setLoadingFavorites(false);
          },
          (error) => {
            console.error('Firestore onSnapshot error:', error);
            Alert.alert('Error', 'Could not load favorites. Please try again.');
            setLoadingFavorites(false);
          }
        );
        return unsubscribeSnapshot;
      } else {
        setFavoritedItems(new Set());
        setLoadingFavorites(false);
      }
    });
    return () => unsubscribeAuth();
  }, []);

  // Toggle favorite for a spot
  const toggleFavorite = async (item: Place) => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Sign In Required', 'Please sign in to save favorites.');
      return;
    }

    const compositeKey = `spot-${item.id}`;
    const isFavorited = favoritedItems.has(compositeKey);

    try {
      if (isFavorited) {
        await FavoriteService.removeFavorite(user.uid, 'spot', item.id);
        setFavoritedItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(compositeKey);
          return newSet;
        });
      } else {
        const favoriteData = {
          name: item.name,
          type: 'spot',
          originalId: item.id,
          location: item.location,
          imageUrl: item.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop',
        };
        await FavoriteService.addFavorite(user.uid, favoriteData);
        setFavoritedItems((prev) => {
          const newSet = new Set(prev);
          newSet.add(compositeKey);
          return newSet;
        });
      }
    } catch (error: any) {
      console.error('Favorite operation error:', error);
      Alert.alert('Error', `Could not ${isFavorited ? 'remove' : 'add'} favorite: ${error.message}`);
    }
  };

  // Render each place card
  const renderPlaceItem = ({ item }: { item: Place }) => {
    const compositeKey = `spot-${item.id}`;
    const isFavorited = favoritedItems.has(compositeKey);
    return (
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: '/maps',
            params: { places: JSON.stringify(places), selectedPlaceId: item.id },
          })
        }
        style={styles.card}
      >
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <TouchableOpacity
          style={styles.heartIcon}
          onPress={() => toggleFavorite(item)}
        >
          <Ionicons
            name={isFavorited ? 'heart' : 'heart-outline'}
            size={20}
            color={isFavorited ? 'red' : '#fff'}
          />
        </TouchableOpacity>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
        <View style={styles.ratingPriceRow}>
          <View style={styles.rating}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating || 'N/A'}</Text>
          </View>
          <Text style={styles.priceText}>{item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

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
      <Text style={styles.sectionTitle}>Nearby Restaurants</Text>
      {places.length === 0 ? (
        <Text style={styles.loadingText}>Loading restaurants...</Text>
      ) : (
        <FlatList
          data={places}
          renderItem={renderPlaceItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
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
    paddingBottom: 80,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    width: '48%',
    elevation: 3,
    shadowColor: '#000',
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
  loadingText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FoodScreen;