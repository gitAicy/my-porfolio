import './Skills.css'

const skillGroups = [
    {
        title: 'Маркетинг',
        skills: [
            'Контекстная реклама',
            'SMM',
            'SEO',
            'Email-маркетинг',
            'Лидогенерация',
            'Анализ рынка',
            'Brand-маркетинг',
        ],
    },
    {
        title: 'Инструменты',
        skills: [
            'Яндекс.Директ',
            'Google Ads',
            'Google Analytics',
            'Яндекс.Метрика',
            'Facebook Ads Manager',
            'Google Data Studio',
            'ZennoPoster',
        ],
    },
    {
        title: 'Техническое',
        skills: [
            'Трекинг и аналитика',
            'Прокси и автоматизация',
            'Антидетект-браузеры',
            'SQL и работа с данными',
            'API-интеграции',
            'CRM-системы',
        ],
    },
    {
        title: 'AI-инструменты',
        skills: [
            'ChatGPT',
            'Claude',
            'Gemini',
            'Grok',
            'Midjourney',
            'Nano Banana',
            'Antigravity',
        ],
    },
]

export default function Skills() {
    return (
        <section className="section skills" id="skills">
            <div className="container">
                <div className="skills__header">
                    <span className="section-label">Навыки</span>
                    <h2 className="section-title">Технологии и компетенции</h2>
                    <p className="section-subtitle">
                        Полный стек маркетинговых и технических навыков.
                    </p>
                </div>

                <div className="skills__grid stagger-grid">
                    {skillGroups.map((group, i) => (
                        <div className="card skills__group stagger-item" key={i}>
                            <h3 className="skills__group-title">{group.title}</h3>
                            <div className="skills__tags">
                                {group.skills.map((skill) => (
                                    <span className="skills__tag" key={skill}>{skill}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
