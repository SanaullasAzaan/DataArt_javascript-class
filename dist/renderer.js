export class TimelineRenderer {
    constructor(domElements) {
        this.domElements = domElements;
    }
    renderTimeline(events) {
        this.clearTimeline();
        this.createTimelineLine();
        this.createTimelineMarkers(events);
    }
    clearTimeline() {
        const existingYears = this.domElements.timelineContainer.querySelectorAll('.timeline-year');
        existingYears.forEach(year => year.remove());
    }
    createTimelineLine() {
        const timelineLine = document.createElement('div');
        timelineLine.className = 'timeline-line';
        this.domElements.timelineContainer.appendChild(timelineLine);
    }
    createTimelineMarkers(events) {
        const sortedEvents = [...events].sort((a, b) => a.year - b.year);
        sortedEvents.forEach((event) => {
            const yearElement = this.createYearElement(event);
            this.domElements.timelineContainer.appendChild(yearElement);
        });
    }
    createYearElement(event) {
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
    addTimelineClickHandlers(events, onEventClick) {
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
//# sourceMappingURL=renderer.js.map