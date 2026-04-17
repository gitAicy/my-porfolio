import { useState } from 'react'
import { Send, Mail, MessageCircle, ArrowUpRight } from 'lucide-react'
import './Contact.css'

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        // In production, connect to Formspree or similar
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 3000)
    }

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <section className="section section--dark contact" id="contact">
            <div className="container">
                <div className="contact__header">
                    <span className="section-label">Контакты</span>
                    <h2 className="section-title">Давайте работать вместе</h2>
                    <p className="section-subtitle">
                        Готов обсудить ваш проект и предложить решение, которое даст результат.
                    </p>
                </div>

                <div className="contact__grid">
                    <div className="contact__links stagger-grid">
                        <a
                            href="mailto:mozgin.daniil@yandex.ru"
                            className="card contact__link-card stagger-item"
                        >
                            <div className="contact__link-icon">
                                <Mail size={20} />
                            </div>
                            <div>
                                <span className="contact__link-label">Email</span>
                                <span className="contact__link-value">mozgin.daniil@yandex.ru</span>
                            </div>
                            <ArrowUpRight size={16} className="contact__link-arrow" />
                        </a>

                        <a
                            href="https://t.me/daniilmozgin"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="card contact__link-card stagger-item"
                        >
                            <div className="contact__link-icon contact__link-icon--tg">
                                <MessageCircle size={20} />
                            </div>
                            <div>
                                <span className="contact__link-label">Telegram</span>
                                <span className="contact__link-value">@daniilmozgin</span>
                            </div>
                            <ArrowUpRight size={16} className="contact__link-arrow" />
                        </a>
                    </div>

                    <form className="card contact__form scale-in" onSubmit={handleSubmit}>
                        <h3 className="contact__form-title">Написать сообщение</h3>

                        <div className="contact__field">
                            <label htmlFor="contact-name">Имя</label>
                            <input
                                id="contact-name"
                                name="name"
                                type="text"
                                required
                                placeholder="Как вас зовут?"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="contact__field">
                            <label htmlFor="contact-email">Email</label>
                            <input
                                id="contact-email"
                                name="email"
                                type="email"
                                required
                                placeholder="ваш@email.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="contact__field">
                            <label htmlFor="contact-message">Сообщение</label>
                            <textarea
                                id="contact-message"
                                name="message"
                                required
                                rows={4}
                                placeholder="Расскажите о вашем проекте..."
                                value={formData.message}
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit" className="btn-primary contact__submit">
                            {submitted ? 'Отправлено ✓' : (
                                <>Отправить <Send size={14} /></>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}
