import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList, SafeAreaView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { collection, query, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/FirebaseConfig";

interface Favorite {
  id: string;
  name: string;
  type: 'spot' | 'event';
  originalId: string;
  location: string;
  imageUrl: string;
  date?: string;
}

const FavoritesScreen = () => {
  const router = useRouter();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loadingFavorites, setLoadingFavorites] = useState(true);
  const [filterType, setFilterType] = useState<'all' | 'spots' | 'events'>('all');

  // Load favorites when the screen is mounted
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setLoadingFavorites(true);
      const q = query(collection(db, "users", currentUser.uid, "Favourites"));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const favs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setFavorites(favs as Favorite[]);
          setLoadingFavorites(false);
        },
        (error) => {
          alert("Error loading favorites: " + error.message);
          setLoadingFavorites(false);
        }
      );
      return () => {
        unsubscribe();
        setLoadingFavorites(false);
      };
    } else {
      setLoadingFavorites(false);
    }
  }, []);

  // Handle navigation to spot or event details
  const handleFavoritePress = (favorite: Favorite) => {
    if (favorite.type === 'spot') {
      router.push({
        pathname: '/spots/[id]',
        params: { id: favorite.originalId },
      });
    } else {
      router.push(`/events/${favorite.originalId}`);
    }
  };

  // Render a favorite item
  const renderFavorite = ({ item }: { item: Favorite }) => (
    <TouchableOpacity
      style={styles.favoriteCard}
      onPress={() => handleFavoritePress(item)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.favoriteImage} />
      <View style={styles.favoriteContent}>
        <Text style={styles.favoriteName}>{item.name}</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={16} color="#780EBF" />
          <Text style={styles.favoriteLocation}>{item.location}</Text>
        </View>
        {item.type === 'event' && item.date && (
          <Text style={styles.favoriteDate}>{item.date}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  // Filter favorites based on selected type
  const filteredFavorites = filterType === 'all' 
    ? favorites 
    : favorites.filter(fav => fav.type === (filterType === 'spots' ? 'spot' : 'event'));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1B1E28" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saved Favorites</Text>
      </View>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          onPress={() => setFilterType('all')}
          style={[styles.filterButton, filterType === 'all' && styles.selectedFilter]}
        >
          <Text style={[styles.filterText, { color: filterType === 'all' ? 'white' : '#780EBF' }]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilterType('spots')}
          style={[styles.filterButton, filterType === 'spots' && styles.selectedFilter]}
        >
          <Text style={[styles.filterText, { color: filterType === 'spots' ? 'white' : '#780EBF' }]}>Spots</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilterType('events')}
          style={[styles.filterButton, filterType === 'events' && styles.selectedFilter]}
        >
          <Text style={[styles.filterText, { color: filterType === 'events' ? 'white' : '#780EBF' }]}>Events</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        {loadingFavorites ? (
          <ActivityIndicator size="small" color="#780EBF" />
        ) : filteredFavorites.length === 0 ? (
          <Text style={styles.emptyText}>
            {filterType === 'all' ? 'No favorites saved yet' : `No favorite ${filterType} saved yet`}
          </Text>
        ) : (
          <FlatList
            data={filteredFavorites}
            keyExtractor={(item) => item.id}
            renderItem={renderFavorite}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B1E28',
    marginLeft: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#780EBF',
    marginHorizontal: 8,
  },
  selectedFilter: {
    backgroundColor: '#780EBF',
  },
  filterText: {
    fontWeight: 'bold',
  },
  section: {
    flex: 1,
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  favoriteCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  favoriteImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  favoriteContent: {
    flex: 1,
    padding: 12,
  },
  favoriteName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B1E28',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  favoriteLocation: {
    fontSize: 14,
    color: '#444',
    marginLeft: 5,
  },
  favoriteDate: {
    fontSize: 14,
    color: '#780EBF',
  },
});

export default FavoritesScreen;