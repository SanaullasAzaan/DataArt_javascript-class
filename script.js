// Global variables
let events = [];
let currentEvent = null;

// DOM elements
const timelineContainer = document.querySelector('.timeline-container');
const modal = document.getElementById('modal');
const modalContent = document.querySelector('#modal .modal-content');

// Fetch events from JSON file
async function fetchEvents() {
    try {
        const response = await fetch('data/events.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        events = await response.json();
        renderTimeline();
    } catch (error) {
        console.error('Error fetching events:', error);
        // Fallback to sample data if fetch fails
        events = [
            {
                "year": 1977,
                "title": "Introduction of the First Personal Computer",
                "description": "The first personal computer, introduced in 1977, revolutionized the way people interacted with technology. These early systems were more affordable and accessible to individuals, paving the way for the digital age and transforming various industries.",
                "imageURL": "computer-image.jpg",
                "category": "Technology"
            }
        ];
        renderTimeline();
    }
}

// Render timeline with event markers
function renderTimeline() {
    // Clear existing timeline years
    const existingYears = timelineContainer.querySelectorAll('.timeline-year');
    existingYears.forEach(year => year.remove());
    
    // Create timeline line
    const timelineLine = document.createElement('div');
    timelineLine.className = 'timeline-line';
    timelineContainer.appendChild(timelineLine);
    
    // Sort events by year
    const sortedEvents = [...events].sort((a, b) => a.year - b.year);
    
    // Create timeline markers for each event
    sortedEvents.forEach((event, index) => {
        const yearElement = document.createElement('div');
        yearElement.className = 'timeline-year';
        yearElement.dataset.year = event.year;
        
        const yearLabel = document.createElement('span');
        yearLabel.className = 'year-label';
        yearLabel.textContent = event.year;
        
        const timelineDot = document.createElement('div');
        timelineDot.className = 'timeline-dot';
        timelineDot.dataset.year = event.year;
        
        // Add click event to timeline dot
        timelineDot.addEventListener('click', () => openModal(event));
        
        yearElement.appendChild(yearLabel);
        yearElement.appendChild(timelineDot);
        timelineContainer.appendChild(yearElement);
    });
}

// Open modal with event details
function openModal(event) {
    currentEvent = event;
    
    // Create modal content
    modalContent.innerHTML = `
        <div class="modal-header">
            <h2 class="modal-title">
                <span class="event-year">${event.year}</span> ${event.title}
            </h2>
            <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        
        <div class="modal-body">
            <figure class="event-image">
                <img src="${event.imageURL}" alt="${event.title}" onerror="this.src='https://via.placeholder.com/400x250/cccccc/666666?text=Image+Not+Found'">
            </figure>
            
            <div class="event-category">
                <span class="category-badge">${event.category}</span>
            </div>
            
            <p class="event-description">${event.description}</p>
            
            <button class="learn-more-btn" onclick="closeModal()">Close</button>
        </div>
    `;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentEvent = null;
}

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    fetchEvents();
});
