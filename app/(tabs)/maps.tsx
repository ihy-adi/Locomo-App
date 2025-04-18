import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text, TouchableOpacity, Linking } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Constants from "expo-constants";
import SearchInput from "../../components/SearchInput";
import { useLocalSearchParams } from 'expo-router';

const GOOGLE_API_KEY = Constants.expoConfig?.extra?.googleMapsApiKey || "";

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

const MapsScreen: React.FC = () => {
  const { places: placesParam, selectedPlaceId } = useLocalSearchParams();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<{
    latitude: number;
    longitude: number;
    name: string;
  } | null>(null);
  const [restaurants, setRestaurants] = useState<Place[]>(placesParam ? JSON.parse(placesParam as string) : []);
  const [region, setRegion] = useState({
    latitude: 28.6139, // Default to Delhi
    longitude: 77.2090,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  // Fetch user location and nearby restaurants
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Location permission denied");
          return;
        }
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        setRegion({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });

        // Fetch nearby restaurants if none were passed via params
        if (!placesParam && GOOGLE_API_KEY) {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?` +
            `location=${currentLocation.coords.latitude},${currentLocation.coords.longitude}` +
            `&radius=5000&type=restaurant&key=${GOOGLE_API_KEY}`
          );
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
            setRestaurants(fetchedPlaces);
          } else {
            console.error('Places API error:', data.status, data.error_message || 'Unknown error');
          }
        }

        // If a restaurant is selected, center on it
        if (selectedPlaceId && restaurants.length > 0) {
          const selected = restaurants.find((place) => place.id === selectedPlaceId);
          if (selected) {
            setSelectedPlace({
              latitude: selected.latitude,
              longitude: selected.longitude,
              name: selected.name,
            });
            setRegion({
              latitude: selected.latitude,
              longitude: selected.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching location or places:", error);
      }
    })();
  }, [selectedPlaceId, placesParam, restaurants.length]);

  // Fetch autocomplete suggestions
  useEffect(() => {
    if (searchText.length < 3 || !GOOGLE_API_KEY) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
            searchText
          )}&key=${GOOGLE_API_KEY}&language=en`
        );
        const data = await response.json();
        if (data.status === "OK") {
          setSuggestions(data.predictions);
        } else {
          console.error("Autocomplete error:", data.status, data.error_message || "Unknown error");
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [searchText]);

  // Handle suggestion selection
  const handleSelectSuggestion = async (placeId: string, description: string) => {
    if (!GOOGLE_API_KEY) {
      console.error("Cannot fetch place details: API key missing");
      return;
    }
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry,name&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();
      if (data.status === "OK") {
        const { lat, lng } = data.result.geometry.location;
        setSelectedPlace({
          latitude: lat,
          longitude: lng,
          name: description,
        });
        setRegion({
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });
        setSearchText(description);
        setSuggestions([]);
      } else {
        console.error("Place details error:", data.status, data.error_message || "Unknown error");
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  // Function to open Google Maps
  const handleOpenInGoogleMaps = () => {
    if (!selectedPlace) return;

    const url = `https://www.google.com/maps/search/?api=1&query=${selectedPlace.latitude},${selectedPlace.longitude}`;
    
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    }).catch(err => {
      console.error("An error occurred", err);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchInput
          value={searchText}
          placeholder="Search location..."
          handleChangeText={setSearchText}
        />
        {suggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            <FlatList
              data={suggestions}
              keyExtractor={(item) => item.place_id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.suggestionItem}
                  onPress={() => handleSelectSuggestion(item.place_id, item.description)}
                >
                  <Text style={styles.suggestionText}>{item.description}</Text>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </View>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={region}
          showsUserLocation={true}
        >
          {location && (
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="You"
            />
          )}
          {selectedPlace && (
            <Marker
              coordinate={{
                latitude: selectedPlace.latitude,
                longitude: selectedPlace.longitude,
              }}
              title={selectedPlace.name}
              pinColor="blue"
            />
          )}
          {restaurants.map((place) => (
            <Marker
              key={place.id}
              coordinate={{
                latitude: place.latitude,
                longitude: place.longitude,
              }}
              title={place.name}
              description={`Rating: ${place.rating || 'N/A'} | ${place.location}`}
              pinColor="green"
            />
          ))}
        </MapView>

        {selectedPlace && (
          <TouchableOpacity 
            style={styles.openMapsButton}
            onPress={handleOpenInGoogleMaps}
          >
            <Text style={styles.openMapsButtonText}>Open in Google Maps</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },
  searchContainer: {
    width: "90%",
    marginBottom: 10,
    marginTop: 15,
  },
  suggestionsContainer: {
    maxHeight: 200,
    width: "88%",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 5,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  suggestionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  suggestionText: {
    fontSize: 14,
    color: "#000",
  },
  mapContainer: {
    width: "90%",
    height: "78%",
    backgroundColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  openMapsButton: {
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    width: '90%',
  },
  openMapsButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MapsScreen;