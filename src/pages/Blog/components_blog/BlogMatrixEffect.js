import React, { useEffect, useRef, useState } from 'react';
import matrixpepe from '../../../Assets/DRPEPE_MATRIX_3.svg';

const MatrixEffect = () => {
  const canvasRef = useRef(null);
  const [floatingPosition, setFloatingPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Canvas dimensions
    const cw = window.innerWidth;
    const ch = window.innerHeight;
    canvas.width = cw;
    canvas.height = ch;

    // Settings for the Matrix effect
    const fontSize = 10;
    const columns = Math.floor(cw / fontSize);
    const glyphs = '日ﾊﾋｼﾂｳｰﾅﾐﾓﾆｻﾜｵﾘﾎﾏｴｷﾑﾃｹﾒｶﾕﾗｾﾈｽﾀﾇ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const drops = Array(columns).fill(0);
    const speed = 12;

    // Draw Matrix effect
    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, cw, ch);

      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, x) => {
        const text = glyphs[Math.floor(Math.random() * glyphs.length)];
        ctx.fillText(text, x * fontSize, y * fontSize);

        if (y * fontSize > ch && Math.random() > 0.975) {
          drops[x] = 0;
        }

        drops[x] += speed;
      });

      requestAnimationFrame(drawMatrix);
    };

    drawMatrix();

    return () => {
      ctx.clearRect(0, 0, cw, ch);
    };
  }, []);

  // Floating animation
  useEffect(() => {
    let angle = 0;
    const animateFloating = () => {
      angle += 0.02;
      setFloatingPosition({
        x: Math.sin(angle) * 10, // Horizontal floating
        y: Math.cos(angle) * 10, // Vertical floating
      });

      requestAnimationFrame(animateFloating);
    };

    animateFloating();
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', backgroundColor: 'black', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      <div
        style={{
          position: 'absolute',
          top: `calc(50% + ${floatingPosition.y}px)`,
          left: `calc(50% + ${floatingPosition.x}px)`,
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
          filter: 'drop-shadow(0 0 20px #00FF00)', // Green glowing effect
        }}
      >
        <img
          src={matrixpepe}
          alt="Centered SVG"
          style={{
            maxWidth: '240px',
            maxHeight: 'auto',
          }}
        />
      </div>
    </div>
  );
};

export default MatrixEffect;
