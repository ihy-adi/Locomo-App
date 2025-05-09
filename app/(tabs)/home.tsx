import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { collection, query, getDocs, where, onSnapshot } from 'firebase/firestore';
import { auth, db } from '@/FirebaseConfig';
import { FavoriteService } from '@/app/services/firestore-services';
import { useRestaurants } from '../../context/RestaurantData';
import zamnaImg from 'assets/images/zamna.jpg';
import marathonImg from '../assets/images/marathon.jpg';
import deviImg from '../assets/images/devi.jpg';
import autoexpoImg from '../assets/images/autoexpo.jpg';
import edufairImg from '../../assets/images/edufair.jpg';
import fairImg from '../assets/images/fair.jpg';


interface Spot {
  id: string;
  name: string;
  location: string;
  image: string;
  type: 'spot';
}

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  latitude: number;
  longitude: number;
  image: string;
  type: 'event';
}

// Sample data for Events
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

const App: React.FC = () => {
  const router = useRouter();
  const [favoritedItems, setFavoritedItems] = useState<Set<string>>(new Set());
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const [userName, setUserName] = useState<string>(""); // State to store user's name
  const { places, loading, error } = useRestaurants() as {
    places: { id: string; name: string; location: string; image?: string; rating: number }[];
    loading: boolean;
    error: string | null;
  };

  // Get top 5 restaurants by rating
  const trendingSpots: Spot[] = places
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5)
    .map((place) => ({
      id: place.id,
      name: place.name,
      location: place.location,
      image: place.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop',
      type: 'spot',
    }));

  // Get the greeting based on time of day
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    
    if (currentHour >= 5 && currentHour < 12) {
      return "Good morning!!";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good afternoon!!";
    } else {
      return "Good evening!!";
    }
  };

  // Subscribe to auth state and favorites
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        // Get user profile to retrieve displayName
        const userDocRef = collection(db, 'users', user.uid, 'profile');
        getDocs(userDocRef).then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setUserName(userData.displayName || user.displayName || "");
          } else {
            // If no profile document exists, use the displayName from auth
            setUserName(user.displayName || "");
          }
        });

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
            Alert.alert('Error', 'Could not load favorites');
            setLoadingFavorites(false);
          }
        );
        return unsubscribeSnapshot;
      }
    });
    return () => unsubscribeAuth();
  }, []);

  // Toggle favorite
  const toggleFavorite = async (item: Spot | Event) => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Please sign in to save favorites');
      return;
    }

    const compositeKey = `${item.type}-${item.id}`;
    const isFavorited = favoritedItems.has(compositeKey);

    try {
      if (isFavorited) {
        await FavoriteService.removeFavorite(user.uid, item.type, item.id);
        setFavoritedItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(compositeKey);
          return newSet;
        });
      } else {
        const favoriteData = {
          name: item.name,
          type: item.type,
          originalId: item.id,
          location: item.location,
          imageUrl: item.image,
          ...(item.type === 'event' && { date: (item as Event).date }),
        };
        await FavoriteService.addFavorite(user.uid, favoriteData);
        setFavoritedItems((prev) => {
          const newSet = new Set(prev);
          newSet.add(compositeKey);
          return newSet;
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Could not update favorite');
      console.error('Favorite error:', error);
    }
  };

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
    <TouchableOpacity style={styles.spotCard} onPress={() => handleSpotPress(item.id)} activeOpacity={0.8}>
      <Image source={{ uri: item.image }} style={styles.spotImage} />
      <Text style={styles.spotName}>{item.name}</Text>
      <Text style={styles.spotLocation}>{item.location}</Text>
      <TouchableOpacity onPress={() => toggleFavorite(item)}>
        <Ionicons
          name={favoritedItems.has(`${item.type}-${item.id}`) ? 'heart' : 'heart-outline'}
          size={24}
          color={favoritedItems.has(`${item.type}-${item.id}`) ? 'red' : 'gray'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  // Render an event item
  const renderEvent = ({ item }: { item: Event }) => (
    <TouchableOpacity style={styles.eventCard} onPress={() => handleEventPress(item.id)} activeOpacity={0.8}>
      <Image source={{ uri: item.image }} style={styles.eventImage} />
      <View style={styles.eventDetails}>
        <Text style={styles.eventDate}>{item.date}</Text>
        <Text style={styles.eventName}>{item.name}</Text>
        <Text style={styles.eventLocation}>{item.location}</Text>
      </View>
      <TouchableOpacity onPress={() => toggleFavorite(item)}>
        <Ionicons
          name={favoritedItems.has(`${item.type}-${item.id}`) ? 'heart' : 'heart-outline'}
          size={24}
          color={favoritedItems.has(`${item.type}-${item.id}`) ? '#780EBF' : 'gray'}
        />
      </TouchableOpacity>
      <Ionicons name="chevron-forward" size={24} color="gray" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Greeting with User's Name (replacing search bar) */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>{getGreeting()} {userName || "User"}</Text>
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
            <View key={event.id}>{renderEvent({ item: event })}</View>
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
  greetingContainer: {
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9c28eb', // Purple color to match your app theme
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