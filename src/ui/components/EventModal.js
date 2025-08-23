import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
export const EventModal = ({ event, onClose }) => {
    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'Escape')
                onClose();
        };
        document.addEventListener('keydown', handler);
        document.body.style.overflow = event ? 'hidden' : 'auto';
        return () => {
            document.removeEventListener('keydown', handler);
            document.body.style.overflow = 'auto';
        };
    }, [event, onClose]);
    if (!event)
        return null;
    const modalRoot = document.getElementById('root');
    const content = (_jsx("div", { className: "modal active", onClick: (e) => e.currentTarget === e.target && onClose(), children: _jsxs("div", { className: "modal-content", children: [_jsxs("div", { className: "modal-header", children: [_jsxs("h2", { className: "modal-title", children: [_jsx("span", { className: "event-year", children: event.year }), " ", event.title] }), _jsx("button", { className: "modal-close", "aria-label": "Close", onClick: onClose, children: "\u00D7" })] }), _jsxs("div", { className: "modal-body", children: [_jsx("figure", { className: "event-image", children: _jsx("img", { src: event.imageURL, alt: event.title, onError: (e) => ((e.currentTarget.src = 'https://via.placeholder.com/400x250/cccccc/666666?text=Image+Not+Found')) }) }), _jsx("div", { className: "event-category", children: _jsx("span", { className: "category-badge", children: event.category }) }), _jsx("p", { className: "event-description", children: event.description }), _jsx("div", { className: "modal-actions", children: _jsx("button", { className: "back-btn", onClick: onClose, children: "Back" }) })] })] }) }));
    return ReactDOM.createPortal(content, modalRoot);
};
