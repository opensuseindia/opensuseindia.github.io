import React, { useRef, useEffect } from 'react';

/**
 * Aesthetic Dark-Green Matrix Cyber Interface (Balanced Density)
 * - Rich, continuous cascading code across the entire screen width.
 * - Authentic Simon Whiteley Katakana + numeric glyphs.
 * - Dark green shades: clean terminal green head, deep emerald body, dark forest green trails.
 * - Zero blinding chamak / no neon glare.
 * - Soft top black tint fade and bottom dissolving black tint fade.
 * - Aesthetic, hypnotic cadence.
 */
export default function MatrixRainBackground() {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;

    // Authentic Matrix character glyphs: Katakana (60%) + numerics (30%) + cyber tokens (10%)
    const KATAKANA = 'ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ';
    const NUMBERS = '0123456789';
    const SYMBOLS = ':・."=*+-<>¦|';
    const TOKENS = (KATAKANA + KATAKANA + NUMBERS + SYMBOLS + 'SUSE').split('');

    const getRandomChar = () => TOKENS[Math.floor(Math.random() * TOKENS.length)];

    const COL_STEP = 18; // Full continuous coverage across screen
    const LINE_HEIGHT = 18;
    const FONT_SIZE = 14;
    let columns = [];

    const initStreams = () => {
      const rect = canvas.getBoundingClientRect();
      width = canvas.width = rect.width || window.innerWidth;
      height = canvas.height = rect.height || window.innerHeight;

      columns = [];
      const colCount = Math.floor(width / COL_STEP);

      for (let i = 0; i < colCount; i++) {
        // Continuous cascading flow: 1 or 2 drops per column
        const drops = [];
        const dropCount = Math.random() < 0.45 ? 2 : 1;

        for (let d = 0; d < dropCount; d++) {
          const length = 14 + Math.floor(Math.random() * 18);
          const chars = [];
          for (let j = 0; j < length; j++) {
            chars.push(getRandomChar());
          }

          drops.push({
            y: (Math.random() * height * 1.5) - (d * height * 0.6),
            speed: 1.1 + Math.random() * 1.3,
            length: length,
            chars: chars,
          });
        }

        columns.push({
          x: i * COL_STEP,
          drops: drops,
          mutRate: 3 + Math.floor(Math.random() * 4),
        });
      }
    };

    initStreams();

    const handleResize = () => {
      initStreams();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Pause rendering when hero is scrolled out of view to preserve 60-120fps everywhere
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    let frame = 0;

    const render = () => {
      animFrameRef.current = requestAnimationFrame(render);
      if (!isVisibleRef.current) return;

      frame++;

      // Smooth dark clearing for rich, elegant persistence trails
      ctx.fillStyle = 'rgba(2, 5, 4, 0.11)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `bold ${FONT_SIZE}px "Courier New", "Cascadia Code", "JetBrains Mono", monospace`;
      ctx.textAlign = 'center';

      for (let col of columns) {
        const shouldMutate = frame % col.mutRate === 0;

        for (let drop of col.drops) {
          drop.y += drop.speed;

          // Reset when drop leaves screen past the bottom
          if (drop.y - drop.length * LINE_HEIGHT > height + 80) {
            drop.y = -20 - Math.random() * 80;
            drop.speed = 1.1 + Math.random() * 1.3;
            drop.length = 14 + Math.floor(Math.random() * 18);
          }

          if (shouldMutate) {
            const mutIdx = Math.floor(Math.random() * drop.length);
            drop.chars[mutIdx] = getRandomChar();
          }

          for (let j = 0; j < drop.length; j++) {
            const charY = drop.y - j * LINE_HEIGHT;
            if (charY < -FONT_SIZE || charY > height + 60) continue;

            const char = drop.chars[j];
            const fade = 1 - j / drop.length;

            if (j === 0) {
              // 1. LEADING HEAD: Rich openSUSE chameleon green (darker tactical tone, zero pale mint)
              ctx.shadowColor = '#0f5127';
              ctx.shadowBlur = 3;
              ctx.fillStyle = '#73ba25'; // Authentic openSUSE green
              ctx.fillText(char, col.x, charY);
              ctx.shadowBlur = 0;
            } else if (j <= 2) {
              // 2. NECK: Deep openSUSE forest green
              ctx.fillStyle = `rgba(82, 148, 25, ${Math.max(0.3, fade * 0.9)})`;
              ctx.fillText(char, col.x, charY);
            } else if (j <= 6) {
              // 3. UPPER BODY: Dark matrix emerald green
              ctx.fillStyle = `rgba(18, 105, 45, ${Math.max(0.22, fade * 0.8)})`;
              ctx.fillText(char, col.x, charY);
            } else if (j <= 12) {
              // 4. MID BODY: Deep obsidian pine green
              ctx.fillStyle = `rgba(14, 75, 32, ${Math.max(0.15, fade * 0.7)})`;
              ctx.fillText(char, col.x, charY);
            } else {
              // 5. TRAIL: Dark moss/obsidian green dissolving smoothly into black
              ctx.fillStyle = `rgba(8, 45, 19, ${Math.max(0.06, fade * 0.5)})`;
              ctx.fillText(char, col.x, charY);
            }
          }
        }
      }
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* 1. Full Matrix Rain Canvas: Rich continuous dark-green streams */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* 2. Soft Centered Contrast Shield: Protects text without hiding the rain */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background:
            'radial-gradient(ellipse 52% 42% at 50% 45%, rgba(2, 5, 4, 0.68) 0%, rgba(2, 5, 4, 0.35) 45%, transparent 70%)',
        }}
      />

      {/* 3. Top Black Tint Gradient: Code emerges gracefully from the darkness */}
      <div className="absolute inset-x-0 top-0 h-32 sm:h-38 bg-gradient-to-b from-[#020504] via-[#020504]/75 to-transparent pointer-events-none z-[3]" />

      {/* 4. Bottom Black Tint Gradient: Matrix flows lower and dissolves gracefully into black */}
      <div className="absolute inset-x-0 bottom-0 h-24 sm:h-30 bg-gradient-to-t from-[#020504] via-[#020504]/80 to-transparent pointer-events-none z-[3]" />
    </div>
  );
}
