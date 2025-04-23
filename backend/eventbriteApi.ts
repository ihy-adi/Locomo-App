// src/services/eventbriteApi.ts
import axios from 'axios';
import { Event } from '../app/types/event';

const EVENTBRITE_PRIVATE_TOKEN = 'FZDCCLEW2K3FYBWR462P'; // Replace with valid token
const BASE_URL = 'https://www.eventbriteapi.com/v3';

export const fetchEvents = async (location: string = 'Delhi'): Promise<Event[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/events/search`, {
      headers: {
        Authorization: `Bearer ${EVENTBRITE_PRIVATE_TOKEN}`,
      },
      params: {
        'location.address': location,
        q: 'events', // Required parameter
      },
    });

    const events: Event[] = response.data.events.map((event: any) => ({
      id: event.id,
      name: event.name.text,
      venue: event.venue?.name || 'TBD',
      startTime: event.start.local,
      rating: 4.7,
      attendees: 50,
    }));

    return events;
  } catch (error: any) {
    console.error('Error:', error.response?.data || error.message);
    return [];
  }
};