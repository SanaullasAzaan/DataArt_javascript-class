import { Event } from './types.js';
export declare class EventFetcher {
    private static fetchFromAPI;
    static fetchEvents(): Promise<Event[]>;
}
