export interface Event {
    year: number;
    title: string;
    description: string;
    imageURL: string;
    category: string;
}
export interface TimelineState {
    events: Event[];
    currentEvent: Event | null;
}
export interface DOMElements {
    timelineContainer: HTMLElement;
    modal: HTMLElement;
    modalContent: HTMLElement;
}
export type Category = 'Historical' | 'Technology' | 'Cultural' | 'Economic' | 'Military';
