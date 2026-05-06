import { useEffect, useRef, useState } from 'react'
import './Cases.css'

const cases = [
    { value: 285, suffix: '', label: 'карточек Google Maps', desc: 'Создано и оптимизировано' },
    { value: 27, suffix: '', label: 'точек в TOP-3', desc: 'Локальная выдача Google' },
    { value: 8, suffix: '%', label: 'ДРР направления', desc: 'Снижение с 33% до 8%' },
    { value: 1.1, suffix: ' млн ₽', label: 'выручка/мес', desc: 'SMS-канал (МТС Маркетолог)' },
    { value: 500, suffix: ' ₽', label: 'стоимость лида', desc: 'На 20–30% ниже рынка' },
]

function Counter({ target, suffix, isVisible }) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!isVisible) return
        const duration = 2000
        const start = performance.now()

        const animate = (now) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = target * eased

            // Show decimal for small numbers, integer for large
            if (target < 10) {
                setCount(Math.round(current * 10) / 10)
            } else {
                setCount(Math.round(current))
            }

            if (progress < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
    }, [isVisible, target])

    return (
        <span className="cases__number">
            {count}{suffix}
        </span>
    )
}

export default function Cases() {
    const ref = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.3 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return (
        <section className="section section--accent cases" id="cases" ref={ref}>
            <img src="/images/tech-bg.png" alt="" className="cases__bg-image" aria-hidden="true" />
            <div className="container">
                <div className="cases__header">
                    <span className="section-label">Кейсы</span>
                    <h2 className="section-title">Результаты в цифрах</h2>
                    <p className="section-subtitle">
                        Конкретные измеримые результаты из реальных проектов.
                        Каждая цифра — это реальный бизнес-результат.
                    </p>
                </div>

                <div className="cases__grid stagger-grid">
                    {cases.map((c, i) => (
                        <div className="card cases__card stagger-item" key={i}>
                            <Counter target={c.value} suffix={c.suffix} isVisible={isVisible} />
                            <span className="cases__label">{c.label}</span>
                            <span className="cases__desc">{c.desc}</span>
                        </div>
                    ))}
                </div>

                <div className="cases__details stagger-grid">
                    <div className="card cases__detail-card stagger-item">
                        <h3 className="cases__detail-title">РА Кефир</h3>
                        <p className="cases__detail-period">Март 2024 — Июнь 2025 · бюджет 630 000 ₽/мес</p>
                        <p className="cases__detail-text">
                            Управлял рекламным бюджетом (Google Карты — 300 000 ₽, SMS — 200 000 ₽, Директ — 100 000 ₽).
                            Создал 285 карточек Google Business, вывел 27 точек в ТОП-3.
                            Генерировал 700 000–1 100 000 ₽/мес выручки через SMS-канал.
                            Координировал 2 подрядчиков (веб-дизайнер, SERM-менеджер).
                        </p>
                    </div>

                    <div className="card cases__detail-card stagger-item">
                        <h3 className="cases__detail-title">Bori Mebel</h3>
                        <p className="cases__detail-period">Сентябрь 2021 — Ноябрь 2022 · бюджет ~25 000 ₽/мес</p>
                        <p className="cases__detail-text">
                            Вырастил группу ВКонтакте с 0 до 1 100 подписчиков.
                            Привлекал 30–50 лидов/мес по 500 ₽/лид — на 20–30% ниже рынка.
                            Вёл контент-план: 1 пост/день, A/B-тестирование креативов.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
