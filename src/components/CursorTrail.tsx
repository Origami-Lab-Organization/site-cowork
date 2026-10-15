"use client";

import { useEffect, useRef } from "react";

/** Quanto tempo (ms) cada nuvem de fumaça leva para sumir. */
const LIFE = 1000;
/** Distância (px) entre nuvens emitidas ao longo do caminho do mouse. */
const SPACING = 7;
const MAX_PUFFS = 260;

type Puff = { x: number; y: number; vx: number; vy: number; r0: number; grow: number; spin: number; t: number };

/** Sprite de fumaça: gradiente radial suave pré-renderizado (barato de desenhar muitas vezes). */
function makeSprite(rgb: string) {
  const size = 128;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, `rgba(${rgb},0.55)`);
  grad.addColorStop(0.35, `rgba(${rgb},0.28)`);
  grad.addColorStop(0.7, `rgba(${rgb},0.08)`);
  grad.addColorStop(1, `rgba(${rgb},0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  return c;
}

/**
 * Fumaça verde que sai do mouse e some em ~1s. Canvas fixo por cima da página,
 * sem capturar cliques; só anima enquanto há fumaça visível. Desligado em telas
 * de toque e para quem pede menos movimento. Cor vem de --trail-rgb (muda com o tema).
 */
export function CursorTrail() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let puffs: Puff[] = [];
    let raf = 0;
    let dpr = 1;
    let last: { x: number; y: number } | null = null;
    let prevFrame = performance.now();
    let spriteColor = "";
    let sprite: HTMLCanvasElement | null = null;
    let glow = false;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };

    const syncTheme = () => {
      const rgb = (getComputedStyle(document.documentElement).getPropertyValue("--trail-rgb").trim() || "46 232 168").split(/\s+/).join(",");
      if (rgb !== spriteColor) {
        spriteColor = rgb;
        sprite = makeSprite(rgb);
      }
      glow = getComputedStyle(document.documentElement).colorScheme.includes("dark");
    };

    const emit = (x: number, y: number, speed: number) => {
      const angle = Math.random() * Math.PI * 2;
      const drift = 0.02 + Math.random() * 0.04;
      puffs.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        vx: Math.cos(angle) * drift,
        vy: Math.sin(angle) * drift - 0.03, // sobe um pouco, como fumaça
        r0: 5 + Math.random() * 6 + Math.min(speed, 30) * 0.15,
        grow: 26 + Math.random() * 22,
        spin: (Math.random() - 0.5) * 0.004,
        t: performance.now(),
      });
      if (puffs.length > MAX_PUFFS) puffs.splice(0, puffs.length - MAX_PUFFS);
    };

    const draw = () => {
      const now = performance.now();
      const dt = Math.min(now - prevFrame, 50);
      prevFrame = now;
      puffs = puffs.filter((p) => now - p.t < LIFE);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.globalCompositeOperation = glow ? "lighter" : "source-over";

      for (const p of puffs) {
        const age = (now - p.t) / LIFE; // 0 = acabou de sair, 1 = sumiu
        // movimento com leve redemoinho
        const a = Math.atan2(p.vy, p.vx) + p.spin * dt;
        const v = Math.hypot(p.vx, p.vy) * (1 - 0.0015 * dt);
        p.vx = Math.cos(a) * v;
        p.vy = Math.sin(a) * v - 0.00004 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        const r = p.r0 + p.grow * Math.sqrt(age);
        ctx.globalAlpha = Math.min(1, Math.pow(1 - age, 1.6) * (glow ? 0.95 : 1.1));
        if (sprite) ctx.drawImage(sprite, p.x - r, p.y - r, r * 2, r * 2);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      raf = puffs.length ? requestAnimationFrame(draw) : 0;
      if (!raf) ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const x = e.clientX;
      const y = e.clientY;
      if (!last) {
        last = { x, y };
        return;
      }
      const dist = Math.hypot(x - last.x, y - last.y);
      const steps = Math.min(Math.floor(dist / SPACING), 12);
      for (let i = 1; i <= steps; i++) emit(last.x + ((x - last.x) * i) / steps, last.y + ((y - last.y) * i) / steps, dist);
      if (steps > 0) last = { x, y };
      if (!raf) {
        syncTheme();
        prevFrame = performance.now();
        raf = requestAnimationFrame(draw);
      }
    };
    const onLeave = () => {
      last = null;
    };

    resize();
    syncTheme();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="cursor-trail" aria-hidden="true" />;
}
