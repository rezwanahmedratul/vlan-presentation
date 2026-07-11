import { motion } from "motion/react";
import type { ReactNode } from "react";

export const YELLOW = "#FFD54A";

export function SlideShell({ eyebrow, title, subtitle, children }: { eyebrow?: string; title?: string; subtitle?: string; children?: ReactNode }) {
  return (
    <div className="relative mx-auto flex h-full max-h-[92vh] w-full max-w-[1400px] flex-col">
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-neutral-500"
        >
          <motion.span
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: YELLOW, transformOrigin: "left" }}
            className="h-[2px] w-10 rounded-full"
          />
          {eyebrow}
        </motion.div>
      )}
      {title && (
        <motion.h1
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(2rem,4.5vw,4.25rem)] font-bold leading-[1.02] tracking-[-0.03em] text-neutral-900"
        >
          {title}
        </motion.h1>
      )}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }}
          className="mt-3 max-w-3xl text-[clamp(1rem,1.4vw,1.35rem)] text-neutral-500"
        >
          {subtitle}
        </motion.p>
      )}
      {children}
    </div>
  );
}

/** A dashed/solid animated packet that travels along an SVG path. */
export function Packet({ pathId, color = YELLOW, duration = 2.4, delay = 0, size = 8, glow = true }: { pathId: string; color?: string; duration?: number; delay?: number; size?: number; glow?: boolean }) {
  return (
    <g>
      {glow && (
        <circle r={size + 4} fill={color} opacity={0.25}>
          <animateMotion dur={`${duration}s`} begin={`${delay}s`} repeatCount="indefinite" rotate="auto">
            <mpath href={`#${pathId}`} />
          </animateMotion>
        </circle>
      )}
      <circle r={size} fill={color}>
        <animateMotion dur={`${duration}s`} begin={`${delay}s`} repeatCount="indefinite" rotate="auto">
          <mpath href={`#${pathId}`} />
        </animateMotion>
      </circle>
    </g>
  );
}

/** Animated dashed cable */
export function Cable({ d, stroke = "#111", width = 2, dashed = false, delay = 0 }: { d: string; stroke?: string; width?: number; dashed?: boolean; delay?: number }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={width}
      strokeLinecap="round"
      strokeDasharray={dashed ? "6 6" : undefined}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ delay, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

/** A generic rounded card for slide content */
export function Card({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-2xl border border-neutral-200 bg-white/70 backdrop-blur p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)] ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function SwitchIcon({ x, y, w = 220, h = 60, label = "SWITCH", ports = 6 }: { x: number; y: number; w?: number; h?: number; label?: string; ports?: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={0} y={0} width={w} height={h} rx={10} fill="#111" />
      <rect x={0} y={0} width={w} height={h} rx={10} fill="url(#switchGrad)" opacity={0.15} />
      <text x={16} y={h / 2 + 4} fill="#fff" fontSize={12} fontWeight={700} letterSpacing={2}>{label}</text>
      {Array.from({ length: ports }).map((_, i) => (
        <rect key={i} x={w - (ports * 22) - 12 + i * 22} y={h / 2 - 6} width={16} height={12} rx={2} fill="#FFD54A" opacity={0.9} />
      ))}
      <circle cx={w - 12} cy={12} r={3} fill="#22c55e">
        <animate attributeName="opacity" values="1;0.2;1" dur="1.6s" repeatCount="indefinite" />
      </circle>
    </g>
  );
}

export function Device({ x, y, label, color = "#111", size = 44 }: { x: number; y: number; label: string; color?: string; size?: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={-size / 2} y={-size / 2} width={size} height={size * 0.72} rx={6} fill="#fff" stroke={color} strokeWidth={2} />
      <rect x={-size / 2 + 4} y={-size / 2 + 4} width={size - 8} height={size * 0.72 - 8} rx={2} fill={color} opacity={0.08} />
      <rect x={-8} y={size * 0.72 - size / 2 - 2} width={16} height={4} rx={1} fill={color} opacity={0.4} />
      <text x={0} y={size * 0.72 + 8} textAnchor="middle" fontSize={11} fontWeight={600} fill="#525252">{label}</text>
    </g>
  );
}

export function Defs() {
  return (
    <defs>
      <linearGradient id="switchGrad" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#FFD54A" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
  );
}
