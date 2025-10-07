import { useEffect, useRef } from 'react'
import './RedStarsBackground.css'

const RedStarsBackground = () => {
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

    // Red Star class
    class RedStar {
      constructor() {
        this.reset()
        this.y = Math.random() * canvas.height
      }

      reset() {
        this.x = Math.random() * canvas.width
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
        if (this.y > canvas.height + 10) {
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

  return <canvas ref={canvasRef} className="red-stars-background" />
}

export default RedStarsBackground