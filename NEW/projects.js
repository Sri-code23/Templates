const projects = [
    {
      id: 1,
      title: "Project Alpha",
      description: "Project Alpha is an innovative web application that revolutionizes the way users interact with data. Built using React and Node.js, it features real-time updates, intuitive visualizations, and seamless integration with various APIs.",
      shortDescription: "Innovative web app for data interaction",
      image: "https://placehold.co/600x400?text=Project+Alpha",
      githubLink: "https://github.com/example/project-alpha",
    },
    {
      id: 2,
      title: "Project Beta",
      description: "Project Beta is a mobile-first e-commerce platform designed to provide a smooth shopping experience. Developed with React Native and backed by a robust GraphQL API, it offers features like personalized recommendations and one-click checkout.",
      shortDescription: "Mobile-first e-commerce platform",
      image: "https://placehold.co/600x400?text=Project+Beta",
      githubLink: "https://github.com/example/project-beta",
    },
    {
      id: 3,
      title: "Project Gamma",
      description: "Project Gamma is an AI-powered content management system that helps businesses streamline their content creation and distribution processes. Using machine learning algorithms and natural language processing, it optimizes content for various platforms.",
      shortDescription: "AI-powered content management system",
      image: "https://placehold.co/600x400?text=Project+Gamma",
      githubLink: "https://github.com/example/project-gamma",
    },
    {
      id: 4,
      title: "Project Delta",
      description: "Project Delta is a blockchain-based supply chain management solution that ensures transparency and traceability in global logistics. Built on Ethereum, it leverages smart contracts to automate and secure transactions across the supply chain.",
      shortDescription: "Blockchain-based supply chain solution",
      image: "https://placehold.co/600x400?text=Project+Delta",
      githubLink: "https://github.com/example/project-delta",
    },
    {
      id: 5,
      title: "Project Epsilon",
      description: "Project Epsilon is a cloud-native DevOps platform that simplifies the deployment and management of microservices. It provides a user-friendly interface for monitoring, scaling, and troubleshooting distributed systems in real-time.",
      shortDescription: "Cloud-native DevOps platform",
      image: "https://placehold.co/600x400?text=Project+Epsilon",
      githubLink: "https://github.com/example/project-epsilon",
    },
  ]

  const projectSlider = document.getElementById("projectSlider")
  const prevButton = document.getElementById("prevButton")
  const nextButton = document.getElementById("nextButton")
  const popp = document.getElementById("popp")
  const poppImage = document.getElementById("poppImage")
  const poppTitle = document.getElementById("poppTitle")
  const poppDescription = document.getElementById("poppDescription")
  const githubLink = document.getElementById("githubLink")
  const closepopp = document.getElementById("closepopp")

  let currentIndex = 0

  function createProjectCard(project) {
    const card = document.createElement("div")
    card.className = "project-card"
    card.innerHTML = `
      <div class="project-image" style="background-image: url(${project.image})">
          <div class="project-number">${project.id}</div>
      </div>
      <div class="project-content">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.shortDescription}</p>
          <button class="view-project-button" data-id="${project.id}">View Project</button>
      </div>
    `
    return card
  }

  function renderProjects() {
    projectSlider.innerHTML = ""
    projects.forEach((project) => {
      const card = createProjectCard(project)
      projectSlider.appendChild(card)
    })
  }

  function updateSliderPosition() {
    const cardWidth = projectSlider.children[0]?.offsetWidth || 0
    projectSlider.style.transform = `translateX(-${currentIndex * cardWidth}px)`
  }

  function showpopp(project) {
    poppImage.src = project.image
    poppTitle.textContent = project.title
    poppDescription.textContent = project.description
    githubLink.href = project.githubLink
    popp.classList.add("active")
  }

  function hidepopp() {
    popp.classList.remove("active")
  }

  prevButton.addEventListener('click', () => {
      if (currentIndex > 0) {
          currentIndex--
          updateSliderPosition()
      }
  })

  nextButton.addEventListener('click', () => {
      if (currentIndex < projects.length - 3) {
          currentIndex++
          updateSliderPosition()
      }
  })

  projectSlider.addEventListener('click', (e) => {
      if (e.target.classList.contains('view-project-button')) {
          const projectId = Number.parseInt(e.target.dataset.id)
          const project = projects.find(p => p.id === projectId)
          if (project) {
              showpopp(project)
          }
      }
  })

  closepopp.addEventListener('click', hidepopp)

  popp.addEventListener('click', (e) => {
      if (e.target === popp) {
          hidepopp()
      }
  })

  // Initial setup
  renderProjects()
  updateSliderPosition()

  // Handle window resize
  window.addEventListener('resize', () => {
      updateSliderPosition()
  })