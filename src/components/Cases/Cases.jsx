import { useEffect, useRef, useState } from 'react'
import './Cases.css'

const cases = [
    { value: 285, suffix: '', label: 'карточек Google Maps', desc: 'Создано и оптимизировано' },
    { value: 27, suffix: '', label: 'точек в TOP-3', desc: 'Локальная выдача Google' },
    { value: 18, suffix: '%', label: 'ДРР по SMS', desc: 'МТС Маркетолог' },
    { value: 2, suffix: '×', label: 'снижение стоимости', desc: 'Повторный клиент' },
    { value: 25, suffix: '%', label: 'ниже рынка', desc: 'Стоимость лида (Bori mebel)' },
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
            // Ease out cubic for satisfying deceleration
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(target * eased))

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
                        <p className="cases__detail-period">Март 2024 — Июнь 2025</p>
                        <p className="cases__detail-text">
                            SEO для Google Business Profile и Google Maps. SMS-маркетинг через МТС Маркетолог.
                            Техническая автоматизация с ZennoPoster, антидетект-браузерами и прокси.
                            Создал систему управления 285 карточками, вывел 27 точек в топ-3 локальной выдачи.
                        </p>
                    </div>

                    <div className="card cases__detail-card stagger-item">
                        <h3 className="cases__detail-title">Bori Mebel</h3>
                        <p className="cases__detail-period">Сентябрь 2021 — Ноябрь 2022</p>
                        <p className="cases__detail-text">
                            SMM в Instagram и VK, таргетированная реклама в Meta.
                            Выстроил процессы контент-производства, увеличил вовлечённость аудитории,
                            снизил стоимость лида на 25% ниже рыночного уровня.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
