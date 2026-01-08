(function () {
    drawActive = !!on;
    if (drawCanvas) drawCanvas.style.pointerEvents = drawActive ? 'auto' : 'none';
    drawToggles.forEach(btn => btn.dataset.draw = drawActive ? 'on' : 'off');
    if (!drawActive && drawCtx) {
      // Optional: keep drawing or clear?
      // drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
    }
  }
  drawToggles.forEach(btn => {
    btn.addEventListener('click', () => setDrawActive(btn.dataset.draw !== 'on'));
  });

  function startDraw(e) {
    if (!drawActive || !drawCtx) return;
    drawing = true;
    lastPoint = { x: e.clientX, y: e.clientY };
  }
  function endDraw() {
    drawing = false;
    lastPoint = null;
  }
  function moveDraw(e) {
    if (!drawing || !drawCtx || !lastPoint) return;
    const x = e.clientX, y = e.clientY;
    // Slightly wobbly line for handmade feel
    drawCtx.strokeStyle = Math.random() < 0.5 ? 'rgba(17,17,17,0.9)' : 'rgba(255,59,48,0.9)';
    drawCtx.lineWidth = 4 + Math.random() * 2;
    drawCtx.lineCap = 'round';
    drawCtx.beginPath();
    drawCtx.moveTo(lastPoint.x + (Math.random() - 0.5) * 2, lastPoint.y + (Math.random() - 0.5) * 2);
    drawCtx.lineTo(x + (Math.random() - 0.5) * 2, y + (Math.random() - 0.5) * 2);
    drawCtx.stroke();
    lastPoint = { x, y };
  }

  drawCanvas?.addEventListener('pointerdown', startDraw);
  drawCanvas?.addEventListener('pointerup', endDraw);
  drawCanvas?.addEventListener('pointerleave', endDraw);
  drawCanvas?.addEventListener('pointermove', moveDraw);

  /* --------------------------------------------
     Contact Form: playful confetti (light)
     -------------------------------------------- */
  const contactForm = qs('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Simple success toast via alert or inline message
      alert('Thanks! This demo form launched doodle confetti ✨');

      launchConfetti();
      contactForm.reset();
    });
  }

  function launchConfetti() {
    const count = 18;
    const shapes = ['●', '✦', '✎', '★', '◼'];
    for (let i = 0; i < count; i++) {
      const span = document.createElement('span');
      span.textContent = shapes[i % shapes.length];
      span.style.position = 'fixed';
      span.style.left = Math.random() * 100 + 'vw';
      span.style.top = '-10vh';
      span.style.fontSize = (12 + Math.random() * 18) + 'px';
      span.style.color = Math.random() < 0.5 ? 'var(--red)' : 'var(--black)';
      span.style.transform = `rotate(${Math.random() * 360}deg)`;
      span.style.zIndex = 60;
      document.body.appendChild(span);

      const duration = 1800 + Math.random() * 1200;
      const translateX = (Math.random() - 0.5) * 40; // small drift
      span.animate([
        { transform: span.style.transform, opacity: 1 },
        { transform: `translate(${translateX}px, 80vh) rotate(${Math.random() * 720}deg)`, opacity: 0.9 }
      ], { duration, easing: 'ease-in' }).onfinish = () => span.remove();
    }
  }
})();