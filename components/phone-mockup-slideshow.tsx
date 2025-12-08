"use client"

export function PhoneMockupSlideshow() {
  return (
    <div className="relative flex items-center justify-center min-h-[500px] sm:min-h-[500px] md:min-h-[600px] -mx-4 sm:mx-0 py-0 sm:py-6 md:py-8">
      {/* Main phone mockup with app UI */}
      <div className="relative w-screen sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[700px] px-0 sm:px-0">
        <img
          src="/app-screens/HeroDesigne.png"
          alt="MyIBD Compass app interface showing wellness score, symptom tracking, and meal planning"
          className="w-full h-auto drop-shadow-xl sm:drop-shadow-2xl"
        />
        
        {/* Ambient glow effect */}
        <div 
          className="absolute -inset-2 sm:-inset-4 bg-gradient-to-tr from-purple-500/10 sm:from-purple-500/20 via-transparent to-orange-500/10 sm:to-orange-500/20 blur-xl sm:blur-2xl -z-10"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
