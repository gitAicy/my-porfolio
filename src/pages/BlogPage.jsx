import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Calendar, ArrowRight, BookOpen } from 'lucide-react'
import Navbar from '../components/Navbar/Navbar'
import './BlogPage.css'

export default function BlogPage() {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchArticles()
    }, [])

    async function fetchArticles() {
        try {
            const { data, error } = await supabase
                .from('articles')
                .select('*')
                .eq('published', true)
                .order('created_at', { ascending: false })

            if (error) throw error
            setArticles(data || [])
        } catch (err) {
            console.error('Error fetching articles:', err)
        } finally {
            setLoading(false)
        }
    }

    function formatDate(dateStr) {
        return new Date(dateStr).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
    }

    return (
        <div className="blog-page">
            <Navbar />

            <header className="blog-page__header container">
                <Link to="/" className="blog-page__back">
                    ← На главную
                </Link>
                <div className="blog-page__heading">
                    <span className="section-label">Блог</span>
                    <h1 className="blog-page__title">Статьи и заметки</h1>
                    <p className="blog-page__subtitle">
                        Делюсь опытом в маркетинге, технологиях и AI-автоматизации
                    </p>
                </div>
            </header>

            <main className="blog-page__content container">
                {loading ? (
                    <div className="blog-page__loading">
                        <div className="blog-page__spinner" />
                        <p>Загрузка статей…</p>
                    </div>
                ) : articles.length === 0 ? (
                    <div className="blog-page__empty">
                        <BookOpen size={48} />
                        <h2>Пока нет статей</h2>
                        <p>Скоро здесь появятся интересные материалы</p>
                    </div>
                ) : (
                    <div className="blog-page__grid">
                        {articles.map((article) => (
                            <Link
                                key={article.id}
                                to={`/blog/${article.slug}`}
                                className="blog-card card"
                            >
                                {article.cover_url && (
                                    <div className="blog-card__cover">
                                        <img src={article.cover_url} alt={article.title} />
                                    </div>
                                )}
                                <div className="blog-card__body">
                                    <div className="blog-card__meta">
                                        <Calendar size={14} />
                                        <time>{formatDate(article.created_at)}</time>
                                    </div>
                                    <h2 className="blog-card__title">{article.title}</h2>
                                    {article.excerpt && (
                                        <p className="blog-card__excerpt">{article.excerpt}</p>
                                    )}
                                    <span className="blog-card__link">
                                        Читать <ArrowRight size={16} />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}
