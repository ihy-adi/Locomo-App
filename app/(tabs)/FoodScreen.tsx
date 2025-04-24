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

        if (GOOGLE_API_KEY) {
          let allPlaces: Place[] = [];
          let nextPageToken: string | undefined = undefined;
          const maxPages = 3;

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
              setPlaces(allPlaces);
              nextPageToken = data.next_page_token;
              if (!nextPageToken || page === maxPages - 1) break;
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
        <Text style={styles.cardTitle}>{item.name}</Text>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
        <View style={styles.ratingPriceRow}>
          <Text style={styles.priceText}>{item.price}</Text>
          <TouchableOpacity
            style={styles.heartIcon}
            onPress={() => toggleFavorite(item)}
          >
            <Ionicons
              name={isFavorited ? 'heart' : 'heart-outline'}
              size={20}
              color={isFavorited ? '#780EBF' : '#999'}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Food</Text>
      </View>

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
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  loadingText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#666',
  },
  listContent: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
    width: '48%',
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#333',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 13,
    color: '#666',
  },
  ratingPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  priceText: {
    fontSize: 13,
    color: '#444',
  },
  heartIcon: {
    padding: 4,
  },
});

export default FoodScreen;
