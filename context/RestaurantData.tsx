import React, { createContext, useState, useEffect, useContext } from 'react';
import * as Location from 'expo-location';
import Constants from 'expo-constants';

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

interface RestaurantContextType {
  places: Place[];
  loading: boolean;
  error?: string;
}

const RestaurantContext = createContext<RestaurantContextType>({ places: [], loading: true });

const GOOGLE_API_KEY = Constants.expoConfig?.extra?.googleMapsApiKey || '';

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Location permission denied. Please enable location services to fetch nearby restaurants.');
          setLoading(false);
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});

        if (!GOOGLE_API_KEY) {
          setError('Google API key is missing. Please configure it in expoConfig.extra.googleMapsApiKey.');
          setLoading(false);
          return;
        }

        let allPlaces: Place[] = [];
        let nextPageToken: string | undefined = undefined;
        const maxPages = 3;

        for (let page = 0; page < maxPages; page++) {
          const url = nextPageToken
            ? `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${nextPageToken}&key=${GOOGLE_API_KEY}`
            : `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${currentLocation.coords.latitude},${currentLocation.coords.longitude}&radius=5000&type=restaurant&key=${GOOGLE_API_KEY}`;

          const response = await fetch(url);
          const data: {
            status: string;
            results: Array<{
              place_id: string;
              name: string;
              vicinity: string;
              rating?: number;
              price_level?: number;
              photos?: Array<{ photo_reference: string }>;
              geometry: { location: { lat: number; lng: number } };
            }>;
            next_page_token?: string;
            error_message?: string;
          } = await response.json();

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
            setError(`Places API error: ${data.status} - ${data.error_message || 'Unknown error'}`);
            break;
          }
        }
      } catch (error) {
        setError(`Error fetching data: ${(error as Error).message}`);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <RestaurantContext.Provider value={{ places, loading, error }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurants = () => useContext(RestaurantContext);