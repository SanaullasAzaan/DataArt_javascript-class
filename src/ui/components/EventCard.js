import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const EventCard = ({ event, onLearnMore }) => {
    return (_jsxs("article", { className: "event-card", children: [_jsxs("h1", { className: "event-title", children: [_jsx("span", { className: "event-year", children: event.year }), " ", event.title] }), _jsx("figure", { className: "event-image", children: _jsx("img", { src: event.imageURL, alt: event.title, onClick: onLearnMore, style: { cursor: 'pointer' }, onError: (e) => ((e.currentTarget.src = 'https://via.placeholder.com/800x500/cccccc/666666?text=Image+Not+Found')) }) }), _jsx("p", { className: "event-description", children: event.description }), _jsx("button", { className: "learn-more-btn", onClick: onLearnMore, children: "Learn More" })] }));
};
