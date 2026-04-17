import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Calendar, ArrowLeft } from 'lucide-react'
import Navbar from '../components/Navbar/Navbar'
import './ArticlePage.css'

export default function ArticlePage() {
    const { slug } = useParams()
    const [article, setArticle] = useState(null)
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        fetchArticle()
    }, [slug])

    async function fetchArticle() {
        try {
            const { data, error } = await supabase
                .from('articles')
                .select('*')
                .eq('slug', slug)
                .eq('published', true)
                .single()

            if (error || !data) {
                setNotFound(true)
            } else {
                setArticle(data)
            }
        } catch {
            setNotFound(true)
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

    if (loading) {
        return (
            <div className="article-page">
                <Navbar />
                <div className="article-page__loading">
                    <div className="article-page__spinner" />
                </div>
            </div>
        )
    }

    if (notFound) {
        return (
            <div className="article-page">
                <Navbar />
                <div className="article-page__not-found container">
                    <h1>Статья не найдена</h1>
                    <p>Возможно, она была удалена или ещё не опубликована</p>
                    <Link to="/blog" className="btn-primary">
                        Вернуться к блогу
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="article-page">
            <Navbar />

            <article className="article-page__content container">
                <Link to="/blog" className="article-page__back">
                    <ArrowLeft size={16} />
                    Все статьи
                </Link>

                {article.cover_url && (
                    <div className="article-page__cover">
                        <img src={article.cover_url} alt={article.title} />
                    </div>
                )}

                <header className="article-page__header">
                    <div className="article-page__meta">
                        <Calendar size={14} />
                        <time>{formatDate(article.created_at)}</time>
                    </div>
                    <h1 className="article-page__title">{article.title}</h1>
                    {article.excerpt && (
                        <p className="article-page__excerpt">{article.excerpt}</p>
                    )}
                </header>

                <div className="article-page__body prose">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {article.content}
                    </ReactMarkdown>
                </div>

                <footer className="article-page__footer">
                    <Link to="/blog" className="btn-outline">
                        <ArrowLeft size={16} />
                        Все статьи
                    </Link>
                </footer>
            </article>
        </div>
    )
}
