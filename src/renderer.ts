import { Event, DOMElements } from './types.js';

export class TimelineRenderer {
  private domElements: DOMElements;

  constructor(domElements: DOMElements) {
    this.domElements = domElements;
  }

  public renderTimeline(events: Event[]): void {
    this.clearTimeline();
    this.createTimelineLine();
    this.createTimelineMarkers(events);
  }

  private clearTimeline(): void {
    const existingYears = this.domElements.timelineContainer.querySelectorAll('.timeline-year');
    existingYears.forEach(year => year.remove());
  }

  private createTimelineLine(): void {
    const timelineLine = document.createElement('div');
    timelineLine.className = 'timeline-line';
    this.domElements.timelineContainer.appendChild(timelineLine);
  }

  private createTimelineMarkers(events: Event[]): void {
    const sortedEvents = [...events].sort((a, b) => a.year - b.year);
    
    sortedEvents.forEach((event) => {
      const yearElement = this.createYearElement(event);
      this.domElements.timelineContainer.appendChild(yearElement);
    });
  }

  private createYearElement(event: Event): HTMLElement {
    const yearElement = document.createElement('div');
    yearElement.className = 'timeline-year';
    yearElement.dataset.year = event.year.toString();
    
    const yearLabel = document.createElement('span');
    yearLabel.className = 'year-label';
    yearLabel.textContent = event.year.toString();
    
    const timelineDot = document.createElement('div');
    timelineDot.className = 'timeline-dot';
    timelineDot.dataset.year = event.year.toString();
    
    yearElement.appendChild(yearLabel);
    yearElement.appendChild(timelineDot);
    
    return yearElement;
  }

  public addTimelineClickHandlers(events: Event[], onEventClick: (event: Event) => void): void {
    const timelineDots = this.domElements.timelineContainer.querySelectorAll('.timeline-dot');
    
    timelineDots.forEach((dot) => {
      const year = parseInt(dot.getAttribute('data-year') || '0', 10);
      const event = events.find(e => e.year === year);
      
      if (event) {
        dot.addEventListener('click', () => onEventClick(event));
      }
    });
  }
}
