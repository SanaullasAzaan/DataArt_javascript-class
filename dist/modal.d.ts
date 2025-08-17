import { Event as TimelineEvent, DOMElements } from './types.js';
export declare class ModalManager {
    private domElements;
    private currentEvent;
    constructor(domElements: DOMElements);
    openModal(event: TimelineEvent): void;
    closeModal(): void;
    private renderModalContent;
    private showModal;
    private hideModal;
    private setupEventListeners;
    getCurrentEvent(): TimelineEvent | null;
}
