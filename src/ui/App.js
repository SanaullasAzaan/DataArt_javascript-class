import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import { Header } from './components/Header';
import { Timeline } from './components/Timeline';
import { EventModal } from './components/EventModal';
import { EventCard } from './components/EventCard';
import { FilterPanel } from './components/FilterPanel';
export const App = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [theme, setTheme] = useState(() => (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
    useEffect(() => {
        const root = document.documentElement;
        root.dataset.theme = theme;
    }, [theme]);
    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const response = await fetch('/data/events.json');
                const data = await response.json();
                if (!cancelled)
                    setEvents(data);
            }
            catch {
                const fallback = [
                    {
                        year: 1977,
                        title: 'Introduction of the First Personal Computer',
                        description: 'The first personal computer, introduced in 1977, revolutionized the way people interacted with technology. These early systems were more affordable and accessible to individuals, paving the way for the digital age and transforming various industries.',
                        imageURL: '/computer-image.jpg',
                        category: 'Technology',
                    },
                ];
                if (!cancelled)
                    setEvents(fallback);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);
    const years = useMemo(() => Array.from(new Set(events.map((e) => e.year))).sort((a, b) => a - b), [events]);
    const active = selectedEvent ?? events.sort((a, b) => a.year - b.year)[0];
    return (_jsxs("div", { className: "app-shell", children: [_jsx(Header, { theme: theme, onToggleTheme: () => setTheme((t) => (t === 'light' ? 'dark' : 'light')) }), _jsxs("main", { className: "content", children: [_jsx(FilterPanel, {}), _jsxs("div", { className: "timeline-and-card", children: [_jsx(Timeline, { events: events, years: years, onSelect: setSelectedEvent }), active && _jsx(EventCard, { event: active, onLearnMore: () => setSelectedEvent(active) })] })] }), _jsx(EventModal, { event: selectedEvent, onClose: () => setSelectedEvent(null) })] }));
};
