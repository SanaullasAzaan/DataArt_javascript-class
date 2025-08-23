import React, { useEffect, useMemo, useState } from 'react'
import { Header } from './components/Header'
import { Timeline } from './components/Timeline'
import { EventModal } from './components/EventModal'
import { EventCard } from './components/EventCard'
import { FilterPanel } from './components/FilterPanel'
import type { TimelineEvent } from './types'

export const App: React.FC = () => {
  const [events, setEvents] = useState<TimelineEvent[]>([])
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const response = await fetch('/data/events.json')
        const data: TimelineEvent[] = await response.json()
        if (!cancelled) setEvents(data)
      } catch {
        const fallback: TimelineEvent[] = [
          {
            year: 1977,
            title: 'Introduction of the First Personal Computer',
            description:
              'The first personal computer, introduced in 1977, revolutionized the way people interacted with technology. These early systems were more affordable and accessible to individuals, paving the way for the digital age and transforming various industries.',
            imageURL: '/computer-image.jpg',
            category: 'Technology',
          },
        ]
        if (!cancelled) setEvents(fallback)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const years = useMemo(() => Array.from(new Set(events.map((e) => e.year))).sort((a, b) => a - b), [events])
  const active = selectedEvent ?? events.sort((a, b) => a.year - b.year)[0]

  return (
    <div className="app-shell">
      <Header theme={theme} onToggleTheme={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))} />

      <main className="content">
        <FilterPanel />
        <div className="timeline-and-card">
          <Timeline events={events} years={years} onSelect={setSelectedEvent} />
          {active && <EventCard event={active} onLearnMore={() => setSelectedEvent(active)} />}
        </div>
      </main>

      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  )
}


