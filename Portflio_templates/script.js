document.addEventListener("DOMContentLoaded", () => {
    // Set current year in footer
    document.getElementById("current-year").textContent = new Date().getFullYear()
  
    // Time-based greeting
    const greeting = document.querySelector(".greeting")
    const hour = new Date().getHours()
    let greetingText = "Good Evening"
  
    if (hour >= 5 && hour < 12) {
      greetingText = "Good Morning"
    } else if (hour >= 12 && hour < 18) {
      greetingText = "Good Afternoon"
    }
  
    greeting.textContent = `${greetingText}, Ready to Build?`
  
    // Theme toggle
    const themeToggle = document.querySelector(".theme-toggle")
    const htmlElement = document.documentElement
  
    themeToggle.addEventListener("click", () => {
      htmlElement.classList.toggle("dark")
    })
  
    // Smooth scrolling
    const scrollLinks = document.querySelectorAll("[data-scroll]")
  
    scrollLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
        const targetId = this.getAttribute("data-scroll")
        const targetElement = document.getElementById(targetId)
  
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          })
        }
      })
    })
  
    // Project filtering
    const tabTriggers = document.querySelectorAll(".tab-trigger")
    const projectCards = document.querySelectorAll(".project-card")
  
    tabTriggers.forEach((tab) => {
      tab.addEventListener("click", function () {
        // Remove active class from all tabs
        tabTriggers.forEach((t) => t.classList.remove("active"))
  
        // Add active class to clicked tab
        this.classList.add("active")
  
        const category = this.getAttribute("data-category")
  
        // Filter projects
        projectCards.forEach((card) => {
          if (category === "all" || card.getAttribute("data-category") === category) {
            card.style.display = "flex"
          } else {
            card.style.display = "none"
          }
        })
      })
    })
  
    // Copy email to clipboard
    const copyEmailBtn = document.getElementById("copy-email")
    const emailValue = document.getElementById("email-value")
  
    copyEmailBtn.addEventListener("click", function () {
      const email = emailValue.textContent
      navigator.clipboard.writeText(email).then(() => {
        // Show copied indicator
        const originalIcon = this.innerHTML
        this.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'
  
        setTimeout(() => {
          this.innerHTML = originalIcon
        }, 2000)
      })
    })
  
    // Contact form submission
    const contactForm = document.getElementById("contact-form")
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Get form values
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const message = document.getElementById("message").value
  
        // Here you would typically send the form data to a server
        console.log("Form submitted:", { name, email, message })
  
        // Reset form
        contactForm.reset()
  
        // Show success message (you can customize this)
        alert("Message sent successfully!")
      })
    }
  
    // Scroll to top button
    const scrollTopBtn = document.getElementById("scroll-top")
  
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add("visible")
      } else {
        scrollTopBtn.classList.remove("visible")
      }
    })
  
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  
    // Easter egg
    const easterEgg = document.getElementById("easter-egg")
    let konami = []
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ]
  
    document.addEventListener("keydown", (e) => {
      konami.push(e.key)
      konami = konami.slice(-10)
  
      if (konami.join(",") === konamiCode.join(",")) {
        easterEgg.style.display = "flex"
        setTimeout(() => {
          document.addEventListener("click", closeEasterEgg)
        }, 500)
      }
    })
  
    function closeEasterEgg() {
      easterEgg.style.display = "none"
      document.removeEventListener("click", closeEasterEgg)
    }
  
    // Initialize AOS (Animate on Scroll)
    initAOS()
  })
  
  // Simple AOS implementation
  function initAOS() {
    const elements = document.querySelectorAll("[data-aos]")
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("aos-animate")
          } else {
            // Uncomment the line below if you want elements to animate every time they enter the viewport
            // entry.target.classList.remove('aos-animate');
          }
        })
      },
      {
        threshold: 0.1,
      },
    )
  
    elements.forEach((element) => {
      observer.observe(element)
    })
  }
  
  