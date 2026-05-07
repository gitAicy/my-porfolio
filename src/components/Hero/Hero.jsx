import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import './Hero.css'

export default function Hero() {
    const scrollToAbout = () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section className="hero" id="hero">
            {/* Animated gradient mesh background */}
            <div className="hero__bg" aria-hidden="true">
                <div className="hero__bg-gradient hero__bg-gradient--1" />
                <div className="hero__bg-gradient hero__bg-gradient--2" />
                <div className="hero__bg-gradient hero__bg-gradient--3" />
            </div>

            <div className="hero__content container">
                <motion.div
                    className="hero__text"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <motion.span
                        className="hero__label"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        Performance-маркетолог
                    </motion.span>

                    <motion.h1
                        className="hero__title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.7 }}
                    >
                        Даниил<br />
                        <span className="hero__title-accent">Мозгин</span>
                    </motion.h1>

                    <motion.p
                        className="hero__slogan"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                    >
                        Локальное SEO, контекстная реклама, SMS-маркетинг и AI-автоматизация.
                        Управляю бюджетом 630 000 ₽/мес и генерирую до 1,1 млн ₽ выручки с одного канала.
                    </motion.p>

                    <motion.div
                        className="hero__actions"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                    >
                        <a href="#contact" className="btn-primary">
                            Связаться со мной
                        </a>
                        <a href="#cases" className="btn-outline">
                            Смотреть кейсы
                        </a>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="hero__visual"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <div className="hero__portrait-wrapper">
                        <div className="hero__portrait-glow" aria-hidden="true" />
                        <img
                            src="/images/my_pho.png"
                            alt="Даниил Мозгин"
                            className="hero__portrait"
                        />

                        {/* Floating stat cards */}
                        <motion.div
                            className="hero__stat hero__stat--1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.2, duration: 0.5 }}
                        >
                            <span className="hero__stat-number">285</span>
                            <span className="hero__stat-text">карточек<br />Google Maps</span>
                        </motion.div>

                        <motion.div
                            className="hero__stat hero__stat--2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.4, duration: 0.5 }}
                        >
                            <span className="hero__stat-number">630K</span>
                            <span className="hero__stat-text">₽/мес<br />бюджет</span>
                        </motion.div>

                        <motion.div
                            className="hero__stat hero__stat--3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.6, duration: 0.5 }}
                        >
                            <span className="hero__stat-number">ДРР 8%</span>
                            <span className="hero__stat-text">с 33%<br />до 8%</span>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            <motion.button
                className="hero__scroll-btn"
                onClick={scrollToAbout}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                aria-label="Прокрутить вниз"
            >
                <ArrowDown size={18} />
                <span>Скролл</span>
            </motion.button>
        </section>
    )
}
