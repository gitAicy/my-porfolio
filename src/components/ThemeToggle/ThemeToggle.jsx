import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import './ThemeToggle.css'

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('theme')
        if (saved) return saved === 'dark'
        return window.matchMedia('(prefers-color-scheme: dark)').matches
    })

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
        localStorage.setItem('theme', isDark ? 'dark' : 'light')
    }, [isDark])

    return (
        <button
            className="theme-toggle"
            onClick={() => setIsDark(!isDark)}
            aria-label={isDark ? 'Светлая тема' : 'Тёмная тема'}
            title={isDark ? 'Светлая тема' : 'Тёмная тема'}
        >
            <span className={`theme-toggle__icon ${isDark ? '' : 'theme-toggle__icon--active'}`}>
                <Sun size={16} />
            </span>
            <span className={`theme-toggle__icon ${isDark ? 'theme-toggle__icon--active' : ''}`}>
                <Moon size={16} />
            </span>
            <span
                className="theme-toggle__slider"
                style={{ transform: isDark ? 'translateX(26px)' : 'translateX(0)' }}
            />
        </button>
    )
}
