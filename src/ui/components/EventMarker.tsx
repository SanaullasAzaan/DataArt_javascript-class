import React from 'react'

interface EventMarkerProps {
  year: number
  title: string
  onClick: () => void
  active?: boolean
}

export const EventMarker: React.FC<EventMarkerProps> = ({ year, title, onClick, active }) => {
  return (
    <div className={`timeline-year ${active ? 'active' : ''}`} data-year={year}>
      <span className="year-label">{year}</span>
      <button className={`timeline-dot ${active ? 'active' : ''}`} aria-label={`${year} ${title}`} onClick={onClick} />
    </div>
  )
}


