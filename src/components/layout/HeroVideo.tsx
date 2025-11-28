'use client'

import { useEffect, useRef } from 'react'

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      const duration = video.duration
      const currentTime = video.currentTime

      // Fade out in the last 1.5 seconds
      if (duration - currentTime < 1.5) {
        const fadeAmount = (duration - currentTime) / 1.5
        video.style.opacity = String(fadeAmount * 0.2) // 0.2 is the base opacity
      } 
      // Fade in during the first 1.5 seconds
      else if (currentTime < 1.5) {
        const fadeAmount = currentTime / 1.5
        video.style.opacity = String(fadeAmount * 0.2) // 0.2 is the base opacity
      } 
      else {
        video.style.opacity = '0.2'
      }
    }

    video.addEventListener('timeupdate', handleTimeUpdate)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [])

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      poster="/assets/images/video-poster.jpg"
      className="hidden md:block w-full h-full object-cover transition-opacity duration-1000"
      style={{
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
        opacity: 0.2
      }}
    >
      <source src="/assets/images/hero-video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}
