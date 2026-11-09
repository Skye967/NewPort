"use client";

import { useEffect, useRef } from "react";
import {
  compose,
  duration,
  render,
  type Bundle,
} from "@/components/wind-lines";

const SEED = 20261108;
const reducedMotion = "(prefers-reduced-motion: reduce)";

// Contact's background: wind lines that draw on once when the section scrolls
// into view, then stay still. Sized to the parent section, which must be
// positioned. Off-screen the animation pauses and resumes where it left off;
// once it ends no frame stays scheduled. Under reduced motion it draws the
// end state straight away. Without JavaScript the canvas stays empty.
export function ContactWind({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const section = canvas.parentElement!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const motion = matchMedia(reducedMotion);

    let bundles: Bundle[] = [];
    let total = 0;
    let dpr = 1;
    let time = 0;
    let last = 0;
    let frame = 0;
    let started = false;
    let visible = false;

    function draw(at: number) {
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      render(ctx!, bundles, at);
    }

    const finished = () => motion.matches || time >= total;

    function tick(now: number) {
      frame = 0;
      time = Math.min(total, time + Math.min(64, now - last));
      last = now;
      draw(time);
      if (!finished() && visible) frame = requestAnimationFrame(tick);
    }

    function resume() {
      if (frame || !started || !visible || finished()) return;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    }

    // Recomputes the composition for the section's size. The canvas buffer is
    // cleared on resize, so it redraws at the current point straight away.
    function layout() {
      const { width, height } = section.getBoundingClientRect();
      if (!width || !height) return;
      dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      bundles = compose(width, height, SEED);
      total = duration(bundles);
      if (!started) return;
      draw(motion.matches ? Infinity : time);
      resume();
    }

    // Laid out before either observer is attached: the intersection callback
    // can run before the resize one, and with no bundles yet it would read as
    // already finished.
    layout();
    const resizer = new ResizeObserver(layout);
    resizer.observe(section);

    const viewer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (!visible || started) return resume();
        started = true;
        if (motion.matches) draw(Infinity);
        else resume();
      },
      { threshold: 0.35 },
    );
    viewer.observe(section);

    function onMotionChange() {
      if (!started) return;
      cancelAnimationFrame(frame);
      frame = 0;
      if (motion.matches) draw(Infinity);
      else resume();
    }
    motion.addEventListener("change", onMotionChange);

    return () => {
      resizer.disconnect();
      viewer.disconnect();
      motion.removeEventListener("change", onMotionChange);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
