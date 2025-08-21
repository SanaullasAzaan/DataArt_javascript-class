import React from 'react'

interface HeaderProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme }) => {
  return (
    <header className="header">
      <div className="logo">Timeline</div>
      <div className="theme-switch">
        <button aria-label="Toggle theme" className={`switch ${theme}`} onClick={onToggleTheme}>
          <span className="knob" />
        </button>
      </div>
    </header>
  )
}


