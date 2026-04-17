import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'
import '../admin/AdminStyles.css'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { signIn } = useAuth()
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            await signIn(email, password)
            navigate('/admin')
        } catch (err) {
            setError(err.message || 'Ошибка входа')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="admin-page">
            <div className="admin-page__bg" />
            <div className="login-wrapper">
                <form className="login-form card" onSubmit={handleSubmit}>
                    <div className="login-form__icon">
                        <Lock size={28} />
                    </div>
                    <h1 className="login-form__title">Вход в админку</h1>
                    <p className="login-form__subtitle">
                        Введите свои данные для доступа к управлению статьями
                    </p>

                    {error && (
                        <div className="login-form__error">
                            {error}
                        </div>
                    )}

                    <div className="admin-field">
                        <label className="admin-field__label" htmlFor="email">
                            <Mail size={14} />
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="admin-field__input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="admin-field">
                        <label className="admin-field__label" htmlFor="password">
                            <Lock size={14} />
                            Пароль
                        </label>
                        <div className="admin-field__password-wrapper">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                className="admin-field__input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                className="admin-field__toggle-pw"
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn-primary login-form__submit"
                        disabled={loading}
                    >
                        {loading ? 'Вход…' : 'Войти'}
                    </button>
                </form>
            </div>
        </div>
    )
}
