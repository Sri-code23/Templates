document.querySelectorAll('.blog-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.querySelector('.blog-card-inner').style.transform = `scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.querySelector('.blog-card-inner').style.transform = 'scale(1) rotateX(0) rotateY(0)';
    });

    card.addEventListener('click', () => {
      const modal = document.getElementById('blog-modal');
      const title = card.querySelector('.blog-title').textContent;
      const content = card.querySelector('.blog-excerpt').textContent;

      // Set modal content
      document.querySelector('.modal-title').textContent = title;
      document.querySelector('.modal-full-content').textContent = content;

      // Show modal
      modal.style.display = 'flex';
    });
  });

  // Close modal
  document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('blog-modal').style.display = 'none';
  });