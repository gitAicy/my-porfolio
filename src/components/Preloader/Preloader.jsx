import { useState, useEffect } from 'react'
import './Preloader.css'

export default function Preloader({ onComplete }) {
    const [phase, setPhase] = useState('loading') // loading -> fadeout -> done

    useEffect(() => {
        // Wait for fonts + minimum display time
        const fontPromise = document.fonts.ready
        const minTime = new Promise(resolve => setTimeout(resolve, 2200))

        Promise.all([fontPromise, minTime]).then(() => {
            setPhase('fadeout')
            setTimeout(() => {
                setPhase('done')
                onComplete?.()
            }, 800)
        })
    }, [onComplete])

    if (phase === 'done') return null

    return (
        <div className={`preloader ${phase === 'fadeout' ? 'preloader--exit' : ''}`}>
            <div className="preloader__content">
                <div className="preloader__logo">
                    <span className="preloader__letter preloader__letter--d">D</span>
                    <span className="preloader__letter preloader__letter--m">M</span>
                </div>
                <div className="preloader__bar">
                    <div className="preloader__bar-fill" />
                </div>
            </div>
        </div>
    )
}
