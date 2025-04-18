import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const eventsData = [
  { 
    id: '1', 
    name: 'Zamna India', 
    date: '29 Mar, 4 PM', 
    location: 'Gurugram', 
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=2070&auto=format&fit=crop',
    description: "Zamna India presents an immersive musical experience featuring top electronic music artists from around the world. Join us for an unforgettable day of music, art, and community in the heart of Gurugram.",
    organizer: 'Zamna Events',
    ticketPrice: '₹1500 onwards',
    attendees: '2.5K+'
  },
  { 
    id: '2', 
    name: 'NH7 Weekender', 
    date: '29 Mar, 5 PM', 
    location: 'Noida', 
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=2070&auto=format&fit=crop',
    description: "India's happiest music festival is back! NH7 Weekender brings together the best of indie music, rock, folk, and electronic artists on multiple stages for a weekend of musical discovery and celebration.",
    organizer: 'OML Entertainment',
    ticketPrice: '₹2500 onwards',
    attendees: '5K+'
  },
  { 
    id: '3', 
    name: 'World Class Festival 2025', 
    date: '12 Apr, 4 PM', 
    location: 'Gurugram', 
    image: 'https://images.unsplash.com/photo-1533174072545-2d4f9d5e0425?q=80&w=2070&auto=format&fit=crop',
    description: "World Class Festival 2025 brings together international and local artists for a celebration of music, art, and culture. Experience world-class performances in a stunning venue.",
    organizer: 'World Class Events',
    ticketPrice: '₹3000 onwards',
    attendees: '3K+'
  },
  { 
    id: '4', 
    name: 'SMAAASH FC-25 Championship', 
    date: '1 May - 31 May, 11 AM', 
    location: 'Dwarka', 
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
    description: "SMAAASH FC-25 Championship is the ultimate gaming tournament for football enthusiasts. Compete against the best players in the region and win exciting prizes.",
    organizer: 'SMAAASH Entertainment',
    ticketPrice: '₹500 entry fee',
    attendees: '1K+'
  },
  { 
    id: '5', 
    name: 'Sitar for Mental Health by Rishabh Rikhiram Sharma', 
    date: '6 Apr, 7 PM', 
    location: 'Delhi', 
    image: 'https://images.unsplash.com/photo-1610890684870-0a0b4e4a87e5?q=80&w=2070&auto=format&fit=crop',
    description: "Join sitar maestro Rishabh Rikhiram Sharma for an evening of classical music dedicated to raising awareness about mental health. A portion of the proceeds will be donated to mental health organizations.",
    organizer: 'Mental Health Foundation',
    ticketPrice: '₹1000 onwards',
    attendees: '500+'
  },
  { 
    id: '6', 
    name: 'Aadyam Theatre presents Saanp Seedhi', 
    date: '29 Mar - 30 Mar, 7:30 PM', 
    location: 'Delhi', 
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2070&auto=format&fit=crop',
    description: "Aadyam Theatre brings you Saanp Seedhi, a powerful play that explores the complexities of human relationships and social dynamics. Directed by a renowned theater personality with an ensemble cast of talented actors.",
    organizer: 'Aadyam Theatre',
    ticketPrice: '₹800 onwards',
    attendees: '300+ per show'
  }
];

const EventDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  const eventData = eventsData.find(event => event.id === id);
  
  if (!eventData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{"Event Details"}</Text>
          <View style={{width: 24}} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.errorText}>{"Event not found"}</Text>
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
        <Text style={styles.headerTitle}>{"Event Details"}</Text>
        <View style={{width: 24}} />
      </View>
      
      <ScrollView style={styles.scrollView}>
        <Image source={{ uri: eventData.image }} style={styles.eventImage} />
        
        <View style={styles.contentContainer}>
          <Text style={styles.eventName}>{eventData.name}</Text>
          <Text style={styles.eventDate}>{eventData.date}</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={18} color="#780EBF" />
            <Text style={styles.eventLocation}>{eventData.location}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <Text style={styles.sectionTitle}>{"About Event"}</Text>
          <Text style={styles.description}>{eventData.description}</Text>
          
          <View style={styles.divider} />
          
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>{"Organizer"}</Text>
              <Text style={styles.infoValue}>{eventData.organizer}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>{"Tickets"}</Text>
              <Text style={styles.infoValue}>{eventData.ticketPrice}</Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>{"Attendees"}</Text>
              <Text style={styles.infoValue}>{eventData.attendees}</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>{"Book Tickets"}</Text>
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
  eventImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 20,
  },
  eventName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 16,
    color: '#780EBF',
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventLocation: {
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
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  bookButton: {
    backgroundColor: '#780EBF',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  bookButtonText: {
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

export default EventDetails;