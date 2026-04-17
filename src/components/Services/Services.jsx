import { Search, Target, Share2, Mail, Bot, BarChart3 } from 'lucide-react'
import './Services.css'

const services = [
    {
        icon: Search,
        title: 'SEO и локальное продвижение',
        desc: 'Google Maps, Google Business Profile, локальная выдача. Вывод бизнеса в TOP-3 по гео-запросам.',
    },
    {
        icon: Target,
        title: 'Контекстная реклама',
        desc: 'Яндекс.Директ, Google Ads. Настройка, оптимизация, аналитика рекламных кампаний.',
    },
    {
        icon: Share2,
        title: 'SMM и таргет',
        desc: 'Стратегия присутствия в соцсетях, создание контента, таргетированная реклама в Meta и VK.',
    },
    {
        icon: Mail,
        title: 'Email / SMS-маркетинг',
        desc: 'Рассылки через МТС Маркетолог и email-платформы. Сегментация, автоматизация, A/B-тесты.',
    },
    {
        icon: Bot,
        title: 'AI-автоматизация',
        desc: 'Внедрение AI-инструментов в маркетинговые процессы: генерация контента, анализ, автоматизация.',
    },
    {
        icon: BarChart3,
        title: 'Аналитика и трекинг',
        desc: 'Google Analytics, Яндекс.Метрика, Google Data Studio. Настройка целей, воронок, дашбордов.',
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
