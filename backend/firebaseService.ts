// src/services/firebaseService.ts
import { db } from '@/FirebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { SavedEvent, Event } from '@/app/types/event';

export const saveEvent = async (userId: string, event: Event) => {
  try {
    const savedEvent: SavedEvent = {
      userId,
      eventId: event.id,
      event,
    };
    await addDoc(collection(db, 'savedEvents'), savedEvent);
    console.log('Event saved successfully');
  } catch (error) {
    console.error('Error saving event:', error);
  }
};

export const getSavedEvents = async (userId: string): Promise<SavedEvent[]> => {
  try {
    const q = query(collection(db, 'savedEvents'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const savedEvents: SavedEvent[] = [];
    querySnapshot.forEach((doc) => {
      savedEvents.push(doc.data() as SavedEvent);
    });
    return savedEvents;
  } catch (error) {
    console.error('Error fetching saved events:', error);
    return [];
  }
};