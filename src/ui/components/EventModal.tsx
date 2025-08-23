import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import type { TimelineEvent } from '../types'

interface EventModalProps {
  event: TimelineEvent | null
  onClose: () => void
}

export const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = event ? 'hidden' : 'auto'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = 'auto'
    }
  }, [event, onClose])

  if (!event) return null

  const modalRoot = document.getElementById('root') as HTMLElement

  const content = (
    <div className="modal active" onClick={(e) => e.currentTarget === e.target && onClose()}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">
            <span className="event-year">{event.year}</span> {event.title}
          </h2>
          <button className="modal-close" aria-label="Close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <figure className="event-image">
            <img src={event.imageURL} alt={event.title} onError={(e) => ((e.currentTarget.src = 'https://via.placeholder.com/400x250/cccccc/666666?text=Image+Not+Found'))} />
          </figure>
          <div className="event-category">
            <span className="category-badge">{event.category}</span>
          </div>
          <p className="event-description">{event.description}</p>
          <div className="modal-actions">
            <button className="back-btn" onClick={onClose}>Back</button>
          </div>
        </div>
      </div>
    </div>
  )

  return ReactDOM.createPortal(content, modalRoot)
}


