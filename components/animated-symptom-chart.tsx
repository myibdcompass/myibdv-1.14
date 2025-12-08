"use client"

import { useEffect, useState, useRef } from "react"

const symptomData = [
  { day: "Mon", pain: 2, bloating: 1, fatigue: 4 },
  { day: "Tue", pain: 1, bloating: 2, fatigue: 3 },
  { day: "Wed", pain: 4, bloating: 2, fatigue: 3 },
  { day: "Thu", pain: 3, bloating: 3, fatigue: 2 },
  { day: "Fri", pain: 1, bloating: 4, fatigue: 2 },
  { day: "Sat", pain: 3, bloating: 2, fatigue: 1 },
  { day: "Sun", pain: 4, bloating: 1, fatigue: 4 },
]

const maxValue = 5
const chartHeight = 500
const chartWidth = 900
const padding = 80

export function AnimatedSymptomChart() {
  const [isVisible, setIsVisible] = useState(false)
  const [pointProgress, setPointProgress] = useState<number[]>(new Array(symptomData.length).fill(0))
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
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

  useEffect(() => {
    if (isVisible) {
      const duration = 3000
      const pointDelay = 150 // Delay between points
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        const newProgress = symptomData.map((_, index) => {
          const pointStart = index * pointDelay
          const pointElapsed = Math.max(0, elapsed - pointStart)
          const pointProgress = Math.min(pointElapsed / (duration - (symptomData.length - 1) * pointDelay), 1)
          // Cubic easing for each point
          return pointProgress < 0.5 
            ? 4 * pointProgress * pointProgress * pointProgress 
            : 1 - Math.pow(-2 * pointProgress + 2, 3) / 2
        })

        setPointProgress(newProgress)

        if (elapsed < duration + (symptomData.length - 1) * pointDelay) {
          requestAnimationFrame(animate)
        }
      }

      animate()
    }
  }, [isVisible])

  const getYPosition = (value: number, progress: number) => {
    const startY = chartHeight - padding
    const targetY = chartHeight - padding - (value / maxValue) * (chartHeight - padding * 2)
    return startY + (targetY - startY) * progress
  }

  const getXPosition = (index: number) => {
    const spacing = (chartWidth - padding * 2) / (symptomData.length - 1)
    return padding + index * spacing
  }

  const createPath = (dataKey: "pain" | "bloating" | "fatigue") => {
    const points = symptomData.map((d, i) => ({
      x: getXPosition(i),
      y: getYPosition(d[dataKey], pointProgress[i]),
    }))

    if (points.length === 0) return ""

    let path = `M ${points[0].x} ${points[0].y}`

    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i].x} ${points[i].y}`
    }

    return path
  }

  const colors = {
    pain: "#ef4444",
    bloating: "#f59e0b",
    fatigue: "#6366f1",
  }

  return (
    <div ref={ref} className="relative w-full flex items-center justify-center py-8">
      <div className="relative w-full">
        <h3 className="text-3xl font-bold text-foreground mb-8 text-center">Symptom Trends</h3>

        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-auto"
          style={{ filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))" }}
        >
          {/* Grid lines */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <line
              key={i}
              x1={padding}
              y1={getYPosition(i, 1)} // Grid lines are always fully visible
              x2={chartWidth - padding}
              y2={getYPosition(i, 1)}
              stroke="#d1d5db"
              strokeWidth="1.5"
              strokeDasharray="6 6"
              opacity={0.4}
            />
          ))}

          {/* Pain line */}
          <path
            d={createPath("pain")}
            fill="none"
            stroke={colors.pain}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Bloating line */}
          <path
            d={createPath("bloating")}
            fill="none"
            stroke={colors.bloating}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Fatigue line */}
          <path
            d={createPath("fatigue")}
            fill="none"
            stroke={colors.fatigue}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {symptomData.map((d, i) => (
            <g key={i}>
              {/* Pain point */}
              <circle
                cx={getXPosition(i)}
                cy={getYPosition(d.pain, pointProgress[i])}
                r="10"
                fill={colors.pain}
                opacity={pointProgress[i]}
                style={{
                  transition: "opacity 0.5s ease-out",
                }}
              />
              {/* Bloating point */}
              <circle
                cx={getXPosition(i)}
                cy={getYPosition(d.bloating, pointProgress[i])}
                r="10"
                fill={colors.bloating}
                opacity={pointProgress[i]}
                style={{
                  transition: "opacity 0.5s ease-out",
                }}
              />
              {/* Fatigue point */}
              <circle
                cx={getXPosition(i)}
                cy={getYPosition(d.fatigue, pointProgress[i])}
                r="10"
                fill={colors.fatigue}
                opacity={pointProgress[i]}
                style={{
                  transition: "opacity 0.5s ease-out",
                }}
              />
            </g>
          ))}

          {/* X-axis labels */}
          {symptomData.map((d, i) => (
            <text
              key={i}
              x={getXPosition(i)}
              y={chartHeight - 25}
              textAnchor="middle"
              className="text-base fill-foreground/70 font-semibold"
              opacity={pointProgress[i]}
            >
              {d.day}
            </text>
          ))}
        </svg>

        {/* Legend */}
        <div className="flex items-center justify-center gap-10 mt-10">
          {[
            { label: "Pain", color: colors.pain },
            { label: "Bloating", color: colors.bloating },
            { label: "Fatigue", color: colors.fatigue },
          ].map((item, i) => (
            <div
              key={item.label}
              className="flex items-center gap-3"
              style={{
                opacity: Math.max(...pointProgress), // Show legend based on maximum point progress
                transition: "opacity 0.8s ease-out",
              }}
            >
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-lg font-semibold text-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
