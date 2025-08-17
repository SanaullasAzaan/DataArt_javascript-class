import { EventFetcher } from './fetcher.js';
import { TimelineRenderer } from './renderer.js';
import { ModalManager } from './modal.js';
class TimelineApp {
    constructor() {
        this.events = [];
        this.initializeDOMElements();
        this.renderer = new TimelineRenderer(this.domElements);
        this.modalManager = new ModalManager(this.domElements);
        // Make modalManager globally accessible for onclick handlers
        window.modalManager = this.modalManager;
    }
    initializeDOMElements() {
        const timelineContainer = document.querySelector('.timeline-container');
        const modal = document.getElementById('modal');
        const modalContent = document.querySelector('#modal .modal-content');
        if (!timelineContainer || !modal || !modalContent) {
            throw new Error('Required DOM elements not found');
        }
        this.domElements = {
            timelineContainer,
            modal,
            modalContent
        };
    }
    async loadEvents() {
        try {
            this.events = await EventFetcher.fetchEvents();
        }
        catch (error) {
            console.error('Failed to load events:', error);
            this.events = [];
        }
    }
    renderTimeline() {
        this.renderer.renderTimeline(this.events);
        this.renderer.addTimelineClickHandlers(this.events, (event) => {
            this.modalManager.openModal(event);
        });
    }
    async initialize() {
        await this.loadEvents();
        this.renderTimeline();
    }
}
// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const app = new TimelineApp();
        await app.initialize();
    }
    catch (error) {
        console.error('Failed to initialize TimelineApp:', error);
    }
});
//# sourceMappingURL=index.js.map