"use client"

import { useEffect, useRef } from "react"

interface KineticTextProps {
  text: string
  className?: string
  delay?: number
}

export function KineticText({ text, className = "", delay = 0 }: KineticTextProps) {
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = textRef.current
    if (!element) return

    const letters = element.querySelectorAll(".letter")
    letters.forEach((letter, index) => {
      const el = letter as HTMLElement
      el.style.animationDelay = `${delay + index * 0.05}s`
    })
  }, [delay])

  return (
    <span ref={textRef} className={className}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="letter inline-block animate-kinetic-letter"
          style={{ animationDelay: `${delay + index * 0.05}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  )
}
