import React from 'react'

const Explore = () => {
  return (
<div className="relative h-[100vh] flex items-center justify-center bg-[#0f0c29] overflow-hidden text-white">
  {/* Wave Layer */}
  <div className="absolute top-0 left-0 w-full h-full animate-waves z-0">
    <svg
      className="w-full h-full"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
    >
      <path
        fill="#302b63"
        fillOpacity="1"
        d="M0,192L60,192C120,192,240,192,360,202.7C480,213,600,235,720,218.7C840,203,960,149,1080,144C1200,139,1320,181,1380,202.7L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
      >
        <animate
          attributeName="d"
          dur="8s"
          repeatCount="indefinite"
          values="
          M0,160L60,180C120,200,240,240,360,245C480,250,600,210,720,200C840,190,960,230,1080,220C1200,210,1320,150,1380,130L1440,110L1440,0L0,0Z;
          
          M0,190L60,210C120,230,240,200,360,195C480,190,600,240,720,240C840,240,960,190,1080,190C1200,190,1320,240,1380,240L1440,240L1440,0L0,0Z;
          
          M0,160L60,180C120,200,240,240,360,245C480,250,600,210,720,200C840,190,960,230,1080,220C1200,210,1320,150,1380,130L1440,110L1440,0L0,0Z
          "
        />
      </path>
    </svg>
  </div>

  {/* Content */}
  <div className="z-10 text-center">
    <h1 className="text-4xl font-bold">Community  🌊</h1>
    <p className="mt-4 text-lg">Coming soon...</p>
  </div>
</div>
  )
}

export default Explore