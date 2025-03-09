// Particle animation
const particleContainer = document.getElementById("particle-container")
const particles = []
const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 25000)

function createParticle() {
  const particle = document.createElement("div")
  particle.classList.add("particle")

  const size = Math.random() * 3 + 1
  const initialX = Math.random() * window.innerWidth
  const initialY = Math.random() * window.innerHeight

  particle.style.width = `${size}px`
  particle.style.height = `${size}px`
  particle.style.left = `${initialX}px`
  particle.style.top = `${initialY}px`
  particle.style.opacity = Math.random() * 0.3 + 0.1

  particleContainer.appendChild(particle)

  return {
    element: particle,
    initialX,
    initialY,
    x: initialX,
    y: initialY,
  }
}

for (let i = 0; i < particleCount; i++) {
  particles.push(createParticle())
}

// Custom cursor
const customCursor = document.getElementById("custom-cursor")
let cursorX = 0
let cursorY = 0
let cursorXTarget = 0
let cursorYTarget = 0

document.addEventListener("mousemove", (e) => {
  cursorXTarget = e.clientX
  cursorYTarget = e.clientY
})

// Animation loop
function animate() {
  // Update cursor position
  cursorX += (cursorXTarget - cursorX) * 0.1
  cursorY += (cursorYTarget - cursorY) * 0.1
  customCursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`

  // Update particle positions
  particles.forEach((particle) => {
    const dx = cursorX - particle.x
    const dy = cursorY - particle.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const maxDistance = 150

    if (distance < maxDistance) {
      const angle = Math.atan2(dy, dx)
      const force = (1 - distance / maxDistance) * 5
      const targetX = particle.initialX - Math.cos(angle) * force * 10
      const targetY = particle.initialY - Math.sin(angle) * force * 10

      particle.x += (targetX - particle.x) * 0.1
      particle.y += (targetY - particle.y) * 0.1
    } else {
      particle.x += (particle.initialX - particle.x) * 0.1
      particle.y += (particle.initialY - particle.y) * 0.1
    }

    particle.element.style.transform = `translate(${particle.x - particle.initialX}px, ${particle.y - particle.initialY}px)`
  })

  requestAnimationFrame(animate)
}

animate()

// Resize handling
function handleResize() {
  const newParticleCount = Math.floor((window.innerWidth * window.innerHeight) / 25000)

  if (newParticleCount > particles.length) {
    for (let i = particles.length; i < newParticleCount; i++) {
      particles.push(createParticle())
    }
  } else if (newParticleCount < particles.length) {
    for (let i = particles.length - 1; i >= newParticleCount; i--) {
      particleContainer.removeChild(particles[i].element)
      particles.pop()
    }
  }

  particles.forEach((particle) => {
    particle.initialX = Math.random() * window.innerWidth
    particle.initialY = Math.random() * window.innerHeight
    particle.x = particle.initialX
    particle.y = particle.initialY
    particle.element.style.left = `${particle.initialX}px`
    particle.element.style.top = `${particle.initialY}px`
  })
}

window.addEventListener("resize", handleResize)

