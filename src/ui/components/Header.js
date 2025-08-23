import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Header = ({ theme, onToggleTheme }) => {
    return (_jsxs("header", { className: "header", children: [_jsx("div", { className: "logo", children: "Timeline" }), _jsx("div", { className: "theme-switch", children: _jsx("button", { "aria-label": "Toggle theme", className: `switch ${theme}`, onClick: onToggleTheme, children: _jsx("span", { className: "knob" }) }) })] }));
};
