import { Code, Brain, Lightbulb } from 'lucide-react'
import './About.css'

export default function About() {
    return (
        <section className="section about" id="about">
            <div className="container">
                <div className="about__grid">
                    <div className="about__info">
                        <span className="section-label">Обо мне</span>
                        <h2 className="section-title">Технический бэкграунд<br />+ маркетинговая экспертиза</h2>
                        <p className="section-subtitle">
                            Интернет-маркетолог с образованием в прикладной информатике.
                            Этот микс позволяет мне решать маркетинговые задачи на стыке
                            технологий и креатива.
                        </p>
                        <p className="about__text">
                            За <strong>3+ года</strong> я прошёл путь от менеджера по продажам до специалиста,
                            который управляет бюджетом <strong>630 000 ₽/мес</strong>,
                            генерирует до <strong>1,1 млн ₽ выручки</strong> с SMS-канала
                            и снижает ДРР <strong>с 33% до 8%</strong>. Я не просто настраиваю рекламу — я строю системы, которые работают.
                        </p>
                    </div>

                    <div className="about__visual scale-in">
                        <div className="about__image-wrapper">
                            <img
                                src="/images/dashboard.png"
                                alt="Маркетинговая аналитика"
                                className="about__image"
                            />
                            <div className="about__image-overlay" />
                            <span className="about__image-text">
                                Данные → Стратегия → Результат
                            </span>
                        </div>
                    </div>
                </div>

                <div className="about__cards stagger-grid">
                    <div className="card card--interactive about__card stagger-item">
                        <div className="about__card-icon">
                            <Code size={22} />
                        </div>
                        <h3 className="about__card-title">Техническая база</h3>
                        <p className="about__card-text">
                            ZennoPoster, Tilda, WordPress, антидетект-браузеры, GTM, AmoCRM
                        </p>
                    </div>

                    <div className="card card--interactive about__card stagger-item">
                        <div className="about__card-icon">
                            <Brain size={22} />
                        </div>
                        <h3 className="about__card-title">AI-мышление</h3>
                        <p className="about__card-text">
                            Antigravity, Claude Code
                        </p>
                    </div>

                    <div className="card card--interactive about__card stagger-item">
                        <div className="about__card-icon">
                            <Lightbulb size={22} />
                        </div>
                        <h3 className="about__card-title">Результат</h3>
                        <p className="about__card-text">
                            Каждое решение подкреплено данными и направлено на ROI
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
