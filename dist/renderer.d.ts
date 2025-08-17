import { Event, DOMElements } from './types.js';
export declare class TimelineRenderer {
    private domElements;
    constructor(domElements: DOMElements);
    renderTimeline(events: Event[]): void;
    private clearTimeline;
    private createTimelineLine;
    private createTimelineMarkers;
    private createYearElement;
    addTimelineClickHandlers(events: Event[], onEventClick: (event: Event) => void): void;
}
