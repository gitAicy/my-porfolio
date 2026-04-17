import { Heart, ArrowUp } from 'lucide-react'
import './Footer.css'

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="footer">
            <div className="container footer__inner">
                <div className="footer__brand">
                    <span className="footer__logo">DM</span>
                    <div className="footer__brand-text">
                        <span className="footer__tagline">Маркетинг, усиленный технологиями</span>
                        <span className="footer__copy">
                            © {new Date().getFullYear()} Даниил Мозгин · Создано с <Heart size={12} className="footer__heart" /> и AI
                        </span>
                    </div>
                </div>

                <button className="footer__top-btn" onClick={scrollToTop} aria-label="Наверх">
                    <ArrowUp size={18} />
                    <span>Наверх</span>
                </button>
            </div>
        </footer>
    )
}
