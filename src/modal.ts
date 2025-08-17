import { Event as TimelineEvent, DOMElements } from './types.js';

export class ModalManager {
  private domElements: DOMElements;
  private currentEvent: TimelineEvent | null = null;

  constructor(domElements: DOMElements) {
    this.domElements = domElements;
    this.setupEventListeners();
  }

  public openModal(event: TimelineEvent): void {
    this.currentEvent = event;
    this.renderModalContent(event);
    this.showModal();
  }

  public closeModal(): void {
    this.hideModal();
    this.currentEvent = null;
  }

  private renderModalContent(event: TimelineEvent): void {
    this.domElements.modalContent.innerHTML = `
      <div class="modal-header">
        <h2 class="modal-title">
          <span class="event-year">${event.year}</span> ${event.title}
        </h2>
        <button class="modal-close" onclick="window.modalManager.closeModal()">&times;</button>
      </div>
      
      <div class="modal-body">
        <figure class="event-image">
          <img src="${event.imageURL}" alt="${event.title}" onerror="this.src='https://via.placeholder.com/400x250/cccccc/666666?text=Image+Not+Found'">
        </figure>
        
        <div class="event-category">
          <span class="category-badge">${event.category}</span>
        </div>
        
        <p class="event-description">${event.description}</p>
        
        <button class="learn-more-btn" onclick="window.modalManager.closeModal()">Close</button>
      </div>
    `;
  }

  private showModal(): void {
    this.domElements.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  private hideModal(): void {
    this.domElements.modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  private setupEventListeners(): void {
    // Close modal when clicking outside
    this.domElements.modal.addEventListener('click', (e: MouseEvent) => {
      if (e.target === this.domElements.modal) {
        this.closeModal();
      }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.domElements.modal.classList.contains('active')) {
        this.closeModal();
      }
    });
  }

  public getCurrentEvent(): TimelineEvent | null {
    return this.currentEvent;
  }
}
