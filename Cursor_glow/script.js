(() => {
    const canvas = document.getElementById('cursorCanvas');
    const ctx = canvas.getContext('2d', { alpha: false });
    
    let trailPoints = [];
    let particles = [];
    let mouse = { x: 0, y: 0 };
    let lastTime = 0;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        
        trailPoints.push({ x: e.clientX, y: e.clientY, age: 0 });
        if (trailPoints.length > 20) trailPoints.shift();
    });
    
    document.addEventListener('click', (e) => createBurst(e.clientX, e.clientY));
    
    function createBurst(x, y) {
        for (let i = 0; i < 30; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 3 + Math.random() * 5;
            particles.push({
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            radius: 0.5 + Math.random(),
            alpha: 1,
            life: 0,
            maxLife: 10 + Math.random() * 10
            });
        }
    }
    
    function drawTrail() {
        if (trailPoints.length < 2) return;
        
        ctx.beginPath();
        ctx.moveTo(trailPoints[0].x, trailPoints[0].y);
        
        for (let i = 1; i < trailPoints.length; i++) {
            const p1 = trailPoints[i - 1];
            const p2 = trailPoints[i];
            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2;
            ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);
      }
      
      const gradient = ctx.createLinearGradient(
            trailPoints[0].x, trailPoints[0].y,
            trailPoints[trailPoints.length - 1].x, trailPoints[trailPoints.length - 1].y
      );
      gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 1)");
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowColor = "rgba(255, 255, 255, 1)";
      ctx.shadowBlur = 20;
      ctx.stroke();
    }
    
    function updateAndDrawParticles(deltaTime) {
        particles = particles.filter(p => {
            p.x += p.vx * deltaTime;
            p.y += p.vy * deltaTime;
            p.vy += 0.1 * deltaTime;
            p.life += deltaTime;
            p.alpha = 1 - (p.life / p.maxLife);
            
            if (p.alpha > 0) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
            ctx.fill();
            return true;
            }
            return false;
        });
    }
    
    function animate(currentTime) {
        const deltaTime = (currentTime - lastTime) / 16.67; // Normalize to ~60 FPS
        lastTime = currentTime;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        drawTrail();
        updateAndDrawParticles(deltaTime);
        
        trailPoints = trailPoints.filter(point => {
            point.age += deltaTime;
            return point.age < 15;
        });
        
        requestAnimationFrame(animate);
    }
    
    requestAnimationFrame(animate);
  })();