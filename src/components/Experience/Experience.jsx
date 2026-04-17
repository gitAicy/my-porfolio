import { Briefcase } from 'lucide-react'
import './Experience.css'

const timeline = [
    {
        company: 'РА Кефир',
        role: 'Интернет-маркетолог',
        period: 'Март 2024 — Июнь 2025',
        tasks: [
            'SEO для Google Business Profile и Google Maps',
            'SMS-маркетинг через МТС Маркетолог',
            'Техническая автоматизация (ZennoPoster, антидетект-браузеры, прокси)',
        ],
        highlight: true,
    },
    {
        company: 'Bori Mebel',
        role: 'Интернет-маркетолог',
        period: 'Сентябрь 2021 — Ноябрь 2022',
        tasks: [
            'SMM (Instagram, VK)',
            'Таргетированная реклама Meta',
            'Аналитика, организация отдела',
        ],
        highlight: false,
    },
    {
        company: 'Codland',
        role: 'Менеджер по продажам',
        period: 'Январь 2021 — Май 2021',
        tasks: [
            'Проведение мастер-классов',
            'Продажа образовательных курсов',
        ],
        highlight: false,
    },
    {
        company: 'Wikium',
        role: 'Менеджер по продажам',
        period: 'Сентябрь 2020 — Декабрь 2020',
        tasks: [
            'Тёплые звонки',
            'Ведение CRM и работа с базой',
        ],
        highlight: false,
    },
]

export default function Experience() {
    return (
        <section className="section section--grey experience" id="experience">
            <div className="container">
                <div className="experience__header">
                    <span className="section-label">Опыт работы</span>
                    <h2 className="section-title">Карьерный путь</h2>
                    <p className="section-subtitle">
                        От менеджера по продажам до интернет-маркетолога с техническим бэкграундом.
                    </p>
                </div>

                <div className="experience__timeline">
                    {timeline.map((item, i) => (
                        <div
                            className={`experience__item slide-left ${item.highlight ? 'experience__item--highlight' : ''}`}
                            key={i}
                        >
                            <div className="experience__dot">
                                <Briefcase size={14} />
                            </div>
                            <div className="card experience__card">
                                <div className="experience__card-top">
                                    <div>
                                        <h3 className="experience__company">{item.company}</h3>
                                        <p className="experience__role">{item.role}</p>
                                    </div>
                                    <span className="experience__period">{item.period}</span>
                                </div>
                                <ul className="experience__tasks">
                                    {item.tasks.map((task, j) => (
                                        <li key={j}>{task}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="experience__education scale-in">
                    <div className="card experience__edu-card">
                        <h3 className="experience__edu-title">🎓 Образование</h3>
                        <p className="experience__edu-text">
                            <strong>СмолГУ</strong> — Прикладная информатика, физико-математический факультет (2022)
                        </p>
                        <div className="experience__certs">
                            <span className="ai-tools__tag">Трафик-менеджер (2020)</span>
                            <span className="ai-tools__tag">Интернет-маркетолог (2019)</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
