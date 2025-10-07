import { useEffect, useRef } from 'react'
import './StarryBackground.css'

const StarryBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Star class
    class Star {
      constructor() {
        this.reset()
        this.y = Math.random() * canvas.height
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = -10
        this.size = Math.random() * 3 + 1
        this.speed = Math.random() * 2 + 0.5
        this.opacity = Math.random() * 0.8 + 0.2
        this.twinkleSpeed = Math.random() * 0.02 + 0.01
        this.twinkle = 0
      }

      update() {
        this.y += this.speed
        this.twinkle += this.twinkleSpeed
        
        // Reset star when it goes off screen
        if (this.y > canvas.height + 10) {
          this.reset()
        }
      }

      draw() {
        const twinkleOpacity = this.opacity + Math.sin(this.twinkle) * 0.3
        ctx.save()
        ctx.globalAlpha = Math.max(0.1, twinkleOpacity)
        ctx.fillStyle = '#ffffff'
        ctx.shadowBlur = 10
        ctx.shadowColor = '#ffffff'
        
        // Draw star as a diamond/cross shape
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        
        // Add sparkle effect for larger stars
        if (this.size > 2) {
          ctx.beginPath()
          ctx.moveTo(this.x - this.size * 2, this.y)
          ctx.lineTo(this.x + this.size * 2, this.y)
          ctx.moveTo(this.x, this.y - this.size * 2)
          ctx.lineTo(this.x, this.y + this.size * 2)
          ctx.strokeStyle = '#ffffff'
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
        
        ctx.restore()
      }
    }

    // Create stars
    const stars = []
    const numStars = 150

    for (let i = 0; i < numStars; i++) {
      stars.push(new Star())
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      stars.forEach(star => {
        star.update()
        star.draw()
      })
      
      animationId = requestAnimationFrame(animate)
    }

    // Initialize
    resizeCanvas()
    animate()

    // Event listeners
    window.addEventListener('resize', resizeCanvas)

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="starry-background" />
}

export default StarryBackground