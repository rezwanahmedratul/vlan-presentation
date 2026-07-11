import { motion } from "motion/react";
import { SlideShell, Defs, SwitchIcon, Device, Cable, Packet, YELLOW } from "../primitives";

export default function Slide1() {
  return (
    <SlideShell>
      <div className="grid h-full w-full grid-cols-1 items-center gap-8 md:grid-cols-2">
        <div>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-600">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: YELLOW }} />
            Networking Keynote — 2026
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.98] tracking-[-0.035em]"
          >
            Virtual LAN<br />
            <span className="relative inline-block">
              <span className="relative z-10">(VLAN)</span>
              <motion.span
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.9, duration: 0.6 }}
                style={{ background: YELLOW, transformOrigin: "left" }}
                className="absolute bottom-1 left-0 z-0 h-3 w-full opacity-70"
              />
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="mt-6 max-w-md text-lg text-neutral-500">
            Understanding Network Segmentation.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
            className="mt-10 flex items-center gap-3 text-sm text-neutral-500">
            <div className="h-9 w-9 rounded-full bg-neutral-900 text-white grid place-items-center text-xs font-bold">MJ</div>
            <div>
              <div className="font-semibold text-neutral-900">Presented by Maher Jaidi</div>
              <div className="text-xs">Network Engineer · Keynote Session</div>
            </div>
          </motion.div>
        </div>

        <div className="relative aspect-square w-full">
          <svg viewBox="0 0 500 500" className="h-full w-full">
            <Defs />
            {/* orbit rings */}
            {[110, 170, 220].map((r, i) => (
              <motion.circle key={r} cx={250} cy={250} r={r} fill="none" stroke="#e5e5e5" strokeDasharray="2 6"
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.1 }} />
            ))}
            <SwitchIcon x={140} y={220} w={220} h={60} label="CORE SWITCH" ports={8} />
            {/* devices around */}
            {[
              { a: -90, l: "PC" }, { a: -30, l: "PC" }, { a: 30, l: "Server" }, { a: 90, l: "Printer" }, { a: 150, l: "AP" }, { a: 210, l: "PC" },
            ].map((d, i) => {
              const rad = (d.a * Math.PI) / 180;
              const x = 250 + Math.cos(rad) * 200;
              const y = 250 + Math.sin(rad) * 200;
              return <g key={i}><Cable d={`M 250 250 Q ${(250 + x) / 2} ${(250 + y) / 2 - 20} ${x} ${y}`} stroke="#d4d4d4" delay={0.6 + i * 0.08} /><Device x={x} y={y} label={d.l} /></g>;
            })}
            {/* invisible path used for packets */}
            <path id="s1-p1" d="M 250 250 Q 340 200 420 130" fill="none" opacity="0" />
            <path id="s1-p2" d="M 250 250 Q 160 320 80 400" fill="none" opacity="0" />
            <path id="s1-p3" d="M 250 250 Q 350 300 420 380" fill="none" opacity="0" />
            <Packet pathId="s1-p1" duration={2.4} />
            <Packet pathId="s1-p2" duration={3} delay={0.6} />
            <Packet pathId="s1-p3" duration={2.6} delay={1.2} color="#111" />
          </svg>
        </div>
      </div>
    </SlideShell>
  );
}
