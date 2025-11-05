import { useEffect, useRef } from 'react'
import './RedStarsBackground.css'

const RedStarsBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true })
    if (!ctx) return

    let animationId
    let isAnimating = false

    // Set canvas size with device pixel ratio for crisp rendering
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      
      ctx.scale(dpr, dpr)
      
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
    }

    // Red Star class with improved performance
    class RedStar {
      constructor() {
        this.reset()
        this.y = Math.random() * (canvas.height || window.innerHeight)
      }

      reset() {
        this.x = Math.random() * (canvas.width || window.innerWidth)
        this.y = -10
        this.size = Math.random() * 2.5 + 0.5
        this.speed = Math.random() * 1.5 + 0.3
        this.opacity = Math.random() * 0.6 + 0.2
        this.twinkleSpeed = Math.random() * 0.015 + 0.008
        this.twinkle = 0
      }

      update() {
        this.y += this.speed
        this.twinkle += this.twinkleSpeed
        
        // Reset star when it goes off screen
        const canvasHeight = canvas.height || window.innerHeight
        if (this.y > canvasHeight + 10) {
          this.reset()
        }
      }

      draw() {
        const twinkleOpacity = this.opacity + Math.sin(this.twinkle) * 0.2
        ctx.save()
        ctx.globalAlpha = Math.max(0.1, twinkleOpacity)
        ctx.fillStyle = '#ff4444'
        ctx.shadowBlur = 8
        ctx.shadowColor = '#ff4444'
        
        // Draw red star
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        
        // Add sparkle effect for larger stars
        if (this.size > 1.5) {
          ctx.beginPath()
          ctx.moveTo(this.x - this.size * 1.5, this.y)
          ctx.lineTo(this.x + this.size * 1.5, this.y)
          ctx.moveTo(this.x, this.y - this.size * 1.5)
          ctx.lineTo(this.x, this.y + this.size * 1.5)
          ctx.strokeStyle = '#ff4444'
          ctx.lineWidth = 0.3
          ctx.stroke()
        }
        
        ctx.restore()
      }
    }

    // Create red stars
    const stars = []
    const numStars = 80

    for (let i = 0; i < numStars; i++) {
      stars.push(new RedStar())
    }

    // Animation loop with performance optimization
    const animate = () => {
      if (!canvas || !ctx) return
      
      isAnimating = true
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      stars.forEach(star => {
        star.update()
        star.draw()
      })
      
      animationId = requestAnimationFrame(animate)
    }

    // Throttled resize handler
    let resizeTimeout
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resizeCanvas, 100)
    }

    // Initialize with delay to ensure DOM is ready
    const initAnimation = () => {
      resizeCanvas()
      if (!isAnimating) {
        animate()
      }
    }

    // Start animation after a brief delay
    const initTimeout = setTimeout(initAnimation, 100)

    // Event listeners
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      if (resizeTimeout) {
        clearTimeout(resizeTimeout)
      }
      if (initTimeout) {
        clearTimeout(initTimeout)
      }
      isAnimating = false
    }
  }, [])

  return <canvas ref={canvasRef} className="red-stars-background" />
}

export default RedStarsBackground