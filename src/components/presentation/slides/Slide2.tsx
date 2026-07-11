import { SlideShell, Defs, SwitchIcon, Device, Cable, Packet } from "../primitives";
import { motion } from "motion/react";

const VLANS = [
  { color: "#FFD54A", name: "VLAN 10 · HR", ports: [0, 1] },
  { color: "#111", name: "VLAN 20 · Finance", ports: [2, 3] },
  { color: "#737373", name: "VLAN 30 · IT", ports: [4, 5] },
];

export default function Slide2() {
  return (
    <SlideShell eyebrow="Concept" title="What is a VLAN?" subtitle="A VLAN divides one physical switch into multiple logical networks. Packets only travel within their VLAN.">
      <div className="mt-8 grid flex-1 grid-cols-1 gap-8 md:grid-cols-[1.1fr_1fr] items-center">
        <div className="relative h-[420px] w-full">
          <svg viewBox="0 0 560 420" className="h-full w-full">
            <Defs />
            <SwitchIcon x={170} y={40} w={220} h={54} label="SWITCH" ports={6} />
            {VLANS.map((v, gi) =>
              v.ports.map((p, pi) => {
                const px = 170 + 220 - (6 * 22) - 12 + p * 22 + 8;
                const py = 94;
                const dx = 60 + gi * 180 + pi * 60;
                const dy = 340;
                return (
                  <g key={`${gi}-${pi}`}>
                    <Cable d={`M ${px} ${py} L ${px} ${py + 40} L ${dx} ${py + 100} L ${dx} ${dy}`} stroke={v.color} width={2.5} delay={0.3 + gi * 0.2 + pi * 0.1} />
                    <Device x={dx} y={dy} label={v.name.split("·")[1]?.trim() || v.name} color={v.color} />
                    <path id={`s2-p-${gi}-${pi}`} d={`M ${dx} ${dy - 20} L ${dx} ${py + 100} L ${px} ${py + 40} L ${px} ${py}`} fill="none" opacity={0} />
                    <Packet pathId={`s2-p-${gi}-${pi}`} color={v.color} duration={2.6} delay={gi * 0.3 + pi * 0.5} />
                  </g>
                );
              })
            )}
          </svg>
        </div>
        <div className="space-y-4">
          {VLANS.map((v, i) => (
            <motion.div key={v.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.15 }}
              className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white/70 px-5 py-4 shadow-sm">
              <motion.div className="h-10 w-10 rounded-lg" style={{ background: v.color }}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }} />
              <div>
                <div className="text-sm font-bold text-neutral-900">{v.name}</div>
                <div className="text-xs text-neutral-500">Isolated broadcast domain</div>
              </div>
            </motion.div>
          ))}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-sm text-neutral-500 pt-2">
            One switch. Three worlds. Zero interference.
          </motion.p>
        </div>
      </div>
    </SlideShell>
  );
}
