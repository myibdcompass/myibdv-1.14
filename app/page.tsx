"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  LayoutDashboard,
  Radar,
  Wand2,
  MousePointer2,
  Zap,
  Sliders,
  Handshake,
  Menu,
  X,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Apple,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import { PhoneMockupSlideshow } from "@/components/phone-mockup-slideshow"
import { AnimatedStats } from "@/components/animated-stats"
import { KineticText } from "@/components/kinetic-text"
import { AnimatedSymptomChart } from "@/components/animated-symptom-chart"
import { WaitlistForm } from "@/components/waitlist-form"

function useScrollAnimation(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold])

  return { ref, isVisible }
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)
  const heroAnimation = useScrollAnimation()
  const statsAnimation = useScrollAnimation()
  const featuresAnimation = useScrollAnimation()
  const insightsAnimation = useScrollAnimation()
  const faqAnimation = useScrollAnimation()
  const ctaAnimation = useScrollAnimation()
  const [showCookieBanner, setShowCookieBanner] = useState(false)

  useEffect(() => {
    try {
      const consent = localStorage.getItem("cookieConsent")
      if (!consent) setShowCookieBanner(true)
    } catch (e) {
      // ignore (localStorage may be unavailable)
    }
  }, [])

  function acceptCookies() {
    try {
      localStorage.setItem("cookieConsent", "accepted")
    } catch (e) {
      // ignore
    }
    setShowCookieBanner(false)
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center group animate-fade-in">
            <div className="flex items-center justify-center transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-3">
              <Image 
                src="/image001.png"
                alt="MyIBDCompass Logo"
                width={140}
                height={45}
                style={{ objectFit: 'contain', width: 'auto', maxHeight: '40px' }}
                priority
                className="transition-transform duration-500 ease-in-out"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm font-semibold text-foreground/80 transition-all duration-500 ease-in-out hover:text-foreground hover:scale-105 relative group animate-fade-in animate-delay-100"
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-500 ease-in-out group-hover:w-full" />
            </a>
            <a
              href="#insights"
              className="text-sm font-semibold text-foreground/80 transition-all hover:text-foreground hover:scale-105 relative group"
            >
              Insights
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href="#faq"
              className="text-sm font-semibold text-foreground/80 transition-all hover:text-foreground hover:scale-105 relative group"
            >
              FAQ
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href="#resources"
              className="text-sm font-semibold text-foreground/80 transition-all hover:text-foreground hover:scale-105 relative group"
            >
              Resources
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsWaitlistOpen(true)}
              className="hidden items-center gap-2 rounded-lg glass-button px-4 py-2 text-sm font-semibold transition-all hover:scale-105 lg:flex"
            >
              <svg className="h-5 w-5 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] font-medium text-foreground/70">Coming January 2026</span>
                <span className="text-sm font-bold text-foreground">Join Waitlist</span>
              </div>
            </button>
            <button
              className="lg:hidden transition-transform hover:scale-110 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="bg-white/80 backdrop-blur-sm lg:hidden">
            <nav className="container mx-auto flex flex-col gap-4 px-4 py-6">
              <a
                href="#features"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Features
              </a>
              <a
                href="#insights"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Insights
              </a>
              <a
                href="#faq"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                FAQ
              </a>
              <a
                href="#resources"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Resources
              </a>
              <div className="flex flex-col gap-3 pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setIsWaitlistOpen(true)
                  }}
                  className="flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-medium text-background transition-all hover:opacity-90 w-full"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[10px] opacity-90">Coming January 2026</span>
                    <span className="text-sm font-semibold">Join Waitlist</span>
                  </div>
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

  <section ref={heroAnimation.ref} className="container mx-auto px-0 sm:px-4 py-8 sm:py-8 md:px-6 md:py-16 lg:py-20 relative bg-white">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-6 items-center max-w-5xl mx-auto">
          <div className="flex flex-col justify-center space-y-4 md:space-y-6 lg:pr-12 text-center lg:text-left px-8 sm:px-4">
              <div className="space-y-3 md:space-y-4">
              <h1 className={`font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-4 ${heroAnimation.isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
                <div className="inline lg:block">Manage IBD</div>
                <div className="inline lg:block mt-2"> with <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent/80">clarity.</span></div>
              </h1>
              <p className={`text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0 ${heroAnimation.isVisible ? 'animate-slide-up animate-delay-200' : 'opacity-0'}`}>
                Built by gastroenterologists for patients. Track daily symptoms, identify flares early, and find food patterns that align with your body.
              </p>
            </div>

            {/* CTA Section */}
            <div className="hidden lg:block space-y-5 py-2">
              <div className={`flex flex-wrap justify-center lg:justify-start gap-3 ${heroAnimation.isVisible ? 'animate-fade-in animate-delay-300' : 'opacity-0'}`}>
                <button
                  onClick={() => setIsWaitlistOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-accent text-white px-5 py-2.5 text-sm font-semibold transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:bg-accent/90 hover:scale-[1.02] w-auto justify-center"
                >
                  <span>Join the Waitlist</span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
              <p className={`text-sm sm:text-base text-gray-600 flex items-center gap-2 justify-center lg:justify-start ${heroAnimation.isVisible ? 'animate-fade-in animate-delay-400' : 'opacity-0'}`}>
                <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-full w-full bg-accent"></span>
                </span>
                <span className="font-medium">Coming to App Store & Google Play in January 2026</span>
              </p>
            </div>
          </div>

          {/* Phone mockup section */}
          <div className="flex flex-col lg:block">
            {/* Mobile-only CTA Section - Now above the phone */}
            <div className="lg:hidden space-y-4 py-4 px-4 mb-4">
              <div className={`flex flex-wrap justify-center gap-3 ${heroAnimation.isVisible ? 'animate-fade-in animate-delay-300' : 'opacity-0'}`}>
                <button
                  onClick={() => setIsWaitlistOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-accent text-white px-5 py-2.5 text-sm font-semibold transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:bg-accent/90 hover:scale-[1.02] w-auto justify-center"
                >
                  <span>Join the Waitlist</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
              <p className={`text-sm text-gray-600 flex items-center gap-2 justify-center ${heroAnimation.isVisible ? 'animate-fade-in animate-delay-400' : 'opacity-0'}`}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-full w-full bg-accent"></span>
                </span>
                <span className="font-medium">Coming to App Store & Google Play in January 2026</span>
              </p>
            </div>
            
            <div className="relative w-full -mx-4 sm:mx-0">
              <PhoneMockupSlideshow />
            </div>
          </div>

          {/* Shared Waitlist Form */}
          <WaitlistForm isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
        </div>
      </section>


      {/* Supporters section - logos in a single row with improved responsive design */}
      <section className="w-full bg-white -mt-12 pb-4">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <h3 className="text-center text-base md:text-lg font-semibold text-gray-500 mb-4">Supported by</h3>
          <div className="grid grid-cols-2 md:flex md:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-12 mt-4">
            {/* Use files placed in public/supporters/ folder. If missing, these will show as broken images in dev but are easy to replace. */}
            <div className="flex items-center justify-center">
              <img
                src="/supporters/crohns.png"
                alt="Crohn's & Colitis Foundation"
                className="h-10 sm:h-12 md:h-14 w-auto object-contain max-w-[140px] sm:max-w-[160px] md:max-w-[180px]"
                onError={(e) => ((e.currentTarget as HTMLImageElement).src = '/placeholder-logo.png')}
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/supporters/mcmaster.png"
                alt="McMaster University"
                className="h-10 sm:h-12 md:h-16 w-auto object-contain max-w-[140px] sm:max-w-[160px] md:max-w-[180px]"
                onError={(e) => ((e.currentTarget as HTMLImageElement).src = '/placeholder-logo.png')}
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/supporters/omsa.png"
                alt="OMSA"
                className="h-12 sm:h-14 md:h-16 w-auto object-contain max-w-[140px] sm:max-w-[160px] md:max-w-[180px]"
                onError={(e) => ((e.currentTarget as HTMLImageElement).src = '/placeholder-logo.png')}
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/supporters/partner4.png"
                alt="Partner"
                className="h-12 sm:h-14 md:h-16 w-auto object-contain max-w-[140px] sm:max-w-[160px] md:max-w-[180px]"
                onError={(e) => ((e.currentTarget as HTMLImageElement).src = '/placeholder-logo.png')}
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Hidden Epidemic Section (Hybrid) */}
      <section ref={statsAnimation.ref} className="w-full bg-white py-16 md:py-24 relative overflow-hidden z-10">
        {/* Solid background with opacity instead of blur */}
        <div className="absolute -top-8 left-1/4 w-64 h-64 bg-accent/5 rounded-full opacity-50" />
        <div className="absolute -bottom-8 right-1/4 w-48 h-48 bg-accent/5 rounded-full opacity-50" />
        
        <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-20">
          <h2 className={`text-3xl md:text-4xl font-bold mb-10 text-center transform transition-all duration-500 ease-in-out ${statsAnimation.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <span className="text-accent">The Hidden Epidemic</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left mb-6">
            <div className={`rounded-2xl p-8 bg-white/50 backdrop-blur-sm flex flex-col items-center md:items-start ${statsAnimation.isVisible ? 'animate-scale-in animate-delay-100' : 'opacity-0'} hover:scale-[1.02] transition-all duration-300 hover:shadow-lg`}>
              <div className="text-3xl md:text-4xl font-extrabold text-accent mb-1">~1 in 150</div>
              <div className="text-base font-semibold text-gray-800">People live with IBD in North America</div>
            </div>
            <div className="rounded-2xl p-8 bg-white/50 backdrop-blur-sm flex flex-col items-center md:items-start animate-scale-in animate-delay-200 hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
              <div className="text-3xl md:text-4xl font-extrabold text-accent mb-1">&gt;50%</div>
              <div className="text-base font-semibold text-gray-800">Report food as a trigger or relief</div>
            </div>
            <div className="rounded-2xl p-8 bg-white/50 backdrop-blur-sm flex flex-col items-center md:items-start animate-scale-in animate-delay-300 hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
              <div className="text-3xl md:text-4xl font-extrabold text-accent mb-1">&gt;30%</div>
              <div className="text-base font-semibold text-gray-800">Experience annual symptom flares</div>
            </div>
            <div className="rounded-2xl p-8 bg-white/50 backdrop-blur-sm flex flex-col items-center md:items-start animate-scale-in animate-delay-400 hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
              <div className="text-3xl md:text-4xl font-extrabold text-accent mb-1">&gt;25%</div>
              <div className="text-base font-semibold text-gray-800">Increase in prevalence over the last decade</div>
            </div>
          </div>
          <div className="text-sm text-gray-600 mt-8 text-center max-w-2xl mx-auto">
            myIBD Compass highlights nutrition's role without hype—clarity over complexity, so patients and clinicians can talk the same language.
          </div>
        </div>
      </section>
      <section
        id="features"
        ref={featuresAnimation.ref}
        className="bg-gradient-to-b from-white via-accent/5 to-white py-16 md:py-24 relative overflow-hidden"
      >
        {/* Decorative gradient blobs */}
        <div className="absolute -top-8 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-8 right-1/4 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/3 w-56 h-56 bg-accent/5 rounded-full blur-3xl animate-float" 
          style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }} />        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="mb-16">
            <div className="flex flex-col gap-8">
              <div className="flex-1 min-w-0">
                <h2
                  className={`font-sans text-3xl md:text-4xl font-bold mb-4 transition-all duration-1000 ${
                    featuresAnimation.isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent/80">Connected Care, Between Visits</span>
                </h2>
                <p className="text-base text-gray-600 mb-4">
                  With your consent, you're registered to your clinician's roster so they can securely review your symptom trends and diet notes between clinic appointments. This helps focus visits on decisions, not recall.
                </p>
              </div>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3 mt-8 stagger-animation">
            <div className="rounded-2xl p-8 bg-white/50 backdrop-blur-sm flex flex-col h-full card-hover animate-fade-slide-up shadow-sm hover:shadow-lg transition-all duration-500 ease-in-out hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-accent/10 rounded-xl">
                  <Sparkles className="h-6 w-6 text-accent transition-transform duration-500 ease-in-out group-hover:scale-110" />
                </div>
                <span className="font-bold text-gray-900 text-lg">Built by Specialists</span>
              </div>
              <div className="text-gray-600 text-sm leading-relaxed">
                Co-designed with practicing gastroenterologists so guidance is clinically grounded, yet simple and actionable.
              </div>
            </div>
            <div className="rounded-2xl p-8 bg-white/50 backdrop-blur-sm flex flex-col h-full hover:shadow-lg transition-all duration-500 ease-in-out hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-accent/10 rounded-xl">
                  <Radar className="h-6 w-6 text-accent transition-transform duration-500 ease-in-out group-hover:scale-110" />
                </div>
                <span className="font-bold text-gray-900 text-lg">Track & Detect</span>
              </div>
              <div className="text-gray-600 text-sm leading-relaxed">
                Log pain, stools, tiredness, fatigue and receive clear signals when trends suggest a possible flare.
              </div>
            </div>
            <div className="rounded-2xl p-8 bg-white/50 backdrop-blur-sm flex flex-col h-full hover:shadow-lg transition-all duration-500 ease-in-out hover:scale-[1.02]">
              <div className="flex items-center gap-2 mb-2">
                <Wand2 className="h-6 w-6 text-accent" />
                <span className="font-bold text-gray-900 text-lg">Food that Fits You</span>
              </div>
              <div className="text-gray-700 text-sm">
                Explore patterns (low-FODMAP, Mediterranean, SCD) and see which meals correlate with better days for you.
              </div>
            </div>
          </div>
        </div>
  {/* Our Review Section */}
  <section className="w-full bg-gradient-to-b from-white via-accent/5 to-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl relative">
          {/* Decorative elements */}
          <div className="absolute -top-8 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-8 right-1/4 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
          
          <div className="relative">
            {/* Section title */}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent/80">
                Research Backed
              </span>
            </h2>

            {/* Review card */}
            <div className="rounded-2xl bg-white/50 backdrop-blur-sm p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] relative overflow-hidden">
              {/* Accent border */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-accent/80 to-accent/60" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-2xl font-bold text-gray-900">Our Review</h3>
                </div>
                
                <div className="space-y-4 mb-8">
                  <h4 className="text-xl font-bold text-gray-900">Using Diet to Treat Inflammatory Bowel Disease: A Systematic Review</h4>
                  <div className="flex flex-col gap-2">
                    <div className="text-accent font-semibold">Published in the American Journal of Gastroenterology</div>
                    <div className="text-sm text-gray-600">
                      By <span className="font-semibold text-gray-900">Alexandra Gleave, Aryan Shah, Umair Tahir, Jedid-Jah Blom, Ethan Dong, Ayush Patel, John K Marshall, Neeraj Narula</span>
                    </div>
                  </div>
                </div>

                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/39056556/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-accent text-white px-6 py-3 font-semibold text-sm shadow-sm hover:bg-accent/90 transition-colors duration-200"
                >
                  <span>Read the Full Protocol Review</span>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      </section>

  <section id="insights" ref={insightsAnimation.ref} className="py-8 md:py-10 relative overflow-hidden bg-white">
        <div className="absolute right-1/4 top-1/3 h-96 w-96 animate-float rounded-full bg-accent/5 blur-3xl" />

        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div
              className={`relative flex items-center justify-center order-2 lg:order-1 transition-opacity duration-1000 ${
                insightsAnimation.isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl glass-card border border-border">
                <AnimatedSymptomChart />
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-8 order-1 lg:order-2">
              <div className="space-y-4">
                <h2
                  className={`font-sans text-4xl font-bold text-foreground text-balance md:text-5xl transition-all duration-1000 ${
                    insightsAnimation.isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                >
                  Data at your <span className="text-gradient">fingertips</span>
                </h2>
                <p
                  className={`text-lg text-muted-foreground text-pretty transition-all duration-1000 ${
                    insightsAnimation.isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: "200ms" }}
                >
                  Real-time insights for faster decisions
                </p>
              </div>
              <div className="space-y-6">
                {[
                  {
                    icon: Zap,
                    title: "Trend Analysis",
                    description:
                      "Track patterns and correlations between symptoms and diet in real-time for better health management.",
                    delay: 400,
                  },
                  {
                    icon: Sliders,
                    title: "Real-Time Monitoring",
                    description:
                      "Get instant feedback on your dietary choices and their potential impact on your IBD symptoms.",
                    delay: 600,
                  },
                  {
                    icon: Handshake,
                    title: "Data-Driven Insights",
                    description:
                      "Make informed decisions backed by personalized analytics and historical tracking data.",
                    delay: 800,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`group flex gap-4 cursor-pointer transform transition-all duration-1000 ${
                      insightsAnimation.isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                    style={{ transitionDelay: `${item.delay}ms` }}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl glass-icon transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 relative overflow-hidden">
                      <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <item.icon className="h-6 w-6 text-accent transition-transform group-hover:scale-110 relative z-10" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1 font-sans text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Trials CTA - placed above FAQ */}
      <section className="bg-gradient-to-b from-white via-accent/5 to-white py-12 md:py-16 relative overflow-hidden">
        {/* Decorative gradient blobs to make the section pop */}
        <div className="absolute -top-12 left-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl transform -translate-x-4 animate-float" />
        <div className="absolute -bottom-14 right-10 w-72 h-72 bg-accent/8 rounded-full blur-3xl animate-float" />

        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="relative rounded-2xl bg-white/60 backdrop-blur-sm p-8 md:p-12 shadow-lg overflow-hidden">
            {/* subtle accent highlight behind the title */}
            <div className="absolute -top-20 right-24 w-56 h-56 bg-gradient-to-r from-accent/40 via-yellow-200/20 to-transparent rounded-full blur-2xl opacity-80" />

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent/80">Join clinical trials</span>
            </h2>

            <p className="text-gray-600 mb-6">Pilot the MyIBDCompass app to help improve care for others with IBD</p>

            <div className="flex justify-center">
              <button
                onClick={() => setIsWaitlistOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-accent text-white px-6 py-3 text-sm font-semibold transition-all duration-300 ease-in-out shadow-xl hover:shadow-2xl hover:bg-accent/95 hover:scale-[1.02]"
              >
                <span>Join the Waitlist</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        id="faq"
        ref={faqAnimation.ref}
        className="bg-gradient-to-b from-white via-accent/5 to-white py-16 md:py-24 relative overflow-hidden"
      >
        <div className="absolute left-1/3 top-1/2 h-96 w-96 animate-float rounded-full bg-accent/5 blur-3xl" />

        <div className="container mx-auto max-w-3xl px-4 md:px-6 relative z-10">
          <div className="mb-12 text-center">
            <h2
              className={`font-sans text-4xl font-bold text-foreground text-balance md:text-5xl transition-all duration-1000 ${
                faqAnimation.isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <span className="text-gradient">FAQs</span>
            </h2>
            <p
              className={`mt-4 text-lg text-muted-foreground transition-all duration-1000 ${
                faqAnimation.isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              Answers to questions you might have about MyIBDCompass
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              {
                question: "How does MyIBDCompass help manage IBD symptoms?",
                answer:
                  "MyIBDCompass helps you track your meals, identify trigger foods, and understand patterns between your diet and symptoms. Our evidence-based recommendations and personalized insights empower you to make informed dietary choices that support your IBD management.",
                delay: 400,
                className: "animate-slide-up animate-delay-100"
              },
              {
                question: "Is the dietary advice medically validated?",
                answer:
                  "Yes, all dietary guidelines and recommendations in MyIBDCompass are based on current scientific research and evidence-based practices for IBD management. However, always consult with your healthcare provider before making significant dietary changes.",
                delay: 500,
              },
              {
                question: "Can I use MyIBDCompass alongside my current treatment plan?",
                answer:
                  "MyIBDCompass is designed to complement your existing treatment plan. It provides valuable insights that you can share with your healthcare team to optimize your overall IBD management strategy.",
                delay: 600,
              },
              {
                question: "Is my health data secure?",
                answer:
                  "Your privacy and data security are our top priorities. We use industry-standard encryption and security measures to protect your personal health information. Your data is never shared with third parties without your explicit consent.",
                delay: 700,
              },
              {
                question: "Can I export my data to share with my doctor?",
                answer:
                  "Yes! MyIBDCompass allows you to export comprehensive reports of your food logs, symptom tracking, and insights. You can easily share these reports with your healthcare provider to facilitate more informed discussions about your treatment.",
                delay: 800,
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`transform transition-all duration-1000 ${
                  faqAnimation.isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${item.delay}ms` }}
              >
                <AccordionItem
                  value={`item-${index + 1}`}
                  className="group rounded-xl bg-white/50 backdrop-blur-sm px-8 py-2 transition-all duration-500 ease-in-out hover:shadow-lg hover:scale-[1.01]"
                >
                  <AccordionTrigger 
                    className="text-left font-sans text-lg font-semibold text-gray-800 hover:no-underline hover:text-accent transition-all duration-500 ease-in-out py-6"
                  >
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent 
                    className="text-gray-600 leading-relaxed transition-all duration-500 ease-in-out animate-fade-slide-down pb-6"
                  >
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </div>
            ))}
          </Accordion>
        </div>
      </section>
      <section id="resources" className="py-12 md:py-20 relative overflow-hidden bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8">
            <h2 className="font-sans text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2 animate-fade-in">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent/80">Meet the Team</span>
            </h2>
          </div>
          <div className="space-y-6">
            {/* Row 1: Aryan & Alexandra */}
            <div className="flex justify-center">
              <div className="grid gap-6 grid-cols-2 w-full max-w-2xl px-2">
                {[
                  { src: "/team/aryan.jpg", alt: "Aryan Shah (BSc)", name: "Aryan Shah (BSc)", role: "Co-founder" },
                  { src: "/team/alexandra.jpg", alt: "Alexandra Gleave (MD)", name: "Alexandra Gleave (MD)", role: "Co-founder" },
                ].map((member, index) => (
                  <div key={index} className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-2 sm:p-4 h-auto sm:h-[220px] md:h-[240px] lg:h-[260px] shadow-sm hover:shadow-md transition-all duration-500 ease-in-out hover:border-gray-200 animate-fade-slide-up">
                    <div className="mb-2 sm:mb-3 h-20 sm:h-28 md:h-32 lg:h-36 w-20 sm:w-28 md:w-32 lg:w-36 rounded-full bg-gray-100 overflow-hidden shadow-sm flex-shrink-0">
                      <Image src={member.src} alt={member.alt} width={112} height={112} className="w-full h-full object-cover" />
                    </div>
                    <div className="font-semibold text-gray-800 text-xs sm:text-sm md:text-base text-center mb-0.5 sm:mb-1 line-clamp-2">{member.name}</div>
                    <div className="text-[10px] sm:text-xs md:text-sm text-gray-500 text-center line-clamp-2">{member.role}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: 3 Clinical Advisors */}
            <div className="flex justify-center">
              <div className="grid gap-6 grid-cols-3 w-full max-w-2xl px-2">
                {[
                  { src: "/team/neeraj.jpg", alt: "Neeraj Narula (MD)", name: "Neeraj Narula (MD)", role: "Clinician Advisor" },
                  { src: "/team/remo.jpg", alt: "Remo Panaccione (MD)", name: "Remo Panaccione (MD)", role: "Clinician Advisor" },
                  { src: "/team/maitreyi.jpg", alt: "Maitreyi Raman (MD)", name: "Maitreyi Raman (MD)", role: "Clinician Advisor" },
                ].map((member, index) => (
                  <div key={index} className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-2 sm:p-4 h-auto sm:h-[220px] md:h-[240px] lg:h-[260px] shadow-sm hover:shadow-md transition-all duration-500 ease-in-out hover:border-gray-200 animate-fade-slide-up">
                    <div className="mb-2 sm:mb-3 h-20 sm:h-28 md:h-32 lg:h-36 w-20 sm:w-28 md:w-32 lg:w-36 rounded-full bg-gray-100 overflow-hidden shadow-sm flex-shrink-0">
                      <Image src={member.src} alt={member.alt} width={112} height={112} className="w-full h-full object-cover" />
                    </div>
                    <div className="font-semibold text-gray-800 text-xs sm:text-sm md:text-base text-center mb-0.5 sm:mb-1 line-clamp-2">{member.name}</div>
                    <div className="text-[10px] sm:text-xs md:text-sm text-gray-500 text-center line-clamp-2">{member.role}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 3: Prangad, Jasmine, Justine */}
            <div className="flex justify-center">
              <div className="grid gap-6 grid-cols-3 w-full max-w-2xl px-2">
                {[
                  { src: "/team/prangad.jpg", alt: "Prangad Gupta", name: "Prangad Gupta", role: "Clinical Validation and Operations" },
                  { src: "/team/jasmine.jpg", alt: "Jasmine Zangeneh", name: "Jasmine Zangeneh", role: "Senior Engineer" },
                  { src: "/team/justin.jpg", alt: "Justine Mangaliman", name: "Justine Mangaliman", role: "Full Stack Developer" },
                ].map((member, index) => (
                  <div key={index} className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-2 sm:p-4 h-auto sm:h-[220px] md:h-[240px] lg:h-[260px] shadow-sm hover:shadow-md transition-all duration-500 ease-in-out hover:border-gray-200 animate-fade-slide-up">
                    <div className="mb-2 sm:mb-3 h-20 sm:h-28 md:h-32 lg:h-36 w-20 sm:w-28 md:w-32 lg:w-36 rounded-full bg-gray-100 overflow-hidden shadow-sm flex-shrink-0">
                      <Image src={member.src} alt={member.alt} width={112} height={112} className="w-full h-full object-cover" />
                    </div>
                    <div className="font-semibold text-gray-800 text-xs sm:text-sm md:text-base text-center mb-0.5 sm:mb-1 line-clamp-2">{member.name}</div>
                    <div className="text-[10px] sm:text-xs md:text-sm text-gray-500 text-center line-clamp-2">{member.role}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 4: Aarav & Liam */}
            <div className="flex justify-center">
              <div className="grid gap-6 grid-cols-2 w-full max-w-2xl px-2">
                {[
                  { src: "/team/Liam.JPG", alt: "Liam", name: "Liam Sarjeant", role: "Front End Developer" },
                  { src: "/team/aarav.jpg", alt: "Aarav Mazumder", name: "Aarav Mazumder", role: "Junior Technical Intern" },
                ].map((member, index) => (
                  <div key={index} className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-2 sm:p-4 h-auto sm:h-[220px] md:h-[240px] lg:h-[260px] shadow-sm hover:shadow-md transition-all duration-500 ease-in-out hover:border-gray-200 animate-fade-slide-up">
                    <div className="mb-2 sm:mb-3 h-20 sm:h-28 md:h-32 lg:h-36 w-20 sm:w-28 md:w-32 lg:w-36 rounded-full bg-gray-100 overflow-hidden shadow-sm flex-shrink-0">
                      <Image src={member.src} alt={member.alt} width={112} height={112} className="w-full h-full object-cover" />
                    </div>
                    <div className="font-semibold text-gray-800 text-xs sm:text-sm md:text-base text-center mb-0.5 sm:mb-1 line-clamp-2">{member.name}</div>
                    <div className="text-[10px] sm:text-xs md:text-sm text-gray-500 text-center line-clamp-2">{member.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={ctaAnimation.ref}
        className="py-12 md:py-20 relative overflow-hidden bg-white"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div
            className={`relative overflow-hidden rounded-3xl glass-cta px-8 py-16 text-center border border-gray-200/20 md:px-16 md:py-24 transform transition-all duration-1000 shadow-xl backdrop-blur-lg ${
              ctaAnimation.isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <div className="relative z-10 mx-auto max-w-3xl space-y-6">
              <h2
                className={`font-sans text-4xl font-bold text-white text-balance md:text-5xl transition-all duration-1000 ${
                  ctaAnimation.isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                Ready to take control of your IBD journey?
              </h2>
              <p
                className={`text-lg text-white/95 text-pretty md:text-xl font-medium transition-all duration-1000 ${
                  ctaAnimation.isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
                Join our waitlist for early access
              </p>
              <div
                className={`flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row transition-all duration-1000 ${
                  ctaAnimation.isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: "600ms" }}
              >
                <button
                  onClick={() => setIsWaitlistOpen(true)}
                  className="group inline-flex items-center justify-center gap-3 rounded-xl glass-button-inverse px-6 py-4 text-base font-semibold transition-all hover:scale-105 hover:shadow-glow"
                >
                  <svg className="h-7 w-7 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-xs font-medium opacity-80">Coming January 2026</span>
                    <span className="text-lg font-bold">Join Waitlist</span>
                  </div>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl animate-pulse-slow" />
            <div
              className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl animate-pulse-slow"
              style={{ animationDelay: "1s" }}
            />
          </div>
        </div>
      </section>

  <footer className="bg-gradient-to-b from-white to-accent/5 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="flex items-center justify-center">
                  <Image 
                    src="/image001.png"
                    alt="MyIBDCompass Logo"
                    width={150}
                    height={50}
                    style={{ objectFit: 'contain', width: 'auto' }}
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your trusted companion for managing IBD through nutrition.
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-sans text-sm font-semibold text-foreground">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="transition-colors hover:text-foreground">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-foreground">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-foreground">
                    Download
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-sans text-sm font-semibold text-foreground">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="transition-colors hover:text-foreground">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-foreground">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-foreground">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-sans text-sm font-semibold text-foreground">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="transition-colors hover:text-foreground">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-foreground">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-foreground">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 pt-8 md:flex-row">
            <p className="text-sm text-muted-foreground">© 2025 MyIBDCompass. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
      {/* Cookie consent banner */}
      {showCookieBanner && (
        <div
          role="dialog"
          aria-live="polite"
          className="fixed right-6 bottom-6 z-50 w-64 max-w-xs bg-white/95 border border-gray-200 shadow-md rounded-md px-3 py-2 flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-accent/10 flex items-center justify-center text-accent text-[12px] font-semibold">i</div>
            <div className="text-sm text-gray-700">Cookies</div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={acceptCookies}
              className="rounded-md bg-accent text-white px-3 py-1 text-sm font-semibold"
            >
              Accept
            </button>
            <button
              onClick={() => {
                try {
                  localStorage.setItem("cookieConsent", "dismissed")
                } catch (e) {
                  // ignore
                }
                setShowCookieBanner(false)
              }}
              aria-label="Close cookie banner"
              className="text-sm text-muted-foreground"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      <div className="fixed bottom-2 right-4 text-[8px] text-gray-300 pointer-events-none opacity-40">
        V1.13
      </div>
    </div>
  )
}
