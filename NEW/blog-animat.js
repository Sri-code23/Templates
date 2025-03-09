const blogData = [
    {
      title: "The Future of AI",
      content: "Artificial Intelligence is reshaping our world in ways we never imagined. From self-driving cars to advanced medical diagnostics, AI is pushing the boundaries of what's possible.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800&h=600"
    },
    {
      title: "Sustainable Living",
      content: "As climate change becomes an ever-pressing issue, sustainable living practices are more important than ever. Learn how small changes in your daily life can make a big impact.",
      image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=800&h=600"
    },
    {
      title: "The Art of Mindfulness",
      content: "In our fast-paced world, mindfulness offers a path to peace and clarity. Discover techniques to stay present and reduce stress in your everyday life.",
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800&h=600"
    },
  ];

  let currentIndex = 0;
  let autoPlayInterval;

  function updateContent() {
    const title = document.querySelector('.blog-title');
    const content = document.querySelector('.blog-content');
    const cards = document.querySelectorAll('.blog-card');

    title.classList.remove('show');
    content.classList.remove('show');
    
    setTimeout(() => {
      title.textContent = blogData[currentIndex].title;
      content.textContent = blogData[currentIndex].content;
      title.classList.add('show');
      content.classList.add('show');
    }, 300);

    cards.forEach((card, index) => {
      if (index === currentIndex) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
      
      const rotation = (index - currentIndex) * 45;
      const zTranslation = index === currentIndex ? 25 : -25;
      const scale = index === currentIndex ? 1 : 0.9;
      
      if (window.innerWidth >= 768) {
        card.style.transform = `scale(${index === currentIndex ? 1 : 0.85}) rotateY(${rotation}deg) translateZ(${index === currentIndex ? 50 : -50}px)`;
      } else {
        card.style.transform = `scale(${scale}) rotateY(${rotation}deg) translateZ(${zTranslation}px)`;
      }
    });
  }

  function nextBlog() {
    currentIndex = (currentIndex + 1) % blogData.length;
    updateContent();
  }

  function prevBlog() {
    currentIndex = (currentIndex - 1 + blogData.length) % blogData.length;
    updateContent();
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(nextBlog, 5000);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  function handleResize() {
    updateContent();
  }

  window.addEventListener('resize', handleResize);

  document.querySelector('#app').innerHTML = `
    <div class="blog-container">
      <div class="cards-section">
        ${blogData.map((blog, index) => `
          <div class="blog-card ${index === 0 ? 'active' : ''}" 
               style="background-image: url('${blog.image}')">
            <div class="blog-card-title">${blog.title}</div>
          </div>
        `).join('')}
      </div>
      <div class="content-section">
        <h2 class="blog-title"></h2>
        <p class="blog-content"></p>
      </div>

      <div class="navigation">
        <button class="nav-button prev-button">＜</button>
        <button class="nav-button next-button">＞</button>
      </div>
    </div>
  `;

  document.querySelector('.prev-button').addEventListener('click', () => {
    stopAutoPlay();
    prevBlog();
    startAutoPlay();
  });

  document.querySelector('.next-button').addEventListener('click', () => {
    stopAutoPlay();
    nextBlog();
    startAutoPlay();
  });

  document.querySelectorAll('.blog-card').forEach((card, index) => {
    card.addEventListener('click', () => {
      stopAutoPlay();
      currentIndex = index;
      updateContent();
      startAutoPlay();
    });

    card.addEventListener('mouseenter', () => {
      stopAutoPlay();
    });

    card.addEventListener('mouseleave', () => {
      startAutoPlay();
    });
  });

  updateContent();
  startAutoPlay();