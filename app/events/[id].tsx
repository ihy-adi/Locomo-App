import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const eventsData = [
  {
    id: '1',
    name: 'Zamna India',
    date: '29 Mar, 4 PM',
    location: 'Gurugram',
    latitude: 28.6980,
    longitude: 77.1325,
    image : "https://images.unsplash.com/photo-1665667283041-5709a0bfc88f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHVycGxlJTIwY29uY2VydHxlbnwwfHwwfHx8MA%3D%3D",
    type: 'event',
    description: 'A vibrant cultural festival showcasing Indian heritage and traditions with live music, dance performances, and authentic cuisine.',
    organizer: 'Zamna Events Co.',
    ticketPrice: '₹500',
    attendees: '1500',
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
    description: 'Hands-on workshop led by expert artists to learn Madhubani and Warli painting techniques.',
    organizer: 'Artisans Guild Delhi',
    ticketPrice: '₹1,200',
    attendees: '50',
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
    description: 'An expo connecting students with top universities worldwide, featuring seminars, counselling sessions, and scholarship info.',
    organizer: 'EduWorld Consultants',
    ticketPrice: 'Free',
    attendees: '2000',
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
    description: 'A 5K fun run to celebrate mothers, open for families, includes medal for participants and post-run brunch.',
    organizer: 'RunForGood Foundation',
    ticketPrice: '₹300 per participant',
    attendees: '800',
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
    description: 'India\'s premier automobile expo showcasing the latest in automotive tech, electric vehicles, and interactive demos.',
    organizer: 'AutoExpo India',
    ticketPrice: '₹1,000',
    attendees: '5000',
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
    description: 'Leading trade fair for handicrafts, home decor, and lifestyle products with global exhibitors and buyers.',
    organizer: 'IHGF Federation',
    ticketPrice: '₹200',
    attendees: '10000',
  },
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
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  scrollView: { flex: 1 },
  eventImage: { width: '100%', height: 250, resizeMode: 'cover' },
  contentContainer: { padding: 20 },
  eventName: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  eventDate: { fontSize: 16, color: '#780EBF', marginBottom: 10 },
  locationContainer: { flexDirection: 'row', alignItems: 'center' },
  eventLocation: { fontSize: 16, color: '#444', marginLeft: 5 },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  description: { fontSize: 16, lineHeight: 24, color: '#444' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  infoItem: { flex: 1 },
  infoLabel: { fontSize: 14, color: '#777', marginBottom: 5 },
  infoValue: { fontSize: 16, fontWeight: '600' },
  bookButton: { backgroundColor: '#780EBF', borderRadius: 12, paddingVertical: 15, alignItems: 'center', marginTop: 20 },
  bookButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  errorText: { fontSize: 18, textAlign: 'center', marginTop: 20 },
});

export default EventDetails;
