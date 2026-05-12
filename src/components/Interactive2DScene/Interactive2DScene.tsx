"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Vec2 = { x: number; y: number };

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;

    const update = () => setReduced(Boolean(mq.matches));
    update();

    // Safari fallback
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    }

    mq.addListener(update);
    return () => mq.removeListener(update);
  }, []);

  return reduced;
}

type Particle = {
  id: number;
  pos: Vec2;
  vel: Vec2;
  radius: number;
  seed: number;
};

export default function Interactive2DScene({
  accent = "#e67e22",
}: {
  accent?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const pointerRef = useRef<Vec2>({ x: 0.5, y: 0.3 });
  const viewportRef = useRef<{ w: number; h: number }>({ w: 1, h: 1 });

  const prefersReducedMotion = usePrefersReducedMotion();

  const particles = useMemo<Particle[]>(() => {
    // Stable initial set; actual positions are scaled after we know viewport.
    const count = 90;
    const arr: Particle[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        id: i,
        pos: { x: Math.random(), y: Math.random() },
        vel: { x: (Math.random() - 0.5) * 0.0006, y: (Math.random() - 0.5) * 0.0006 },
        radius: 0.8 + Math.random() * 2.4,
        seed: Math.random() * 10,
      });
    }
    return arr;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = clamp(window.devicePixelRatio || 1, 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;

      viewportRef.current = { w, h };
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const onPointerMove = (e: PointerEvent) => {
      pointerRef.current = {
        x: clamp(e.clientX / Math.max(1, window.innerWidth), 0, 1),
        y: clamp(e.clientY / Math.max(1, window.innerHeight), 0, 1),
      };
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let lastT = performance.now();

    const draw = (t: number) => {
      const { w, h } = viewportRef.current;
      const dt = Math.min(0.033, (t - lastT) / 1000);
      lastT = t;

      ctx.clearRect(0, 0, w, h);

      // Background is transparent; we only draw accents.
      const p = pointerRef.current;
      const px = p.x * w;
      const py = p.y * h;

      const time = t * 0.001;
      const scroll = window.scrollY || 0;
      const scrollInfluence = clamp(scroll / 1200, 0, 1);

      // Draw connections + particles (groq-ish "speed lines")
      const linkDistance = 140 + scrollInfluence * 40;

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];

        // Reduced motion: keep it calm
        const motionScale = prefersReducedMotion ? 0.15 : 1;

        a.pos.x += a.vel.x * dt * 60 * motionScale;
        a.pos.y += a.vel.y * dt * 60 * motionScale;

        // Subtle pointer attraction
        const ax = a.pos.x * w;
        const ay = a.pos.y * h;
        const dx = px - ax;
        const dy = py - ay;
        const dist = Math.sqrt(dx * dx + dy * dy) + 0.0001;

        const pull = (prefersReducedMotion ? 0.0002 : 0.00055) * (1 / (1 + dist / 250));
        a.pos.x += (dx / dist) * pull * dt * 60 * motionScale;
        a.pos.y += (dy / dist) * pull * dt * 60 * motionScale;

        // Wrap edges
        if (a.pos.x < -0.05) a.pos.x = 1.05;
        if (a.pos.x > 1.05) a.pos.x = -0.05;
        if (a.pos.y < -0.05) a.pos.y = 1.05;
        if (a.pos.y > 1.05) a.pos.y = -0.05;

        // Particle
        const x = a.pos.x * w;
        const y = a.pos.y * h;
        const wobble = Math.sin(time + a.seed) * 0.35;
        const r = a.radius + wobble + scrollInfluence * 0.35;

        // Soft glow
        ctx.beginPath();
        ctx.fillStyle = "rgba(230,126,34,0.12)";
        ctx.arc(x, y, r * 2.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "rgba(17,24,39,0.35)";
        ctx.arc(x, y, r * 0.9, 0, Math.PI * 2);
        ctx.fill();

        // Connection lines
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const bx = b.pos.x * w;
          const by = b.pos.y * h;

          const ddx = bx - x;
          const ddy = by - y;
          const d2 = ddx * ddx + ddy * ddy;

          if (d2 < linkDistance * linkDistance) {
            const d = Math.sqrt(d2);
            const alpha = (1 - d / linkDistance) * (prefersReducedMotion ? 0.22 : 0.36);

            ctx.strokeStyle = `rgba(230,126,34,${alpha})`;
            ctx.lineWidth = 1;

            ctx.beginPath();
            // Make it a little “slanted” based on pointer for a speed feel
            const tilt = (py - y) / Math.max(1, h);
            ctx.moveTo(x, y);
            ctx.lineTo(bx + tilt * 6, by);
            ctx.stroke();
          }
        }
      }

      // A couple of “scanline” accents
      if (!prefersReducedMotion) {
        ctx.globalAlpha = 0.55;
        const bandY = (p.y * 0.85 + 0.05) * h + Math.sin(time * 1.1) * 10;
        const grad = ctx.createLinearGradient(0, bandY - 40, 0, bandY + 40);
        grad.addColorStop(0, "rgba(230,126,34,0)");
        grad.addColorStop(0.5, "rgba(230,126,34,0.35)");
        grad.addColorStop(1, "rgba(230,126,34,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, bandY - 50, w, 100);
        ctx.globalAlpha = 1;
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    if (!prefersReducedMotion) {
      rafRef.current = requestAnimationFrame(draw);
    } else {
      // Reduced motion: draw a single frame; still respond to resize/pointer updates naturally.
      draw(performance.now());
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [particles, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
        background: "transparent",
        filter: "saturate(1.05)",
      }}
      // accent kept for future theming; canvas draws with fixed palette for consistency
      data-accent={accent}
    />
  );
}
