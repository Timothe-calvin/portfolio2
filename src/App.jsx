/*
 * EmailJS Configuration Instructions:
 * 1. Sign up at https://www.emailjs.com/
 * 2. Create a new service (Gmail, Outlook, etc.)
 * 3. Create an email template
 * 4. Get your Service ID, Template ID, and Public Key
 * 5. Update the values in the .env file
 * 
 * Template variables to use in EmailJS:
 * - {{name}} - sender's name
 * - {{email}} - sender's email  
 * - {{message}} - sender's message
 */

import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import StarryBackground from './components/StarryBackground'
import RedStarsBackground from './components/RedStarsBackground'
import profileImage from './assets/e99ad5bd-0495-4aab-a27b-d378f8fad294.jpg'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')
  const formRef = useRef()

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setSubmitStatus('')

    try {
      // Using environment variables for EmailJS configuration
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      
      setSubmitStatus('success')
      setFormData({ name: '', message: '' })
      formRef.current.reset()
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus('error')
    } finally {
      setIsLoading(false)
    }
  }

  const projects = [
    {
      title: "A Space Bot - Discord Bot & Website",
      description: "A comprehensive Discord bot website featuring A Space Bot with moderation tools, Bible commands, AI chat, voice controls, and fun activities. Includes full website with privacy policy, terms of service, and command documentation.",
      technologies: ["HTML5", "CSS3", "JavaScript", "Node.js", "Discord.js", "AI APIs"],
      link: "https://github.com/Timothe-calvin/A-Space"
    },
    {
      title: "Advanced Discord Bot with Music & AI",
      description: "A feature-rich Discord bot built with Node.js featuring music streaming, AI-powered chat responses, slash commands, Bible integration, and comprehensive error handling. Includes music queue management and OpenRouter AI integration.",
      technologies: ["Node.js", "Discord.js", "OpenRouter AI", "Play-dl", "RESTful APIs"],
      link: "https://github.com/Timothe-calvin/bot"
    },
    {
      title: "Discord Bot Hub - Multi-Bot Platform",
      description: "A professional website showcasing multiple Discord bots including 'How To Make', 'Space Bot', and 'Jokes & Facts'. Features responsive design, command documentation, legal pages, and bot invitation systems.",
      technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Font Awesome"],
      link: "https://github.com/Timothe-calvin/timothe-calvins.github.io"
    },
    {
      title: "SafeSpace - Personal Portfolio",
      description: "A modern, responsive personal portfolio website built with React and Vite. Features dark/light mode, animated backgrounds, contact forms with EmailJS integration, and professional resume display with fullscreen capabilities.",
      technologies: ["React", "Vite", "EmailJS", "CSS3", "Responsive Design", "Firebase"],
      link: "https://github.com/Timothe-calvin/portfolio",
      liveDemo: "https://asafespace.neocities.org/"
    }
  ]

  const skills = [
    { name: "HTML5 & CSS3", level: 95 },
    { name: "JavaScript", level: 85 },
    { name: "React", level: 80 },
    { name: "Node.js", level: 75 },
    { name: "Discord.js", level: 85 },
    { name: "Git & GitHub", level: 90 },
    { name: "Vite & Tailwind", level: 80 },
    { name: "RESTful APIs", level: 75 }
  ]

  const certifications = [
    {
      title: "Get Started with Cloud Native, DevOps, Agile, and NoSQL",
      issuer: "IBM",
      date: "Sep 2025",
      credentialId: "AL1YHEZ9XD23",
      description: "Comprehensive understanding of modern cloud-native development practices, DevOps methodologies, Agile frameworks, and NoSQL database technologies."
    },
    {
      title: "Introduction to Containers w/ Docker, Kubernetes & OpenShift",
      issuer: "IBM",
      date: "Sep 2025",
      credentialId: "39HFVGPQ246A",
      description: "Hands-on experience with containerization technologies including Docker, Kubernetes orchestration, and OpenShift platform management."
    },
    {
      title: "Developing Back-End Apps with Node.js and Express",
      issuer: "IBM",
      date: "Aug 2025",
      credentialId: "HFFJSDGW2ALX",
      description: "Advanced backend development skills using Node.js runtime and Express.js framework for building scalable server-side applications."
    },
    {
      title: "Getting Started with Git and GitHub",
      issuer: "IBM",
      date: "Aug 2025",
      credentialId: "NALVMRCWRN8C",
      description: "Version control mastery using Git and GitHub for collaborative software development and project management."
    },
    {
      title: "Introduction to HTML, CSS, & JavaScript",
      issuer: "IBM",
      date: "Aug 2025",
      credentialId: "7LW6MXVAXKC8",
      description: "Foundation in web development technologies including HTML5 structure, CSS3 styling, and JavaScript programming fundamentals."
    },
    {
      title: "Introduction to Software Engineering",
      issuer: "IBM",
      date: "Aug 2025",
      credentialId: "JX90W1LF1NEZ",
      description: "Software development lifecycle, engineering principles, methodologies, and best practices for professional software development."
    },
    {
      title: "JavaScript Programming Essentials",
      issuer: "IBM",
      date: "Aug 2025",
      credentialId: "672L8MP387NA",
      description: "Advanced JavaScript programming concepts, ES6+ features, asynchronous programming, and modern development techniques."
    }
  ]

  return (
    <div className="App">
      <StarryBackground />
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <h2>TC Portfolio</h2>
          </div>
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <a href="#home" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Home
            </a>
            <a href="#about" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              About
            </a>
            <a href="#skills" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Skills
            </a>
            <a href="#certifications" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Certifications
            </a>
            <a href="#projects" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Projects
            </a>
            <a href="#contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Contact
            </a>
          </div>
          <div className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-container">
          <div className="hero-grid">
            <div className="hero-content">
              <h1 className="hero-title">
                Hello, I'm <span className="highlight">{import.meta.env.VITE_USER_NAME || 'Timothe Calvin'}</span>
              </h1>
              <h2 className="hero-subtitle">Full-Stack Developer & Bot Creator</h2>
              <p className="hero-description">
                I'm a passionate developer specializing in React, JavaScript, and modern web technologies. 
                I create responsive websites, Discord bots, and innovative web applications with clean, efficient code.
                With experience in AI integration, RESTful APIs, and modern frameworks, I bring ideas to life through code.
              </p>
              <div className="hero-buttons">
                <a href="#projects" className="btn btn-primary">View My Work</a>
                <a href="#contact" className="btn btn-secondary">Get In Touch</a>
              </div>
            </div>
            <div className="hero-image">
              <div className="profile-image">
                <img 
                  src={profileImage} 
                  alt="Timothe Calvin - Full-Stack Developer" 
                  className="profile-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <RedStarsBackground />
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-grid">
              <div className="about-text">
                <h3>My Journey</h3>
                <p>
                  I'm a versatile and reliable full-stack developer with 3+ years of experience in customer support, 
                  food service, and sales, now successfully transitioning into web development. My unique background 
                  gives me strong communication skills and a user-focused approach to development.
                </p>
                <p>
                  I specialize in HTML5, CSS3, JavaScript, React, Node.js, and modern frameworks like Vite and Tailwind CSS. 
                  My experience spans from creating responsive web applications to developing sophisticated Discord bots 
                  with AI integration and music streaming capabilities.
                </p>
              </div>
              <div className="about-highlights">
                <h3>What I Bring</h3>
                <div className="highlights-grid">
                  <div className="highlight-item">
                    <i className="fas fa-robot"></i>
                    <h4>Bot Development</h4>
                    <p>Advanced Discord bots with AI, music, and moderation features</p>
                  </div>
                  <div className="highlight-item">
                    <i className="fas fa-code"></i>
                    <h4>Web Applications</h4>
                    <p>Modern React apps with real-time features and responsive design</p>
                  </div>
                  <div className="highlight-item">
                    <i className="fas fa-database"></i>
                    <h4>API Integration</h4>
                    <p>RESTful APIs, third-party integrations, and database management</p>
                  </div>
                  <div className="highlight-item">
                    <i className="fas fa-mobile-alt"></i>
                    <h4>Responsive Design</h4>
                    <p>Mobile-first approach with cross-browser compatibility</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <div className="container">
          <h2 className="section-title">Technical Skills</h2>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="skill-name">{skill.name}</div>
                <div className="skill-bar">
                  <div 
                    className="skill-progress" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <div className="skill-percentage">{skill.level}%</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="certifications">
        <RedStarsBackground />
        <div className="container">
          <h2 className="section-title">Certifications & Achievements</h2>
          <div className="certifications-grid">
            {certifications.map((cert, index) => (
              <div key={index} className="certification-card">
                <div className="cert-header">
                  <h3 className="cert-title">{cert.title}</h3>
                  <span className="cert-date">{cert.date}</span>
                </div>
                <p className="cert-issuer">{cert.issuer}</p>
                {cert.credentialId && (
                  <p className="cert-credential">Credential ID: {cert.credentialId}</p>
                )}
                <p className="cert-description">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <StarryBackground />
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i> View Code
                  </a>
                  {project.liveDemo && (
                    <a href={project.liveDemo} className="project-link live-demo" target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-external-link-alt"></i> Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <RedStarsBackground />
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-content">
            <div className="contact-info">
              <p>
                I'm always interested in new opportunities and interesting projects. 
                Whether you have a question or just want to say hi, I'll do my best to get back to you!
              </p>
              <div className="contact-methods">
                <div className="contact-method">
                  <strong>Email:</strong> <a href={`mailto:${import.meta.env.VITE_USER_EMAIL || 'tcalv976@gmail.com'}`}>{import.meta.env.VITE_USER_EMAIL || 'tcalv976@gmail.com'}</a>
                </div>
                <div className="contact-method">
                  <strong>LinkedIn:</strong> <a href={import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com/in/timothe-calvin'} target="_blank" rel="noopener noreferrer">{(import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com/in/timothe-calvin').replace('https://', '')}</a>
                </div>
                <div className="contact-method">
                  <strong>GitHub:</strong> <a href={import.meta.env.VITE_GITHUB_URL || 'https://github.com/Timothe-calvin'} target="_blank" rel="noopener noreferrer">{(import.meta.env.VITE_GITHUB_URL || 'https://github.com/Timothe-calvin').replace('https://', '')}</a>
                </div>
              </div>
            </div>
            <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <input 
                  type="text" 
                  name="name"
                  placeholder="Your Name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="form-group">
                <textarea 
                  name="message"
                  placeholder="Your message... Please include your email, phone, or preferred contact method so I can get back to you!" 
                  rows="6" 
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i>
                    Send Message
                  </>
                )}
              </button>
              
              {submitStatus === 'success' && (
                <div className="form-message success">
                  <i className="fas fa-check-circle"></i>
                  Thank you! Your message has been sent successfully.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="form-message error">
                  <i className="fas fa-exclamation-circle"></i>
                  Sorry, there was an error sending your message. Please try again or email me directly.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 {import.meta.env.VITE_USER_NAME || 'Timothe Calvin'}. All rights reserved.</p>
          <div className="social-links">
            <a href={import.meta.env.VITE_GITHUB_URL || 'https://github.com/Timothe-calvin'} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com/in/timothe-calvin'} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={`mailto:${import.meta.env.VITE_USER_EMAIL || 'tcalv976@gmail.com'}`}>
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
