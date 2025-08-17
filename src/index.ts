import { Event, DOMElements } from './types.js';
import { EventFetcher } from './fetcher.js';
import { TimelineRenderer } from './renderer.js';
import { ModalManager } from './modal.js';

class TimelineApp {
  private events: Event[] = [];
  private domElements!: DOMElements;
  private renderer!: TimelineRenderer;
  private modalManager!: ModalManager;

  constructor() {
    this.initializeDOMElements();
    this.renderer = new TimelineRenderer(this.domElements);
    this.modalManager = new ModalManager(this.domElements);
    
    // Make modalManager globally accessible for onclick handlers
    (window as any).modalManager = this.modalManager;
  }

  private initializeDOMElements(): void {
    const timelineContainer = document.querySelector('.timeline-container') as HTMLElement;
    const modal = document.getElementById('modal') as HTMLElement;
    const modalContent = document.querySelector('#modal .modal-content') as HTMLElement;

    if (!timelineContainer || !modal || !modalContent) {
      throw new Error('Required DOM elements not found');
    }

    this.domElements = {
      timelineContainer,
      modal,
      modalContent
    };
  }

  private async loadEvents(): Promise<void> {
    try {
      this.events = await EventFetcher.fetchEvents();
    } catch (error) {
      console.error('Failed to load events:', error);
      this.events = [];
    }
  }

  private renderTimeline(): void {
    this.renderer.renderTimeline(this.events);
    this.renderer.addTimelineClickHandlers(this.events, (event: Event) => {
      this.modalManager.openModal(event);
    });
  }

  public async initialize(): Promise<void> {
    await this.loadEvents();
    this.renderTimeline();
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const app = new TimelineApp();
    await app.initialize();
  } catch (error) {
    console.error('Failed to initialize TimelineApp:', error);
  }
});
