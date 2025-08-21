import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const EventMarker = ({ year, title, onClick, active }) => {
    return (_jsxs("div", { className: `timeline-year ${active ? 'active' : ''}`, "data-year": year, children: [_jsx("span", { className: "year-label", children: year }), _jsx("button", { className: `timeline-dot ${active ? 'active' : ''}`, "aria-label": `${year} ${title}`, onClick: onClick })] }));
};
