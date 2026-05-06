import { Sparkles, Code2 } from 'lucide-react'
import './AITools.css'

const aiCategories = [
    {
        icon: Code2,
        category: 'Разработка и автоматизация',
        tools: ['Antigravity', 'Claude Code'],
        desc: 'Создание сайтов, лендингов, автоматизация маркетинговых процессов. Этот сайт — живой пример',
    },
]

const useCases = [
    'Автоматическая генерация текстов для рекламных кампаний',
    'Создание уникальных визуалов для SMM без фотосессий',
    'Анализ конкурентов и рынка с помощью AI-ассистентов',
    'Разработка лендингов и сайтов за часы, а не недели',
    'A/B-тестирование заголовков и описаний через AI',
    'Автоматизация рутинных маркетинговых задач',
]

export default function AITools() {
    return (
        <section className="section ai-tools" id="ai-tools">
            <div className="container">
                <div className="ai-tools__header">
                    <span className="section-label">AI-инструментарий</span>
                    <h2 className="section-title">AI как суперсила маркетолога</h2>
                    <p className="section-subtitle">
                        Я активно использую AI-инструменты для ускорения и усиления каждого этапа
                        маркетинговой работы — от идеи до реализации.
                    </p>
                </div>

                <div className="ai-tools__grid stagger-grid">
                    {aiCategories.map((cat, i) => (
                        <div className="card ai-tools__card stagger-item" key={i}>
                            <div className="ai-tools__card-header">
                                <div className="ai-tools__card-icon">
                                    <cat.icon size={20} color="white" />
                                </div>
                                <span className="ai-tools__card-category">{cat.category}</span>
                            </div>
                            <div className="ai-tools__card-tools">
                                {cat.tools.map((tool) => (
                                    <span className="ai-tools__tag" key={tool}>{tool}</span>
                                ))}
                            </div>
                            <p className="ai-tools__card-desc">{cat.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="ai-tools__use-cases stagger-grid">
                    <div className="card ai-tools__cases-card stagger-item">
                        <div className="ai-tools__cases-header">
                            <Sparkles size={18} className="ai-tools__cases-icon" />
                            <h3 className="ai-tools__cases-title">Как я применяю AI в маркетинге</h3>
                        </div>
                        <div className="ai-tools__cases-list">
                            {useCases.map((uc, i) => (
                                <div className="ai-tools__case-item" key={i}>
                                    <span className="ai-tools__case-dot" />
                                    <span>{uc}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card ai-tools__showcase scale-in stagger-item">
                        <div className="ai-tools__showcase-badge">🤖 Живой кейс</div>
                        <h3 className="ai-tools__showcase-title">Этот сайт создан с помощью AI</h3>
                        <p className="ai-tools__showcase-text">
                            Весь дизайн, анимации и код этого сайта были разработаны
                            в сотрудничестве с AI-ассистентом Antigravity. Это практический пример того,
                            как AI ускоряет и усиливает разработку.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
