import { SlideShell, Defs, YELLOW } from "../primitives";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function SlideBroadcast() {
  const [phase, setPhase] = useState<0 | 1>(0);
  useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p === 0 ? 1 : 0)), 4200);
    return () => clearInterval(t);
  }, []);

  // 12 PCs in a 6-wide row, split into 3 groups of 4 in phase 1
  const PCs = Array.from({ length: 12 }).map((_, i) => {
    const col = i % 6;
    const row = Math.floor(i / 6);
    const x = 120 + col * 130;
    const y = 300 + row * 90;
    return { i, x, y };
  });
  const vlanColor = (i: number) => (i < 4 ? YELLOW : i < 8 ? "#111" : "#737373");
  const vlanLabel = (i: number) => (i < 4 ? "VLAN 10" : i < 8 ? "VLAN 20" : "VLAN 30");

  return (
    <SlideShell eyebrow="Layer 2" title="Broadcast Domains" subtitle="Every VLAN is its own broadcast domain. A broadcast in one VLAN never leaks into another.">
      <div className="mt-6 grid flex-1 grid-cols-1 gap-6 md:grid-cols-[1.5fr_1fr]">
        <div className="relative rounded-3xl border border-neutral-200 bg-white p-4">
          <svg viewBox="0 0 900 500" className="h-[440px] w-full">
            <Defs />
            {/* Switch */}
            <rect x={340} y={80} width={220} height={54} rx={10} fill="#111" />
            <rect x={340} y={80} width={220} height={54} rx={10} fill="url(#switchGrad)" opacity={0.15} />
            <text x={450} y={112} textAnchor="middle" fill="#fff" fontSize={12} fontWeight={800} letterSpacing={2}>SWITCH</text>

            {/* VLAN dividers (phase 1) */}
            <motion.g animate={{ opacity: phase === 1 ? 1 : 0 }} transition={{ duration: 0.5 }}>
              <line x1={280} x2={280} y1={160} y2={480} stroke="#e5e5e5" strokeDasharray="4 6" />
              <line x1={620} x2={620} y1={160} y2={480} stroke="#e5e5e5" strokeDasharray="4 6" />
              <text x={195} y={180} textAnchor="middle" fontSize={11} fontWeight={800} letterSpacing={2} fill="#8a6d00">VLAN 10</text>
              <text x={450} y={180} textAnchor="middle" fontSize={11} fontWeight={800} letterSpacing={2} fill="#111">VLAN 20</text>
              <text x={735} y={180} textAnchor="middle" fontSize={11} fontWeight={800} letterSpacing={2} fill="#737373">VLAN 30</text>
            </motion.g>

            {/* PCs + cables */}
            {PCs.map(({ i, x, y }) => {
              const color = phase === 1 ? vlanColor(i) : "#111";
              const source = i === 0;
              const reached = phase === 0 ? true : i < 4; // broadcast reaches all in phase 0, only VLAN 10 in phase 1
              return (
                <g key={i}>
                  <motion.line x1={x} y1={y - 22} x2={450} y2={134}
                    stroke={color} strokeOpacity={reached ? 0.7 : 0.15} strokeWidth={1.5}
                    animate={{ strokeOpacity: reached ? 0.7 : 0.15 }} transition={{ duration: 0.5 }} />
                  {/* PC */}
                  <motion.rect x={x - 22} y={y - 22} width={44} height={32} rx={4} fill="#fff" stroke={color} strokeWidth={2}
                    animate={{ opacity: reached ? 1 : 0.35 }} transition={{ duration: 0.4 }} />
                  <motion.rect x={x - 16} y={y - 16} width={32} height={16} rx={2} fill={color} opacity={0.15}
                    animate={{ opacity: reached ? 0.15 : 0.05 }} />
                  <text x={x} y={y + 24} textAnchor="middle" fontSize={9} fontWeight={700} fill="#525252">PC{i + 1}</text>
                  {source && (
                    <motion.circle cx={x} cy={y - 6} r={6} fill="#ef4444"
                      animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
                  )}
                  {/* broadcast pulse rings from source */}
                </g>
              );
            })}

            {/* Broadcast ripples from PC1 */}
            {[0, 0.4, 0.8].map((delay) => (
              <motion.circle key={delay} cx={PCs[0].x} cy={PCs[0].y - 6} r={10}
                fill="none" stroke="#ef4444" strokeWidth={2}
                animate={{ r: [10, phase === 0 ? 700 : 200], opacity: [0.7, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, delay, ease: "easeOut" }} />
            ))}

            {/* Phase badge */}
            <g transform="translate(24,24)">
              <rect x={0} y={0} width={210} height={30} rx={15} fill={phase === 0 ? "#fee2e2" : "#fef3c7"} />
              <text x={16} y={20} fontSize={11} fontWeight={800} letterSpacing={2} fill={phase === 0 ? "#b91c1c" : "#8a6d00"}>
                {phase === 0 ? "1 · FLAT NETWORK — ALL FLOODED" : "2 · SEGMENTED — VLAN 10 ONLY"}
              </text>
            </g>
          </svg>
        </div>

        <div className="flex flex-col gap-3">
          {[
            { t: "One VLAN = One broadcast domain", s: "Layer 2 boundary lives inside the switch." },
            { t: "Less unnecessary traffic", s: "Broadcasts stop at the VLAN edge." },
            { t: "Better performance", s: "Fewer interruptions per host, more throughput." },
          ].map((it, i) => (
            <motion.div key={it.t} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.15 }}
              className="rounded-2xl border border-neutral-200 bg-white/80 p-5">
              <div className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: i === 0 ? "#8a6d00" : "#525252" }}>0{i + 1}</div>
              <div className="mt-1 text-lg font-bold text-neutral-900">{it.t}</div>
              <div className="text-sm text-neutral-500">{it.s}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}
