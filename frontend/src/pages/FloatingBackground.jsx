import React, { useRef, useEffect } from 'react';

const isMobile = () => /Mobi|Android/i.test(navigator.userAgent);

const FloatingBackgroundCanvas = ({ children }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (isMobile()) {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width  = `${window.innerWidth * 1.2}px`;
      canvas.style.height = `${window.innerHeight * 1.2}px`;
      ctx.scale(dpr, dpr);
    } else {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const shapes = [];
    const createShape = () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 100,
      size: Math.random() * 120 + 30,
      opacity: 0.3,
      speed: Math.random() * 2 + 0.4,
      borderRadius: 0,
      borderRadiusChange: Math.random() * 0.05 + 0.03
    });

    // initial buffer size & populate
    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      shapes.length = 0;
      const max = window.innerWidth <= 768 ? 7 : 20;
      for (let i = 0; i < max; i++) shapes.push(createShape());
    };
    init();

    let rotationAngle = 0;
    const drawGradient = () => {
      const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      g.addColorStop(0, '#0e0620');
      g.addColorStop(0.5, '#151238');
      g.addColorStop(1, '#0e0b27');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const draw = () => {
      drawGradient();
      shapes.forEach((s, i) => {
        s.y -= s.speed;
        s.borderRadius = Math.min(s.size / 2, s.borderRadius + s.borderRadiusChange);
        s.opacity = 0.5 * Math.max(0, s.y / canvas.height);
        if (s.y < -s.size) shapes[i] = createShape();

        rotationAngle += Math.random() * 0.0005 + 0.0005;
        ctx.save();
        ctx.translate(s.x + s.size/2, s.y + s.size/2);
        ctx.rotate(rotationAngle);
        ctx.translate(-s.x - s.size/2, -s.y - s.size/2);
        ctx.globalAlpha = s.opacity;

        ctx.beginPath();
        ctx.moveTo(s.x + s.size/2, s.y);
        ctx.arcTo(s.x + s.size, s.y, s.x + s.size, s.y + s.size, s.borderRadius);
        ctx.arcTo(s.x + s.size, s.y + s.size, s.x, s.y + s.size, s.borderRadius);
        ctx.arcTo(s.x, s.y + s.size, s.x, s.y, s.borderRadius);
        ctx.arcTo(s.x, s.y, s.x + s.size, s.y, s.borderRadius);
        ctx.closePath();
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.fill();
        ctx.restore();
      });
      requestAnimationFrame(draw);
    };

    // Desktop resize: rescale shapes & buffer
    const resizeDesktop = () => {
      const oldW = canvas.width, oldH = canvas.height;
      const newW = window.innerWidth, newH = window.innerHeight;
      canvas.width = newW;
      canvas.height = newH;
      shapes.forEach(s => {
        s.x = (s.x / oldW) * newW;
        s.y = (s.y / oldH) * newH;
      });
      const max = newW <= 768 ? 7 : 20;
      if (max > shapes.length) {
        for (let i = shapes.length; i < max; i++) shapes.push(createShape());
      } else {
        shapes.splice(max);
      }
    };

    // Mobile: update --vh CSS var only
    const updateVh = () => {
      document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight * 0.01}px`
      );
    };

    if (isMobile()) {
      updateVh();
      window.addEventListener('resize', updateVh);
    } else {
      window.addEventListener('resize', resizeDesktop);
    }

    draw();

    return () => {
      if (isMobile()) {
        window.removeEventListener('resize', updateVh);
      } else {
        window.removeEventListener('resize', resizeDesktop);
      }
    };
  }, []);

  return (
    <div style={{ '--vh': '1vh', // fallback
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: 'calc(var(--vh) * 100)',
          overflow: 'hidden',
          zIndex: -1 }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          zIndex: -1,
          display: 'block',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default FloatingBackgroundCanvas;
