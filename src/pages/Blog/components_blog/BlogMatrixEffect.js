import React, { useEffect, useRef } from 'react';
import styles from '../blog.module.css'

const MatrixEffect = () => {
  const canvasRef1 = useRef(null);
  const canvasRef2 = useRef(null);

  useEffect(() => {
    const canvas = canvasRef1.current;
    const ctx = canvas.getContext('2d');
    const canvas2 = canvasRef2.current;
    const ctx2 = canvas2.getContext('2d');

    const cw = window.innerWidth;
    const ch = window.innerHeight;
    const charArr = '$DRP'.split('');
    const maxCharCount = 100;
    const fallingCharArr = [];
    const fontSize = 52;
    const maxColumns = cw / fontSize;

    canvas.width = canvas2.width = cw;
    canvas.height = canvas2.height = ch;

    const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);
    const randomFloat = (min, max) => Math.random() * (max - min) + min;

    class Point {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }

      draw(ctx, ctx2) {
        this.value = charArr[randomInt(0, charArr.length - 1)].toUpperCase();
        this.speed = randomFloat(1, 3);

        ctx2.fillStyle = 'rgba(255,255,255,0.8)';
        ctx2.font = `${fontSize}px sans-serif`;
        ctx2.fillText(this.value, this.x, this.y);

        ctx.fillStyle = '#0F0';
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillText(this.value, this.x, this.y);

        this.y += this.speed;
        if (this.y > ch) {
          this.y = randomFloat(-10, 0);
          this.speed = randomFloat(0, 5);
        }
      }
    }

    for (let i = 0; i < maxColumns; i++) {
      fallingCharArr.push(new Point(i * fontSize, randomFloat(-500, 0)));
    }

    const update = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, cw, ch);
      ctx2.clearRect(0, 0, cw, ch);

      fallingCharArr.forEach(point => point.draw(ctx, ctx2));

      requestAnimationFrame(update);
    };

    update();

    return () => {
      // Cleanup on component unmount
      ctx.clearRect(0, 0, cw, ch);
      ctx2.clearRect(0, 0, cw, ch);
    };
  }, []);

  return (
    <div >
      <canvas ref={canvasRef1} style={{ position: 'absolute', top: 0, left: 0 }} />
      <canvas ref={canvasRef2} style={{ position: 'absolute', top: 0, left: 0 }} />
    </div>
  );
};

export default MatrixEffect;
