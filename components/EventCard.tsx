// src/components/EventCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Event } from '../app/types/event';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For icons

interface EventCardProps {
  event: Event;
  onSave: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onSave }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <View style={styles.card}>
      <Text style={styles.date}>{formatDate(event.startTime)}</Text>
      <Text style={styles.title}>{event.name}</Text>
      <View style={styles.details}>
        <Icon name="location-on" size={16} color="#666" />
        <Text style={styles.venue}>{event.venue}</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.rating}>
          <Icon name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{event.rating}</Text>
        </View>
        <View style={styles.attendees}>
          <Icon name="group" size={16} color="#666" />
          <Text style={styles.attendeesText}>{event.attendees}</Text>
        </View>
        <TouchableOpacity onPress={onSave} style={styles.saveButton}>
          <Icon name="bookmark-border" size={20} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  venue: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  attendees: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeesText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  saveButton: {
    padding: 4,
  },
});

export default EventCard;