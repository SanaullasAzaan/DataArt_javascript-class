import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { EventMarker } from './EventMarker';
export const Timeline = ({ events, years, onSelect }) => {
    const getEventByYear = (year) => events.find((e) => e.year === year);
    const first = [...events].sort((a, b) => a.year - b.year)[0];
    return (_jsxs("nav", { className: "timeline", children: [_jsx("div", { className: "timeline-line" }), years.map((year) => {
                const e = getEventByYear(year);
                const active = e?.year === first?.year;
                return (_jsx(EventMarker, { year: year, title: e?.title ?? '', active: active, onClick: () => {
                        if (e)
                            onSelect(e);
                    } }, year));
            })] }));
};
