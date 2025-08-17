import { Event } from './types.js';

const FALLBACK_EVENTS: Event[] = [
  {
    year: 1977,
    title: "Introduction of the First Personal Computer",
    description: "The first personal computer, introduced in 1977, revolutionized the way people interacted with technology. These early systems were more affordable and accessible to individuals, paving the way for the digital age and transforming various industries.",
    imageURL: "computer-image.jpg",
    category: "Technology"
  }
];

export class EventFetcher {
  private static async fetchFromAPI(): Promise<Event[]> {
    try {
      const response = await fetch('data/events.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }

  public static async fetchEvents(): Promise<Event[]> {
    try {
      return await this.fetchFromAPI();
    } catch (error) {
      console.warn('Using fallback data due to fetch error');
      return FALLBACK_EVENTS;
    }
  }
}
