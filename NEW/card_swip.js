document.addEventListener("DOMContentLoaded", () => {
    const carousell = document.getElementById("featurecarousell")
    const inner = carousell.querySelector(".carousell-inner")
    let isDown = false
    let startX
    let scrollLeft
    let isDragging = false
  
    carousell.addEventListener("mousedown", (e) => {
      isDown = true
      carousell.classList.add("active")
      startX = e.pageX - carousell.offsetLeft
      scrollLeft = carousell.scrollLeft
    })
  
    carousell.addEventListener("mouseleave", () => {
      isDown = false
      carousell.classList.remove("active")
    })
  
    carousell.addEventListener("mouseup", () => {
      isDown = false
      carousell.classList.remove("active")
    })
  
    carousell.addEventListener("mousemove", (e) => {
      if (!isDown) return
      e.preventDefault()
      isDragging = true
      const x = e.pageX - carousell.offsetLeft
      const walk = (x - startX) * 2
      carousell.scrollLeft = scrollLeft - walk
    })
  
    // Touch events for mobile
    carousell.addEventListener("touchstart", (e) => {
      isDown = true
      carousell.classList.add("active")
      startX = e.touches[0].pageX - carousell.offsetLeft
      scrollLeft = carousell.scrollLeft
    })
  
    carousell.addEventListener("touchend", () => {
      isDown = false
      carousell.classList.remove("active")
    })
  
    carousell.addEventListener("touchmove", (e) => {
      if (!isDown) return
      e.preventDefault()
      isDragging = true
      const x = e.touches[0].pageX - carousell.offsetLeft
      const walk = (x - startX) * 2
      carousell.scrollLeft = scrollLeft - walk
    })
  
    // Handle card expansion
    const cards = document.querySelectorAll('.feature-card')
    
    cards.forEach(card => {
      const learnMoreLink = card.querySelector('.feature-link')
      const closeIcon = card.querySelector('.close-icon')
      
      learnMoreLink.addEventListener('click', (e) => {
        e.preventDefault()
        if (!isDragging) {
          // Close any other expanded cards
          cards.forEach(otherCard => {
            if (otherCard !== card) {
              otherCard.classList.remove('expanded')
              otherCard.querySelector('.feature-link').textContent = 'Learn more →'
            }
          })
          const isExpanding = !card.classList.contains('expanded')
          card.classList.toggle('expanded')
          learnMoreLink.textContent = isExpanding ? 'View less ←' : 'Learn more →'
        }
        isDragging = false
      })
      
      closeIcon.addEventListener('click', () => {
        card.classList.remove('expanded')
        card.querySelector('.feature-link').textContent = 'Learn more →'
      })
    })
  
    // Animate on scroll
    const animateOnScroll = () => {
      const cards = document.querySelectorAll(".feature-card")
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0
        if (isVisible) {
          card.style.opacity = "1"
          card.style.transform = "translateY(0)"
        } else {
          card.style.opacity = "0"
          card.style.transform = "translateY(20px)"
        }
        card.style.transitionDelay = `${index * 0.1}s`
      })
    }
  
    window.addEventListener("scroll", animateOnScroll)
    animateOnScroll() // Initial check
  })