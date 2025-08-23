import React from 'react'
import type { TimelineEvent } from '../types'

interface EventCardProps {
  event: TimelineEvent
  onLearnMore: () => void
}

export const EventCard: React.FC<EventCardProps> = ({ event, onLearnMore }) => {
  return (
    <article className="event-card">
      <h1 className="event-title">
        <span className="event-year">{event.year}</span> {event.title}
      </h1>
      <figure className="event-image">
        <img
          src={event.imageURL}
          alt={event.title}
          onClick={onLearnMore}
          style={{ cursor: 'pointer' }}
          onError={(e) => ((e.currentTarget.src = 'https://via.placeholder.com/800x500/cccccc/666666?text=Image+Not+Found'))}
        />
      </figure>
      <p className="event-description">{event.description}</p>
      <button className="learn-more-btn" onClick={onLearnMore}>
        Learn More
      </button>
    </article>
  )
}


