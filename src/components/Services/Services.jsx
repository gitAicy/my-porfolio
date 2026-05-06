import { Search, Target, Share2, Mail, Bot, BarChart3 } from 'lucide-react'
import './Services.css'

const services = [
    {
        icon: Search,
        title: 'SEO и локальное продвижение',
        desc: 'Google Maps, Google Business Profile. Создание и оптимизация 285 карточек, вывод 27 точек в TOP-3.',
    },
    {
        icon: Target,
        title: 'Контекстная реклама',
        desc: 'Яндекс.Директ (РСЯ). Ведение кампаний с бюджетом 100 000 ₽/мес, актуализация семантики, SEO-усиление.',
    },
    {
        icon: Share2,
        title: 'SMM и таргет',
        desc: 'ВКонтакте, Meta Ads. Рост сообществ с 0, лиды по 500 ₽ — на 20–30% ниже рынка. A/B-тестирование.',
    },
    {
        icon: Mail,
        title: 'Email / SMS-маркетинг',
        desc: 'MТС Маркетолог: триггерные рассылки, база 15 000 клиентов, выручка до 1,1 млн ₽/мес.',
    },
    {
        icon: Bot,
        title: 'AI-автоматизация',
        desc: 'Внедрение AI-инструментов в маркетинговые процессы: генерация контента, анализ, автоматизация.',
    },
    {
        icon: BarChart3,
        title: 'Аналитика и трекинг',
        desc: 'Яндекс.Метрика, Google Analytics, GTM. Настройка целей, воронок, контроль KPI.',
    },
]

export default function Services() {
    return (
        <section className="section section--grey services" id="services">
            <div className="container">
                <div className="services__header">
                    <span className="section-label">Услуги</span>
                    <h2 className="section-title">Что я делаю</h2>
                    <p className="section-subtitle">
                        Комплексный интернет-маркетинг с технической экспертизой —
                        от стратегии до реализации и аналитики результатов.
                    </p>
                </div>

                <div className="services__grid stagger-grid">
                    {services.map((service, i) => (
                        <div className="card services__card stagger-item" key={i}>
                            <div className="services__card-icon">
                                <service.icon size={22} />
                            </div>
                            <h3 className="services__card-title">{service.title}</h3>
                            <p className="services__card-text">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
