import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Save, ArrowLeft, Eye } from 'lucide-react'
import toast from 'react-hot-toast'
import './AdminStyles.css'

function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[а-яё]/gi, (ch) => {
            const map = {
                а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo',
                ж: 'zh', з: 'z', и: 'i', й: 'j', к: 'k', л: 'l', м: 'm',
                н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u',
                ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch',
                ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
            }
            return map[ch.toLowerCase()] || ch
        })
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

export default function ArticleEditor() {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEditing = Boolean(id)

    const [form, setForm] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        cover_url: '',
        published: false,
    })
    const [autoSlug, setAutoSlug] = useState(true)
    const [saving, setSaving] = useState(false)
    const [loading, setLoading] = useState(isEditing)
    const [showPreview, setShowPreview] = useState(false)

    useEffect(() => {
        if (isEditing) {
            fetchArticle()
        }
    }, [id])

    async function fetchArticle() {
        try {
            const { data, error } = await supabase
                .from('articles')
                .select('*')
                .eq('id', id)
                .single()

            if (error || !data) {
                toast.error('Статья не найдена')
                navigate('/admin')
                return
            }

            setForm({
                title: data.title,
                slug: data.slug,
                excerpt: data.excerpt || '',
                content: data.content,
                cover_url: data.cover_url || '',
                published: data.published,
            })
            setAutoSlug(false)
        } catch {
            toast.error('Ошибка загрузки')
            navigate('/admin')
        } finally {
            setLoading(false)
        }
    }

    function handleChange(field, value) {
        setForm((prev) => {
            const next = { ...prev, [field]: value }
            if (field === 'title' && autoSlug) {
                next.slug = slugify(value)
            }
            return next
        })
        if (field === 'slug') {
            setAutoSlug(false)
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (!form.title.trim() || !form.content.trim()) {
            toast.error('Заполните заголовок и содержимое')
            return
        }

        if (!form.slug.trim()) {
            toast.error('Slug не может быть пустым')
            return
        }

        setSaving(true)

        try {
            const payload = {
                title: form.title.trim(),
                slug: form.slug.trim(),
                excerpt: form.excerpt.trim() || null,
                content: form.content,
                cover_url: form.cover_url.trim() || null,
                published: form.published,
            }

            if (isEditing) {
                const { error } = await supabase
                    .from('articles')
                    .update(payload)
                    .eq('id', id)
                if (error) throw error
                toast.success('Статья обновлена')
            } else {
                const { error } = await supabase
                    .from('articles')
                    .insert(payload)
                if (error) throw error
                toast.success('Статья создана')
            }

            navigate('/admin')
        } catch (err) {
            toast.error(err.message || 'Ошибка сохранения')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="admin-page">
                <div className="admin-page__bg" />
                <div className="admin-dashboard__loading">
                    <div className="admin-dashboard__spinner" />
                </div>
            </div>
        )
    }

    return (
        <div className="admin-page">
            <div className="admin-page__bg" />

            <div className="admin-editor container">
                <header className="admin-editor__header">
                    <Link to="/admin" className="admin-editor__back">
                        <ArrowLeft size={16} />
                        Назад к списку
                    </Link>
                    <h1 className="admin-dashboard__title">
                        {isEditing ? 'Редактировать статью' : 'Новая статья'}
                    </h1>
                </header>

                <form className="admin-editor__form" onSubmit={handleSubmit}>
                    <div className="admin-editor__main">
                        {/* Title */}
                        <div className="admin-field">
                            <label className="admin-field__label" htmlFor="title">
                                Заголовок *
                            </label>
                            <input
                                id="title"
                                type="text"
                                className="admin-field__input"
                                value={form.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                                placeholder="Заголовок статьи"
                                required
                            />
                        </div>

                        {/* Slug */}
                        <div className="admin-field">
                            <label className="admin-field__label" htmlFor="slug">
                                Slug (URL) *
                            </label>
                            <input
                                id="slug"
                                type="text"
                                className="admin-field__input admin-field__input--mono"
                                value={form.slug}
                                onChange={(e) => handleChange('slug', e.target.value)}
                                placeholder="my-article-slug"
                                required
                            />
                        </div>

                        {/* Excerpt */}
                        <div className="admin-field">
                            <label className="admin-field__label" htmlFor="excerpt">
                                Краткое описание
                            </label>
                            <textarea
                                id="excerpt"
                                className="admin-field__textarea admin-field__textarea--small"
                                value={form.excerpt}
                                onChange={(e) => handleChange('excerpt', e.target.value)}
                                placeholder="Краткое описание для карточки в блоге"
                                rows={3}
                            />
                        </div>

                        {/* Cover URL */}
                        <div className="admin-field">
                            <label className="admin-field__label" htmlFor="cover_url">
                                URL обложки
                            </label>
                            <input
                                id="cover_url"
                                type="url"
                                className="admin-field__input"
                                value={form.cover_url}
                                onChange={(e) => handleChange('cover_url', e.target.value)}
                                placeholder="https://example.com/image.jpg"
                            />
                            {form.cover_url && (
                                <div className="admin-editor__cover-preview">
                                    <img src={form.cover_url} alt="Предпросмотр обложки" />
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="admin-field">
                            <div className="admin-field__label-row">
                                <label className="admin-field__label" htmlFor="content">
                                    Содержимое (Markdown) *
                                </label>
                                <button
                                    type="button"
                                    className="admin-editor__preview-toggle"
                                    onClick={() => setShowPreview(!showPreview)}
                                >
                                    <Eye size={14} />
                                    {showPreview ? 'Редактор' : 'Предпросмотр'}
                                </button>
                            </div>

                            {showPreview ? (
                                <div className="admin-editor__preview prose">
                                    {form.content ? (
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {form.content}
                                        </ReactMarkdown>
                                    ) : (
                                        <p className="admin-editor__preview-empty">
                                            Начните писать, чтобы увидеть предпросмотр
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <textarea
                                    id="content"
                                    className="admin-field__textarea admin-field__textarea--large"
                                    value={form.content}
                                    onChange={(e) => handleChange('content', e.target.value)}
                                    placeholder="# Заголовок&#10;&#10;Текст статьи в формате Markdown..."
                                    required
                                />
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="admin-editor__sidebar">
                        <div className="admin-editor__sidebar-card card">
                            <h3 className="admin-editor__sidebar-title">Публикация</h3>

                            <label className="admin-toggle">
                                <input
                                    type="checkbox"
                                    checked={form.published}
                                    onChange={(e) => handleChange('published', e.target.checked)}
                                />
                                <span className="admin-toggle__slider" />
                                <span className="admin-toggle__text">
                                    {form.published ? 'Опубликована' : 'Черновик'}
                                </span>
                            </label>

                            <button
                                type="submit"
                                className="btn-primary admin-editor__save"
                                disabled={saving}
                            >
                                <Save size={16} />
                                {saving ? 'Сохранение…' : isEditing ? 'Обновить' : 'Создать'}
                            </button>
                        </div>
                    </aside>
                </form>
            </div>
        </div>
    )
}
