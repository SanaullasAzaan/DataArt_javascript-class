import React from 'react'
import { EventMarker } from './EventMarker'
import type { TimelineEvent } from '../types'

interface TimelineProps {
  events: TimelineEvent[]
  years: number[]
  onSelect: (event: TimelineEvent) => void
}

export const Timeline: React.FC<TimelineProps> = ({ events, years, onSelect }) => {
  const getEventByYear = (year: number) => events.find((e) => e.year === year)

  const first = [...events].sort((a, b) => a.year - b.year)[0]
  return (
    <nav className="timeline">
      <div className="timeline-line" />
      {years.map((year) => {
        const e = getEventByYear(year)
        const active = e?.year === first?.year
        return (
          <EventMarker
            key={year}
            year={year}
            title={e?.title ?? ''}
            active={active}
            onClick={() => {
              if (e) onSelect(e)
            }}
          />
        )
      })}
    </nav>
  )
}


