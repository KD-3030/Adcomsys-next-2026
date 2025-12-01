'use client'

import { useEffect, useRef, useState } from 'react'

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)

  // Defer video loading until after initial paint
  useEffect(() => {
    // Use requestIdleCallback or setTimeout to defer loading
    const timer = setTimeout(() => {
      setShouldLoad(true)
    }, 100) // Small delay to let the page render first

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      setIsLoaded(true)
    }

    const handleTimeUpdate = () => {
      const duration = video.duration
      const currentTime = video.currentTime

      // Fade out in the last 1.5 seconds
      if (duration - currentTime < 1.5) {
        const fadeAmount = (duration - currentTime) / 1.5
        video.style.opacity = String(fadeAmount * 0.2)
      } 
      // Fade in during the first 1.5 seconds
      else if (currentTime < 1.5) {
        const fadeAmount = currentTime / 1.5
        video.style.opacity = String(fadeAmount * 0.2)
      } 
      else {
        video.style.opacity = '0.2'
      }
    }

    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('timeupdate', handleTimeUpdate)

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [shouldLoad])

  if (!shouldLoad) {
    return (
      <div 
        className="hidden md:block w-full h-full bg-linear-to-br from-brand-navy to-brand-black"
        style={{ opacity: 0.2 }}
      />
    )
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      className={`hidden md:block w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? '' : 'opacity-0'}`}
      style={{
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
        opacity: isLoaded ? 0.2 : 0
      }}
    >
      <source src="/assets/images/hero-video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}

