import { useState } from 'react'
import { Send, Mail, MessageCircle, ArrowUpRight, Loader2 } from 'lucide-react'
import './Contact.css'

const TG_BOT_TOKEN = import.meta.env.VITE_TG_BOT_TOKEN
const TG_CHAT_ID = import.meta.env.VITE_TG_CHAT_ID

async function sendToTelegram({ name, email, message }) {
    const text = [
        `📩 *Новая заявка с сайта*`,
        ``,
        `👤 *Имя:* ${name}`,
        `📧 *Email:* ${email}`,
        ``,
        `💬 *Сообщение:*`,
        message,
    ].join('\n')

    const res = await fetch(
        `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TG_CHAT_ID,
                text,
                parse_mode: 'Markdown',
            }),
        }
    )

    if (!res.ok) {
        throw new Error('Telegram API error')
    }
}

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [status, setStatus] = useState('idle') // idle | sending | success | error

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('sending')

        try {
            await sendToTelegram(formData)
            setStatus('success')
            setFormData({ name: '', email: '', message: '' })
            setTimeout(() => setStatus('idle'), 4000)
        } catch (err) {
            console.error('Send error:', err)
            setStatus('error')
            setTimeout(() => setStatus('idle'), 4000)
        }
    }

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const buttonContent = {
        idle: <><span>Отправить</span> <Send size={14} /></>,
        sending: <><Loader2 size={14} className="spin" /> <span>Отправка...</span></>,
        success: <span>Отправлено ✓</span>,
        error: <span>Ошибка, попробуйте ещё раз</span>,
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
                                disabled={status === 'sending'}
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
                                disabled={status === 'sending'}
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
                                disabled={status === 'sending'}
                            />
                        </div>

                        <button
                            type="submit"
                            className={`btn-primary contact__submit ${status === 'error' ? 'contact__submit--error' : ''}`}
                            disabled={status === 'sending'}
                        >
                            {buttonContent[status]}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}
