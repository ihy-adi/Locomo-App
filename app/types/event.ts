// src/types/event.ts
export interface Event {
    id: string;
    name: string;
    venue: string;
    startTime: string;
    rating: number;
    attendees: number;
  }
  
  export interface SavedEvent {
    userId: string;
    eventId: string;
    event: Event;
  }
export default Event;