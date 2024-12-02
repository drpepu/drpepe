import React, { useEffect, useRef } from 'react';
import matrixpepe from '../../../Assets/DRPEPE_MATRIX_3.svg'

const MatrixEffect = ({ svgImage }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Canvas dimensions
    const cw = window.innerWidth;
    const ch = window.innerHeight;
    canvas.width = cw;
    canvas.height = ch;

    // Settings
    const fontSize = 10;
    const columns = Math.floor(cw / fontSize); // Number of columns
    const glyphs = '日ﾊﾋｼﾂｳｰﾅﾐﾓﾆｻﾜｵﾘﾎﾏｴｷﾑﾃｹﾒｶﾕﾗｾﾈｽﾀﾇ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const speedSet1 = 12;
    const speedSet2 = 30;

    const dropsSet1 = Array(columns).fill(0);
    const dropsSet2 = Array(columns).fill(-ch / 1); // Offset the starting positions

    let updateCounter = 0;
    const updateInterval = 3;

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, cw, ch);

      updateCounter++;

      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;
      dropsSet1.forEach((y, x) => {
        if (updateCounter % updateInterval === 0) {
          const text = glyphs[Math.floor(Math.random() * glyphs.length)];
          ctx.fillText(text, x * fontSize, y * fontSize);

          if (Math.random() > 0.8) {
            ctx.fillStyle = '#FFF';
            ctx.fillText(text, x * fontSize, y * fontSize);
            ctx.fillStyle = '#0F0';
          }
        }

        if (y * fontSize > ch && Math.random() > 0.975) {
          dropsSet1[x] = 0;
        }

        dropsSet1[x] += speedSet1;
      });

      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;
      dropsSet2.forEach((y, x) => {
        if (updateCounter % updateInterval === 0) {
          const text = glyphs[Math.floor(Math.random() * glyphs.length)];
          ctx.fillText(text, x * fontSize, y * fontSize);

          if (Math.random() > 0.9) {
            ctx.fillStyle = '#FFF';
            ctx.fillText(text, x * fontSize, y * fontSize);
            ctx.fillStyle = '#0F0';
          }
        }

        if (y * fontSize > ch && Math.random() > 0.975) {
          dropsSet2[x] = 0;
        }

        dropsSet2[x] += speedSet2;
      });

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      ctx.clearRect(0, 0, cw, ch);
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', backgroundColor: 'black', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
      }}>
        <img src={matrixpepe} alt="Centered SVG" style={{ maxWidth: '240px', maxHeight: 'auto' }} />
      </div>
    </div>
  );
};

export default MatrixEffect;
