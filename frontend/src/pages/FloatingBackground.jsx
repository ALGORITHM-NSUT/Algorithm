import React, { useRef, useEffect } from 'react';

const FloatingBackgroundCanvas = ({ children }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const shapes = [];
    const maxShapes = window.innerWidth <= 768 ? 5 : 15;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      shapes.length = 0; // Clear existing shapes
      for (let i = 0; i < maxShapes; i++) {
        shapes.push(createShape());
      }
    };

    const createShape = () => ({
      x: Math.random() * (canvas.width), // Randomizing in three sections
      y: canvas.height + Math.random() * 100, // Start from bottom with randomness
      size: Math.random() * 120 + 30, // Increase variety in size
      opacity: 0.3,
      speed: Math.random() * 2 + 0.4, // Slower speed for upward animation
      borderRadius: 0, // Initial border radius (square)
      borderRadiusChange: Math.random() * 0.05 + 0.03, // Gradual change in border-radius
      maxBorderRadius: Math.min(20)
    });
    

    for (let i = 0; i < maxShapes; i++) {
      shapes.push(createShape());
    }

    const drawGradientBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#0e0620');
      gradient.addColorStop(0.5, '#151238');
      gradient.addColorStop(1, '#0e0b27');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    let rotationAngle = 0;
    const draw = () => {
      drawGradientBackground(); // Draw the gradient background

      shapes.forEach((shape, index) => {
        // Update shape position and border-radius
        shape.y -= shape.speed;
        shape.borderRadius = Math.min(shape.size / 2, shape.borderRadius + shape.borderRadiusChange); // Gradual morph to circle

        // Reset shape position if it moves out of the canvas
        if (shape.y < -shape.size) {
          shapes[index] = createShape(); // Reset the shape
        }
        rotationAngle += 0.001;

        // Draw the shape
        ctx.save(); // Save the current context
        ctx.translate(shape.x + shape.size / 2, shape.y + shape.size / 2); // Move to center of the shape
        ctx.rotate(rotationAngle); // Rotate based on size
        ctx.translate(-shape.x - shape.size / 2, -shape.y - shape.size / 2); // R
        ctx.globalAlpha = shape.opacity;
        ctx.beginPath();
        ctx.moveTo(shape.x + shape.size / 2, shape.y);
        ctx.arcTo(
          shape.x + shape.size,
          shape.y,
          shape.x + shape.size,
          shape.y + shape.size,
          shape.borderRadius
        );
        ctx.arcTo(
          shape.x + shape.size,
          shape.y + shape.size,
          shape.x,
          shape.y + shape.size,
          shape.borderRadius
        );
        ctx.arcTo(
          shape.x,
          shape.y + shape.size,
          shape.x,
          shape.y,
          shape.borderRadius
        );
        ctx.arcTo(
          shape.x,
          shape.y,
          shape.x + shape.size,
          shape.y,
          shape.borderRadius
        );
        ctx.closePath();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resizeCanvas);
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div style={{ position: 'absolute', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          display: 'block',
          pointerEvents: 'none',
        }}
      ></canvas>
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          color: 'white',
          fontWeight: 'bold',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default FloatingBackgroundCanvas;
