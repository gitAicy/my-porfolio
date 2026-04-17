import { useState, useCallback } from 'react'
import { Routes, Route } from 'react-router-dom'
import Preloader from './components/Preloader/Preloader'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import HomePage from './pages/HomePage'
import BlogPage from './pages/BlogPage'
import ArticlePage from './pages/ArticlePage'
import LoginPage from './pages/admin/LoginPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import ArticleEditor from './pages/admin/ArticleEditor'
import 'lenis/dist/lenis.css'
import './App.css'

function App() {
  const [loaded, setLoaded] = useState(false)

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true)
  }, [])

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />
      {loaded && (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<ArticlePage />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/articles/new"
            element={
              <ProtectedRoute>
                <ArticleEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/articles/:id/edit"
            element={
              <ProtectedRoute>
                <ArticleEditor />
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </>
  )
}

export default App
