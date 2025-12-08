"use client"

import { useEffect, useRef, useState } from "react"

interface StatItemProps {
  value: string
  label: string
  delay: number
}

function StatItem({ value, label, delay }: StatItemProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`group relative transform transition-all duration-1000 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-lg transition-all duration-500 hover:shadow-2xl hover:scale-105">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative z-10 text-center">
          <div
            className={`mb-3 font-sans text-5xl font-black text-foreground transition-all duration-700 md:text-6xl ${
              isVisible ? "scale-100" : "scale-50"
            }`}
            style={{ transitionDelay: `${delay + 200}ms` }}
          >
            {value}
          </div>
          <div className="font-sans text-base font-medium text-muted-foreground md:text-lg">{label}</div>
        </div>
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-accent/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
        <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-accent/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
      </div>
    </div>
  )
}

export function AnimatedStats() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-border bg-muted/30 py-20 md:py-32">
      {/* Animated background elements */}
      <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-float rounded-full bg-accent/5 blur-3xl" />
      <div
        className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-float rounded-full bg-accent/5 blur-3xl"
        style={{ animationDelay: "2s" }}
      />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <div
            className={`mb-4 inline-block transform transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <span className="rounded-full bg-accent/10 px-4 py-2 font-sans text-sm font-semibold text-accent">
              Why Care
            </span>
          </div>
          <h2
            className={`font-sans text-5xl font-black text-foreground text-balance transition-all duration-1000 md:text-6xl lg:text-7xl ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            A Hidden Epidemic
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <StatItem value="3–4M" label="Living with IBD (NA)" delay={400} />
          <StatItem value="25%" label="Rise in 10 Years" delay={600} />
          <StatItem value="60–75%" label="Still Facing Symptoms" delay={800} />
        </div>
      </div>
    </section>
  )
}
