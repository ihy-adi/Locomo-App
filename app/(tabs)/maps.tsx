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
  const [displayMode, setDisplayMode] = useState<'all' | 'events' | 'spots'>('all');
  const [region, setRegion] = useState({
    latitude: 28.6139, // Default to Delhi
    longitude: 77.2090,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  const events: Event[] = [
    {
      id: '1',
      name: 'Zamna India',
      date: '29 Mar, 4 PM',
      location: 'Gurugram',
      latitude: 28.6980,
      longitude: 77.1325,
      image: "https://images.unsplash.com/photo-1665667283041-5709a0bfc88f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHVycGxlJTIwY29uY2VydHxlbnwwfHwwfHx8MA%3D%3D",
      type: 'event',
    },
    {
      id: '2',
      name: 'Devi: Traditional Indian Art Workshop',
      date: '2 Apr, 1 PM',
      location: 'Pitampura, Delhi',
      latitude: 28.6980,
      longitude: 77.1325,
      image: "https://images.unsplash.com/photo-1569263835889-9e47e06115f2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGV2aSUyMGFydHxlbnwwfHwwfHx8MA%3D%3D",
      type: 'event',
    },
    {
      id: '3',
      name: 'Education Worldwide India Fair',
      date: '5 Apr, 10 AM',
      location: 'Connaught Place, New Delhi',
      latitude: 28.6270,
      longitude: 77.2190,
      image: "https://images.unsplash.com/photo-1557734864-c78b6dfef1b1?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGVkdWNhdGlvbiUyMGZhaXJ8ZW58MHx8MHx8fDA%3D",
      type: 'event',
    },
    {
      id: '4',
      name: 'Mothers Day Run 2025',
      date: '11 May, 6 AM',
      location: 'Dwarka, Delhi',
      latitude: 28.5916,
      longitude: 77.0460,
      image: "https://images.unsplash.com/photo-1719299246434-9fa4f89f61e8?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1vbSUyMG1hcmF0aG9ufGVufDB8fDB8fHww",
      type: 'event',
    },
    {
      id: '5',
      name: 'MachAuto 2025 Expo',
      date: '15 May, 10 AM',
      location: 'Pragati Maidan, New Delhi',
      latitude: 28.6139,
      longitude: 77.2480,
      image: "https://images.unsplash.com/photo-1682591701233-b2dfab9d6424?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNhciUyMGV4aGliaXRpb258ZW58MHx8MHx8fDA%3D",
      type: 'event',
    },
    {
      id: '6',
      name: '59th IHGF Delhi Fair (Spring)',
      date: '16 Apr, 9 AM',
      location: 'Greater Noida',
      latitude: 28.4618,
      longitude: 77.5001,
      image: "https://images.unsplash.com/photo-1703439524413-5ac9e2059f8b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAwfHxjYXJnaXZhbCUyMGRlbGhpfGVufDB8fDB8fHww",
      type: 'event',
    },
  ];

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

      <View style={styles.toggleContainer}>
        <TouchableOpacity
          onPress={() => setDisplayMode('all')}
          style={[styles.toggleButton, displayMode === 'all' && styles.activeToggle]}
        >
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setDisplayMode('events')}
          style={[styles.toggleButton, displayMode === 'events' && styles.activeToggle]}
        >
          <Text>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setDisplayMode('spots')}
          style={[styles.toggleButton, displayMode === 'spots' && styles.activeToggle]}
        >
          <Text>Spots</Text>
        </TouchableOpacity>
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
          {(displayMode === 'all' || displayMode === 'spots') && restaurants.map((place) => (
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
          {(displayMode === 'all' || displayMode === 'events') && events.map((event) => (
            <Marker
              key={event.id}
              coordinate={{
                latitude: event.latitude,
                longitude: event.longitude,
              }}
              title={event.name}
              description={`Date: ${event.date} | ${event.location}`}
              pinColor="#a430cf"
            />
          ))}
          {selectedPlace && (
            <Marker
              coordinate={{
                latitude: selectedPlace.latitude,
                longitude: selectedPlace.longitude,
              }}
              title={selectedPlace.name}
              pinColor="red"
            />
          )}
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
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginVertical: 10,
  },
  toggleButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  activeToggle: {
    backgroundColor: '#780EBF',
    color: '#fff',
    borderColor: '#780EBF',
  },
  mapContainer: {
    width: "90%",
    height: "70%",
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