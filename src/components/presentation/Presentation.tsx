import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Keyboard, X, Maximize2 } from "lucide-react";
import Slide1 from "./slides/Slide1";
import Slide2 from "./slides/Slide2";
import Slide3 from "./slides/Slide3";
import Slide4 from "./slides/Slide4";
import SlideBroadcast from "./slides/SlideBroadcast";
import Slide5 from "./slides/Slide5";
import Slide6 from "./slides/Slide6";
import Slide7 from "./slides/Slide7";
import SlideAccessTrunk from "./slides/SlideAccessTrunk";
import Slide8 from "./slides/Slide8";
import Slide9 from "./slides/Slide9";
import SlideVlanIds from "./slides/SlideVlanIds";
import SlideSecurity from "./slides/SlideSecurity";
import Slide10 from "./slides/Slide10";

const slides = [Slide1, Slide2, Slide3, Slide4, SlideBroadcast, Slide5, Slide6, Slide7, SlideAccessTrunk, Slide8, Slide9, SlideSecurity, SlideVlanIds, Slide10];

export default function Presentation() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [help, setHelp] = useState(false);
  const wheelLock = useRef(0);
  const touchStart = useRef<number | null>(null);

  const go = useCallback((n: number) => {
    setIndex((cur) => {
      const next = Math.max(0, Math.min(slides.length - 1, n));
      setDir(next > cur ? 1 : -1);
      return next;
    });
  }, []);

  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") { e.preventDefault(); next(); }
      else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); prev(); }
      else if (e.key === "f" || e.key === "F") {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
        else document.exitFullscreen?.();
      } else if (e.key === "h" || e.key === "H" || e.key === "?") setHelp((h) => !h);
      else if (e.key === "Escape") setHelp(false);
      else if (e.key === "Home") go(0);
      else if (e.key === "End") go(slides.length - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, go]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - wheelLock.current < 700) return;
      if (Math.abs(e.deltaY) < 20 && Math.abs(e.deltaX) < 20) return;
      wheelLock.current = now;
      if (e.deltaY > 0 || e.deltaX > 0) next(); else prev();
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [next, prev]);

  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
    touchStart.current = null;
  };

  const Current = slides[index];

  return (
    <div
      className="fixed inset-0 overflow-hidden bg-white text-neutral-900 font-sans"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif" }}
    >
      {/* Subtle grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.06) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Aurora blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(255,213,74,0.55), transparent 70%)" }}
        animate={{ x: [0, 60, -30, 0], y: [0, 40, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-52 -right-40 h-[560px] w-[560px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(17,17,17,0.10), transparent 70%)" }}
        animate={{ x: [0, -50, 30, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 h-[380px] w-[380px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(120,180,255,0.18), transparent 70%)" }}
        animate={{ x: [-40, 40, -40], y: [-20, 20, -20], scale: [1, 1.08, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.05) 100%)" }} />

      {/* Top-right chrome */}
      <div className="absolute right-6 top-6 z-40 flex items-center gap-2 text-xs font-medium text-neutral-500">
        <button
          onClick={() => setHelp((h) => !h)}
          className="rounded-full border border-neutral-200 bg-white/70 backdrop-blur px-3 py-1.5 hover:bg-white transition shadow-sm"
          aria-label="Help"
        >
          <Keyboard className="inline h-3.5 w-3.5 mr-1.5" />Press H
        </button>
        <button
          onClick={() => document.fullscreenElement ? document.exitFullscreen?.() : document.documentElement.requestFullscreen?.()}
          className="rounded-full border border-neutral-200 bg-white/70 backdrop-blur px-3 py-1.5 hover:bg-white transition shadow-sm"
        >
          <Maximize2 className="inline h-3.5 w-3.5 mr-1.5" />F
        </button>
      </div>


      {/* Slide stage */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            initial={{ opacity: 0, x: dir * 60, scale: 0.98, filter: "blur(6px)" }}
            animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -dir * 60, scale: 0.98, filter: "blur(6px)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full flex items-center justify-center px-6 md:px-16"
          >
            <Current />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="absolute inset-x-0 bottom-0 z-40">
        <div className="relative h-1 w-full overflow-hidden bg-neutral-100">
          <motion.div
            className="relative h-full overflow-hidden bg-gradient-to-r from-[#FFD54A] via-amber-400 to-neutral-900"
            initial={false}
            animate={{ width: `${((index + 1) / slides.length) * 100}%` }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/70 to-transparent"
              animate={{ x: ["-100%", "600%"] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>
      </div>

      {/* Nav dots */}
      <div className="absolute bottom-6 left-1/2 z-40 -translate-x-1/2 flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 backdrop-blur px-3 py-2 shadow-sm">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? "w-8 bg-neutral-900" : i < index ? "w-1.5 bg-[#FFD54A]" : "w-1.5 bg-neutral-300 hover:bg-neutral-500"}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>


      {/* Prev / Next hint arrows */}
      <button onClick={prev} className="absolute left-4 top-1/2 z-30 -translate-y-1/2 h-10 w-10 rounded-full border border-neutral-200 bg-white/70 backdrop-blur shadow-sm hover:bg-white transition text-neutral-700" aria-label="Previous">‹</button>
      <button onClick={next} className="absolute right-4 top-1/2 z-30 -translate-y-1/2 h-10 w-10 rounded-full border border-neutral-200 bg-white/70 backdrop-blur shadow-sm hover:bg-white transition text-neutral-700" aria-label="Next">›</button>

      {/* Help overlay */}
      <AnimatePresence>
        {help && (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center bg-neutral-900/40 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setHelp(false)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
              className="relative w-[min(520px,90vw)] rounded-2xl bg-white p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setHelp(false)} className="absolute right-4 top-4 text-neutral-400 hover:text-neutral-900"><X className="h-5 w-5"/></button>
              <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-500">Keyboard</div>
              <h3 className="mb-6 text-2xl font-bold">Navigation</h3>
              <ul className="space-y-3 text-sm">
                {[
                  ["→ / Space", "Next slide"],
                  ["←", "Previous slide"],
                  ["Mouse wheel", "Navigate"],
                  ["Swipe", "Navigate on touch"],
                  ["F", "Fullscreen"],
                  ["H", "Toggle help"],
                  ["Home / End", "Jump to start/end"],
                ].map(([k, v]) => (
                  <li key={k} className="flex items-center justify-between border-b border-neutral-100 pb-2">
                    <span className="text-neutral-600">{v}</span>
                    <kbd className="rounded-md bg-neutral-100 px-2 py-1 font-mono text-xs text-neutral-800">{k}</kbd>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
