import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Navbar from '../components/Navbar/Navbar'
import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
import Services from '../components/Services/Services'
import Cases from '../components/Cases/Cases'
import AITools from '../components/AITools/AITools'
import Experience from '../components/Experience/Experience'
import Skills from '../components/Skills/Skills'
import Contact from '../components/Contact/Contact'
import Footer from '../components/Footer/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
    const appRef = useRef(null)
    const lenisRef = useRef(null)

    // Lenis smooth scroll
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        })
        lenisRef.current = lenis

        lenis.on('scroll', ScrollTrigger.update)
        gsap.ticker.add((time) => lenis.raf(time * 1000))
        gsap.ticker.lagSmoothing(0)

        return () => {
            lenis.destroy()
            lenisRef.current = null
        }
    }, [])

    // GSAP scroll-triggered animations — simplified
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Section labels
            gsap.utils.toArray('.section-label').forEach((el) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 10 },
                    {
                        opacity: 1, y: 0,
                        duration: 0.5,
                        ease: 'power2.out',
                        scrollTrigger: { trigger: el, start: 'top 88%' }
                    }
                )
            })

            // Section titles
            gsap.utils.toArray('.section-title').forEach((el) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1, y: 0,
                        duration: 0.7,
                        ease: 'power3.out',
                        scrollTrigger: { trigger: el, start: 'top 85%' }
                    }
                )
            })

            // Section subtitles
            gsap.utils.toArray('.section-subtitle').forEach((el) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1, y: 0,
                        duration: 0.6,
                        delay: 0.1,
                        ease: 'power2.out',
                        scrollTrigger: { trigger: el, start: 'top 85%' }
                    }
                )
            })

            // Stagger grids
            gsap.utils.toArray('.stagger-grid').forEach((grid) => {
                const cards = grid.querySelectorAll('.stagger-item')
                gsap.fromTo(cards,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1, y: 0,
                        duration: 0.5,
                        stagger: 0.08,
                        ease: 'power2.out',
                        scrollTrigger: { trigger: grid, start: 'top 82%' }
                    }
                )
            })

            // Reveal blocks
            gsap.utils.toArray('.reveal-block').forEach((el) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 25 },
                    {
                        opacity: 1, y: 0,
                        duration: 0.6,
                        ease: 'power2.out',
                        scrollTrigger: { trigger: el, start: 'top 85%' }
                    }
                )
            })

            // Scale in
            gsap.utils.toArray('.scale-in').forEach((el) => {
                gsap.fromTo(el,
                    { opacity: 0, scale: 0.95 },
                    {
                        opacity: 1, scale: 1,
                        duration: 0.5,
                        ease: 'power2.out',
                        scrollTrigger: { trigger: el, start: 'top 85%' }
                    }
                )
            })

            // Slide left
            gsap.utils.toArray('.slide-left').forEach((el, i) => {
                gsap.fromTo(el,
                    { opacity: 0, x: -40 },
                    {
                        opacity: 1, x: 0,
                        duration: 0.6,
                        delay: i * 0.06,
                        ease: 'power2.out',
                        scrollTrigger: { trigger: el, start: 'top 85%' }
                    }
                )
            })

        }, appRef)

        return () => ctx.revert()
    }, [])

    return (
        <div className="app" ref={appRef}>
            <Navbar />
            <main>
                <Hero />
                <About />
                <Services />
                <Cases />
                <AITools />
                <Experience />
                <Skills />
                <Contact />
            </main>
            <Footer />
        </div>
    )
}
