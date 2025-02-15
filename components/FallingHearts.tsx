import { motion } from 'framer-motion'
import { useMemo, useState, useEffect } from 'react'

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    const debouncedResize = debounce(handleResize, 250)
    window.addEventListener('resize', debouncedResize)
    return () => window.removeEventListener('resize', debouncedResize)
  }, [])

  return windowSize
}

const FallingHearts = () => {
  const [mounted, setMounted] = useState(false)
  const { width, height } = useWindowSize()
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setMounted(true)
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const heartsCount = useMemo(() => {
    if (!mounted) return 0
    const screenArea = width * height
    return Math.floor(screenArea / 10000)
  }, [width, height, mounted])

  const hearts = useMemo(() => 
    Array.from({ length: heartsCount }, (_, i) => {
      const size = 8 // Fixed size to avoid hydration mismatch
      const duration = 20 // Fixed duration
      const rotation = 0 // Fixed initial rotation
      const delay = -i * 2 // Deterministic delay based on index
      const opacity = 1 // Fixed opacity
      
      return {
        id: i,
        size,
        duration,
        rotation,
        delay,
        opacity,
        x: (width / heartsCount) * i, // Deterministic x position
      }
    }), 
  [heartsCount, width])

  if (!mounted || reducedMotion) return null

  return (
    <div className="fixed inset-0 pointer-events-none -z-[1] overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{
            y: -20,
            x: heart.x,
            opacity: heart.opacity,
            rotate: heart.rotation,
          }}
          animate={{
            y: height + 50,
            x: heart.x + 50, // Fixed drift amount
            rotate: heart.rotation + 45,
            opacity: heart.opacity * 0.5,
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            ease: [0.4, 0, 0.6, 1],
            repeatType: 'loop',
            delay: heart.delay,
          }}
          className="absolute will-change-transform"
          style={{
            filter: 'drop-shadow(0 2px 4px rgba(255,50,150,0.2))',
          }}
        >
          <HeartIcon
            size={heart.size}
            className="transition-colors text-primary duration-300 hover:text-red-400"
          />
        </motion.div>
      ))}
    </div>
  )
}

// Utility function for debounce
type DebouncedFunction = (...args: unknown[]) => void

const debounce = (func: DebouncedFunction, wait: number) => {
  let timeout: NodeJS.Timeout
  return (...args: unknown[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// HeartIcon component with improved SVG
const HeartIcon = ({ size, className }: { size: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={{
      width: `${size}px`,
      height: `${size}px`,
      transition: 'all 0.3s ease',
    }}
  >
    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
  </svg>
)

export default FallingHearts