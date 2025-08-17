export class ModalManager {
    constructor(domElements) {
        this.currentEvent = null;
        this.domElements = domElements;
        this.setupEventListeners();
    }
    openModal(event) {
        this.currentEvent = event;
        this.renderModalContent(event);
        this.showModal();
    }
    closeModal() {
        this.hideModal();
        this.currentEvent = null;
    }
    renderModalContent(event) {
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
    showModal() {
        this.domElements.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    hideModal() {
        this.domElements.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    setupEventListeners() {
        // Close modal when clicking outside
        this.domElements.modal.addEventListener('click', (e) => {
            if (e.target === this.domElements.modal) {
                this.closeModal();
            }
        });
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.domElements.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }
    getCurrentEvent() {
        return this.currentEvent;
    }
}
//# sourceMappingURL=modal.js.map