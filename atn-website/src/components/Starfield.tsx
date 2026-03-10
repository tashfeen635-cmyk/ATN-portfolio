"use client";

import { useEffect, useRef } from "react";

// Star color palettes (r, g, b)
const STAR_COLORS: [number, number, number][] = [
  [200, 220, 255], // blue-white
  [255, 255, 240], // warm white
  [255, 245, 200], // yellow-white
  [255, 210, 160], // orange
  [255, 180, 150], // red-orange
  [170, 200, 255], // cool blue
  [255, 255, 255], // pure white
];

const enum BlinkType {
  RapidTwinkle,
  SlowPulse,
  Irregular,
  Subtle,
  Steady,
}

interface Star {
  x: number;
  y: number;
  baseRadius: number;
  color: [number, number, number];
  blinkType: BlinkType;
  blinkSpeed: number;
  blinkPhase: number;
  driftX: number;
  driftY: number;
  bright: boolean; // top ~5% get glow/sparkle
}

function createStars(w: number, h: number, count: number): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    const baseRadius = Math.random() < 0.05
      ? 1.2 + Math.random() * 1.3  // bright stars
      : 0.3 + Math.random() * 0.9; // normal stars

    const blinkRoll = Math.random();
    let blinkType: BlinkType;
    if (blinkRoll < 0.2) blinkType = BlinkType.RapidTwinkle;
    else if (blinkRoll < 0.4) blinkType = BlinkType.SlowPulse;
    else if (blinkRoll < 0.55) blinkType = BlinkType.Irregular;
    else if (blinkRoll < 0.8) blinkType = BlinkType.Subtle;
    else blinkType = BlinkType.Steady;

    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      baseRadius,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      blinkType,
      blinkSpeed: 0.5 + Math.random() * 2.5,
      blinkPhase: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 0.08,
      driftY: (Math.random() - 0.5) * 0.08,
      bright: baseRadius > 1.5,
    });
  }
  return stars;
}

function getBlinkAlpha(star: Star, t: number): number {
  const phase = star.blinkPhase;
  const speed = star.blinkSpeed;

  switch (star.blinkType) {
    case BlinkType.RapidTwinkle:
      return 0.4 + 0.6 * Math.abs(Math.sin(t * speed * 3 + phase));
    case BlinkType.SlowPulse:
      return 0.5 + 0.5 * Math.sin(t * speed * 0.5 + phase);
    case BlinkType.Irregular: {
      const a = Math.sin(t * speed * 1.3 + phase);
      const b = Math.sin(t * speed * 2.7 + phase * 1.7);
      return 0.3 + 0.7 * Math.abs(a * b);
    }
    case BlinkType.Subtle:
      return 0.7 + 0.3 * Math.sin(t * speed * 0.8 + phase);
    case BlinkType.Steady:
    default:
      return 0.85 + 0.15 * Math.sin(t * 0.3 + phase);
  }
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();

    const STAR_COUNT = 3000;
    let stars = createStars(w, h, STAR_COUNT);

    // Redistribute on resize
    function handleResize() {
      const oldW = w;
      const oldH = h;
      resize();
      // Scale star positions proportionally
      for (const s of stars) {
        s.x = (s.x / oldW) * w;
        s.y = (s.y / oldH) * h;
      }
    }

    window.addEventListener("resize", handleResize);

    let animId = 0;
    const startTime = performance.now();

    function draw() {
      const t = (performance.now() - startTime) / 1000;
      ctx!.clearRect(0, 0, w, h);

      for (const star of stars) {
        // Drift
        star.x += star.driftX;
        star.y += star.driftY;

        // Wrap around edges
        if (star.x < -2) star.x = w + 2;
        if (star.x > w + 2) star.x = -2;
        if (star.y < -2) star.y = h + 2;
        if (star.y > h + 2) star.y = -2;

        const alpha = getBlinkAlpha(star, t);
        const [r, g, b] = star.color;
        const radius = star.baseRadius * (0.8 + 0.2 * alpha);

        // Outer glow for bright stars
        if (star.bright) {
          const gradient = ctx!.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, radius * 6
          );
          gradient.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.4})`);
          gradient.addColorStop(0.4, `rgba(${r},${g},${b},${alpha * 0.1})`);
          gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx!.beginPath();
          ctx!.arc(star.x, star.y, radius * 6, 0, Math.PI * 2);
          ctx!.fillStyle = gradient;
          ctx!.fill();

          // Cross sparkle
          const sparkleAlpha = alpha * 0.3;
          const sparkleLen = radius * 8;
          ctx!.strokeStyle = `rgba(${r},${g},${b},${sparkleAlpha})`;
          ctx!.lineWidth = 0.5;
          ctx!.beginPath();
          ctx!.moveTo(star.x - sparkleLen, star.y);
          ctx!.lineTo(star.x + sparkleLen, star.y);
          ctx!.moveTo(star.x, star.y - sparkleLen);
          ctx!.lineTo(star.x, star.y + sparkleLen);
          ctx!.stroke();
        }

        // Star core
        ctx!.beginPath();
        ctx!.arc(star.x, star.y, radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx!.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} id="starfield-bg" />;
}
