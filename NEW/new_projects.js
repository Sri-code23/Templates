document.addEventListener("DOMContentLoaded", () => {
    // Project data
    const projectData = [
      {
        title: "Project A",
        description:
          "A sophisticated web application built with modern technologies to solve complex business problems. This project showcases advanced frontend techniques and responsive design principles.",
        techStack: ["React", "Node.js", "MongoDB"],
      },
      {
        title: "Project B",
        description:
          "An innovative mobile application designed to enhance user experience and streamline daily tasks. This app features intuitive navigation and real-time data synchronization.",
        techStack: ["Flutter", "Firebase", "GraphQL"],
      },
      {
        title: "Project C",
        description:
          "A cutting-edge e-commerce platform with advanced features and seamless payment integration. This platform handles thousands of transactions daily with robust security measures.",
        techStack: ["Next.js", "Stripe", "PostgreSQL"],
      },
      {
        title: "Project D",
        description:
          "A data visualization dashboard that transforms complex datasets into actionable insights. This tool helps businesses make informed decisions through interactive charts and reports.",
        techStack: ["D3.js", "Python", "AWS"],
      },
      {
        title: "Project E",
        description:
          "A robust content management system built for scalability and ease of use. This system allows non-technical users to manage digital content efficiently across multiple platforms.",
        techStack: ["Vue.js", "Express", "MySQL"],
      },
      {
        title: "Project F",
        description:
          "An AI-powered recommendation engine that delivers personalized content to users. This engine uses machine learning algorithms to analyze user behavior and preferences.",
        techStack: ["TensorFlow", "Django", "Redis"],
      },
      {
        title: "Project G",
        description:
          "A blockchain-based solution for secure and transparent transactions. This solution provides immutable records and smart contract functionality for various business applications.",
        techStack: ["Solidity", "Web3.js", "Ethereum"],
      },
      {
        title: "Project H",
        description:
          "A progressive web application that works offline and provides native-like experience. This app offers seamless performance across all devices with minimal data usage.",
        techStack: ["PWA", "Service Workers", "IndexedDB"],
      },
    ]
  
    const track = document.getElementById("image-track")
    const cards = document.querySelectorAll(".project-card")
    const expandedOverlay = document.querySelector(".expanded-overlay")
    const expandedCard = document.querySelector(".expanded-card")
    const expandedImage = document.querySelector(".expanded-image")
    const expandedTitle = document.querySelector(".expanded-content h2")
    const expandedDescription = document.querySelector(".expanded-content p")
    const expandedTechStack = document.querySelector(".expanded-content .tech-stack")
    const closeButton = document.querySelector(".close-button")
    const minimizedCardsContainer = document.querySelector(".minimized-cards")
    const slideHint = document.querySelector(".slide-hint")
    let activeCardIndex = null
    let isExpanded = false
    const bottomCardsContainer = null
  
    // Initialize slide hint
    setTimeout(() => {
      slideHint.style.opacity = "0.7"
    }, 1000)
  
    // Hide slide hint after 5 seconds
    setTimeout(() => {
      slideHint.style.opacity = "0"
    }, 5000)
  
    // Show slide hint when mouse moves
    document.addEventListener("mousemove", () => {
      if (!isExpanded) {
        slideHint.style.opacity = "0.7"
        clearTimeout(window.hintTimeout)
        window.hintTimeout = setTimeout(() => {
          slideHint.style.opacity = "0"
        }, 3000)
      }
    })
  
    // Track mouse events for sliding
    const handleOnDown = (e) => {
      if (isExpanded) return
      track.dataset.mouseDownAt = e.clientX
    }
  
    const handleOnUp = () => {
      if (isExpanded) return
      track.dataset.mouseDownAt = "0"
      track.dataset.prevPercentage = track.dataset.percentage || "0"
    }
  
    const handleOnMove = (e) => {
      if (isExpanded || track.dataset.mouseDownAt === "0") return
  
      const mouseDelta = Number.parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2
  
      const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = Number.parseFloat(track.dataset.prevPercentage || "0") + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100)
  
      track.dataset.percentage = nextPercentage
  
      track.animate(
        {
          transform: `translate(${nextPercentage}%, -50%)`,
        },
        { duration: 1200, fill: "forwards" },
      )
  
      for (const card of cards) {
        const image = card.querySelector(".image")
        image.animate(
          {
            objectPosition: `${100 + nextPercentage}% center`,
          },
          { duration: 1200, fill: "forwards" },
        )
      }
    }
  
    // Handle card click to expand
    cards.forEach((card, index) => {
      card.addEventListener("click", () => {
        expandCard(index)
      })
    })
  
    // Function to expand a card
    function expandCard(index) {
      if (isExpanded) return
  
      isExpanded = true
      activeCardIndex = index
  
      // Get the clicked card's data
      const cardData = projectData[index]
      const cardImage = cards[index].querySelector(".image").src
  
      // Populate expanded card content
      expandedImage.src = cardImage
      expandedImage.alt = cardData.title
      expandedTitle.textContent = cardData.title
      expandedDescription.textContent = cardData.description
  
      // Clear and populate tech stack
      expandedTechStack.innerHTML = ""
      cardData.techStack.forEach((tech) => {
        const span = document.createElement("span")
        span.textContent = tech
        expandedTechStack.appendChild(span)
      })
  
      // Create minimized cards
      createMinimizedCards(index)
  
      // Show expanded overlay with animation
      expandedOverlay.classList.add("active")
  
      // Hide slide hint
      slideHint.style.opacity = "0"
  
      // Prevent body scrolling
      document.body.style.overflow = "hidden"
    }
  
    // Function to create minimized cards
    function createMinimizedCards(activeIndex) {
      minimizedCardsContainer.innerHTML = ""
  
      cards.forEach((card, index) => {
        if (index !== activeIndex) {
          const minimizedCard = document.createElement("div")
          minimizedCard.className = "minimized-card"
          minimizedCard.dataset.index = index
  
          const img = document.createElement("img")
          img.src = card.querySelector(".image").src
          img.alt = projectData[index].title
  
          minimizedCard.appendChild(img)
          minimizedCardsContainer.appendChild(minimizedCard)
  
          // Add click event to switch to this card
          minimizedCard.addEventListener("click", (e) => {
            e.stopPropagation()
            switchExpandedCard(index)
          })
        }
      })
    }
  
    // Function to switch between expanded cards
    function switchExpandedCard(newIndex) {
      // Animate out current content
      expandedTitle.style.opacity = "0"
      expandedTitle.style.transform = "translateY(20px)"
      expandedDescription.style.opacity = "0"
      expandedDescription.style.transform = "translateY(20px)"
      expandedTechStack.style.opacity = "0"
      expandedTechStack.style.transform = "translateY(20px)"
  
      // After a short delay, update content and animate in
      setTimeout(() => {
        activeCardIndex = newIndex
  
        // Get the new card's data
        const cardData = projectData[newIndex]
        const cardImage = cards[newIndex].querySelector(".image").src
  
        // Update expanded card content
        expandedImage.src = cardImage
        expandedImage.alt = cardData.title
        expandedTitle.textContent = cardData.title
        expandedDescription.textContent = cardData.description
  
        // Clear and populate tech stack
        expandedTechStack.innerHTML = ""
        cardData.techStack.forEach((tech) => {
          const span = document.createElement("span")
          span.textContent = tech
          expandedTechStack.appendChild(span)
        })
  
        // Create new minimized cards
        createMinimizedCards(newIndex)
  
        // Animate in new content
        setTimeout(() => {
          expandedTitle.style.opacity = "1"
          expandedTitle.style.transform = "translateY(0)"
          expandedDescription.style.opacity = "1"
          expandedDescription.style.transform = "translateY(0)"
          expandedTechStack.style.opacity = "1"
          expandedTechStack.style.transform = "translateY(0)"
        }, 100)
      }, 300)
    }
  
    // Function to collapse the expanded card
    function collapseCard() {
      if (!isExpanded) return
  
      // Hide expanded overlay with animation
      expandedOverlay.classList.remove("active")
  
      // Clear minimized cards
      minimizedCardsContainer.innerHTML = ""
  
      isExpanded = false
      activeCardIndex = null
  
      // Show slide hint
      slideHint.style.opacity = "0.7"
  
      // Restore body scrolling
      document.body.style.overflow = ""
    }
  
    // Close expanded card when close button is clicked
    closeButton.addEventListener("click", (e) => {
      e.stopPropagation()
      collapseCard()
    })
  
    // Close expanded card when clicking outside the expanded card
    expandedOverlay.addEventListener("click", (e) => {
      if (e.target === expandedOverlay) {
        collapseCard()
      }
    })
  
    // Handle escape key to collapse card
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isExpanded) {
        collapseCard()
      }
    })
  
    // Handle touch events for mobile
    window.onmousedown = (e) => handleOnDown(e)
    window.ontouchstart = (e) => handleOnDown(e.touches[0])
    window.onmouseup = (e) => handleOnUp(e)
    window.ontouchend = (e) => handleOnUp(e.touches[0])
    window.onmousemove = (e) => handleOnMove(e)
    window.ontouchmove = (e) => handleOnMove(e.touches[0])
  
    // Add swipe functionality for expanded cards
    let touchStartX = 0
    let touchEndX = 0
  
    function handleSwipe() {
      if (isExpanded) {
        const swipeThreshold = 100
        const swipeDistance = touchEndX - touchStartX
  
        if (Math.abs(swipeDistance) > swipeThreshold) {
          let nextIndex
  
          if (swipeDistance > 0) {
            // Swipe right - previous card
            nextIndex = (activeCardIndex - 1 + cards.length) % cards.length
          } else {
            // Swipe left - next card
            nextIndex = (activeCardIndex + 1) % cards.length
          }
  
          switchExpandedCard(nextIndex)
        }
      }
    }
  
    document.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX
    })
  
    document.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX
      handleSwipe()
    })
  
    // Prevent expanded card from closing when clicking inside it
    expandedCard.addEventListener("click", (e) => {
      e.stopPropagation()
    })
  
    // Add keyboard navigation for expanded cards
    document.addEventListener("keydown", (e) => {
      if (!isExpanded) return
  
      if (e.key === "ArrowLeft") {
        // Previous card
        const prevIndex = (activeCardIndex - 1 + cards.length) % cards.length
        switchExpandedCard(prevIndex)
      } else if (e.key === "ArrowRight") {
        // Next card
        const nextIndex = (activeCardIndex + 1) % cards.length
        switchExpandedCard(nextIndex)
      }
    })
  })