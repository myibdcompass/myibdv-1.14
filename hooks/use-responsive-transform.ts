"use client"

import { useState, useEffect } from 'react'

export function useResponsiveTransform() {
  const [transform, setTransform] = useState('')
  
  useEffect(() => {
    const updateTransform = () => {
      const isLargeScreen = window.innerWidth >= 640
      setTransform(
        isLargeScreen 
          ? 'perspective(1000px) rotateY(-8deg) rotateX(2deg) scale(1)'
          : ''
      )
    }

    updateTransform()
    window.addEventListener('resize', updateTransform)
    return () => window.removeEventListener('resize', updateTransform)
  }, [])

  return transform
}