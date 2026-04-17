import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import './Navbar.css'

const navLinks = [
    { id: 'about', label: 'Обо мне' },
    { id: 'services', label: 'Услуги' },
    { id: 'cases', label: 'Кейсы' },
    { id: 'ai-tools', label: 'AI' },
    { id: 'experience', label: 'Опыт' },
    { id: 'skills', label: 'Навыки' },
    { id: 'contact', label: 'Контакты' },
]

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()
    const isHomePage = location.pathname === '/'

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 50)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const handleClick = (id) => {
        setIsOpen(false)
        if (isHomePage) {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        } else {
            window.location.href = `/#${id}`
        }
    }

    return (
        <motion.nav
            className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        >
            <div className="navbar__inner container">
                <Link className="navbar__logo" to="/">
                    <span className="navbar__logo-text">DM</span>
                </Link>

                <div className="navbar__links">
                    {isHomePage && navLinks.map((link) => (
                        <button
                            key={link.id}
                            className="navbar__link"
                            onClick={() => handleClick(link.id)}
                        >
                            {link.label}
                        </button>
                    ))}
                    <Link to="/blog" className="navbar__link">
                        Блог
                    </Link>
                </div>

                <ThemeToggle />

                <button
                    className="navbar__toggle"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Меню"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="navbar__mobile"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {isHomePage && navLinks.map((link, i) => (
                            <motion.button
                                key={link.id}
                                className="navbar__mobile-link"
                                onClick={() => handleClick(link.id)}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                {link.label}
                            </motion.button>
                        ))}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: isHomePage ? navLinks.length * 0.05 : 0 }}
                        >
                            <Link
                                to="/blog"
                                className="navbar__mobile-link"
                                onClick={() => setIsOpen(false)}
                            >
                                Блог
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
