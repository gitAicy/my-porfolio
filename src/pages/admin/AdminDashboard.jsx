import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { Plus, Edit3, Trash2, LogOut, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'
import './AdminStyles.css'

export default function AdminDashboard() {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const { signOut } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        fetchArticles()
    }, [])

    async function fetchArticles() {
        try {
            const { data, error } = await supabase
                .from('articles')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setArticles(data || [])
        } catch (err) {
            toast.error('Ошибка загрузки статей')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    async function handleDelete(id, title) {
        if (!confirm(`Удалить статью «${title}»?`)) return

        try {
            const { error } = await supabase.from('articles').delete().eq('id', id)
            if (error) throw error
            setArticles((prev) => prev.filter((a) => a.id !== id))
            toast.success('Статья удалена')
        } catch (err) {
            toast.error('Ошибка удаления')
            console.error(err)
        }
    }

    async function togglePublished(id, published) {
        try {
            const { error } = await supabase
                .from('articles')
                .update({ published: !published })
                .eq('id', id)

            if (error) throw error
            setArticles((prev) =>
                prev.map((a) => (a.id === id ? { ...a, published: !published } : a))
            )
            toast.success(published ? 'Статья снята с публикации' : 'Статья опубликована')
        } catch (err) {
            toast.error('Ошибка обновления')
            console.error(err)
        }
    }

    async function handleSignOut() {
        await signOut()
        navigate('/admin/login')
    }

    function formatDate(dateStr) {
        return new Date(dateStr).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        })
    }

    return (
        <div className="admin-page">
            <div className="admin-page__bg" />

            <div className="admin-dashboard container">
                <header className="admin-dashboard__header">
                    <div>
                        <h1 className="admin-dashboard__title">Управление статьями</h1>
                        <p className="admin-dashboard__subtitle">
                            Создавайте, редактируйте и публикуйте статьи
                        </p>
                    </div>
                    <div className="admin-dashboard__actions">
                        <Link to="/admin/articles/new" className="btn-primary">
                            <Plus size={18} />
                            Новая статья
                        </Link>
                        <button onClick={handleSignOut} className="btn-outline admin-dashboard__logout">
                            <LogOut size={16} />
                            Выйти
                        </button>
                    </div>
                </header>

                {loading ? (
                    <div className="admin-dashboard__loading">
                        <div className="admin-dashboard__spinner" />
                    </div>
                ) : articles.length === 0 ? (
                    <div className="admin-dashboard__empty card">
                        <h2>Нет статей</h2>
                        <p>Создайте свою первую статью</p>
                        <Link to="/admin/articles/new" className="btn-primary">
                            <Plus size={18} />
                            Создать статью
                        </Link>
                    </div>
                ) : (
                    <div className="admin-table-wrapper card">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Заголовок</th>
                                    <th>Slug</th>
                                    <th>Статус</th>
                                    <th>Дата</th>
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {articles.map((article) => (
                                    <tr key={article.id}>
                                        <td className="admin-table__title-cell">
                                            {article.title}
                                        </td>
                                        <td className="admin-table__slug-cell">
                                            <code>{article.slug}</code>
                                        </td>
                                        <td>
                                            <button
                                                className={`admin-badge ${article.published ? 'admin-badge--published' : 'admin-badge--draft'}`}
                                                onClick={() => togglePublished(article.id, article.published)}
                                                title={article.published ? 'Снять с публикации' : 'Опубликовать'}
                                            >
                                                {article.published ? (
                                                    <><Eye size={12} /> Опубликована</>
                                                ) : (
                                                    <><EyeOff size={12} /> Черновик</>
                                                )}
                                            </button>
                                        </td>
                                        <td className="admin-table__date-cell">
                                            {formatDate(article.created_at)}
                                        </td>
                                        <td>
                                            <div className="admin-table__actions">
                                                <Link
                                                    to={`/admin/articles/${article.id}/edit`}
                                                    className="admin-icon-btn admin-icon-btn--edit"
                                                    title="Редактировать"
                                                >
                                                    <Edit3 size={16} />
                                                </Link>
                                                <button
                                                    className="admin-icon-btn admin-icon-btn--delete"
                                                    onClick={() => handleDelete(article.id, article.title)}
                                                    title="Удалить"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}
