import './Skills.css'

const skillGroups = [
    {
        title: 'Каналы и инструменты',
        skills: [
            'Google Business Profile',
            'Яндекс.Директ (РСЯ)',
            'ВКонтакте Реклама',
            'МТС Маркетолог',
            'SMS-маркетинг',
            'SEO',
            'SERM',
        ],
    },
    {
        title: 'Аналитика',
        skills: [
            'Яндекс.Метрика',
            'Google Analytics',
            'Настройка целей и воронок',
            'Google Data Studio',
            'A/B-тестирование',
        ],
    },
    {
        title: 'Техническое',
        skills: [
            'ZennoPoster',
            'Tilda',
            'WordPress',
            'Антидетект-браузеры',
            'Прокси и домены',
            'GTM',
        ],
    },
    {
        title: 'CRM и управление',
        skills: [
            'AmoCRM',
            'Координация подрядчиков',
            'Составление ТЗ',
            'Отчётность',
            'Управление бюджетом',
        ],
    },
    {
        title: 'AI-инструменты',
        skills: [
            'Antigravity',
            'Claude Code',
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
