import { SlideShell, Defs, YELLOW } from "../primitives";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const COMMANDS = [
  { p: "Switch>", cmd: "enable" },
  { p: "Switch#", cmd: "configure terminal" },
  { p: "Switch(config)#", cmd: "vlan 10" },
  { p: "Switch(config-vlan)#", cmd: "name HR" },
  { p: "Switch(config-vlan)#", cmd: "exit" },
  { p: "Switch(config)#", cmd: "interface fa0/1" },
  { p: "Switch(config-if)#", cmd: "switchport mode access" },
  { p: "Switch(config-if)#", cmd: "switchport access vlan 10" },
  { p: "Switch(config-if)#", cmd: "end" },
];

export default function Slide8() {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setShown((s) => (s < COMMANDS.length ? s + 1 : s)), 600);
    return () => clearInterval(t);
  }, []);

  return (
    <SlideShell eyebrow="Hands-on" title="Creating a VLAN" subtitle="Live from the CLI. Each command reshapes the switch in real time.">
      <div className="mt-8 grid flex-1 grid-cols-1 gap-6 md:grid-cols-[1.15fr_1fr]">
        {/* Terminal */}
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-950 shadow-2xl">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span className="ml-3 text-[11px] font-semibold uppercase tracking-widest text-neutral-500">console · Switch01</span>
          </div>
          <div className="min-h-[380px] p-6 font-mono text-[13px] leading-relaxed">
            {COMMANDS.slice(0, shown).map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="flex gap-3">
                <span className="text-neutral-500">{c.p}</span>
                <span className="text-emerald-300">{c.cmd}</span>
              </motion.div>
            ))}
            {shown < COMMANDS.length && (
              <div className="flex gap-3 mt-1">
                <span className="text-neutral-500">{COMMANDS[shown].p}</span>
                <span className="text-neutral-300">_<motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} className="inline-block w-2 h-4 -mb-0.5 bg-emerald-300 align-middle ml-0.5" /></span>
              </div>
            )}
          </div>
        </div>

        {/* Live switch diagram */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <div className="text-xs font-bold uppercase tracking-widest text-neutral-500">Live topology</div>
          <svg viewBox="0 0 400 320" className="mt-3 h-72 w-full">
            <Defs />
            <rect x={60} y={40} width={280} height={54} rx={10} fill="#111" />
            <rect x={60} y={40} width={280} height={54} rx={10} fill="url(#switchGrad)" opacity={0.15} />
            <text x={80} y={72} fill="#fff" fontSize={12} fontWeight={800} letterSpacing={2}>SWITCH01</text>
            {[0, 1, 2, 3].map((i) => {
              const active = shown >= 6 && i === 0;
              return (
                <motion.rect key={i} x={200 + i * 30} y={62} width={22} height={16} rx={2}
                  fill={active ? YELLOW : "#525252"}
                  animate={{ opacity: active ? [1, 0.4, 1] : 1 }} transition={{ repeat: active ? Infinity : 0, duration: 1.2 }} />
              );
            })}
            <line x1={210} x2={210} y1={94} y2={200} stroke={shown >= 6 ? YELLOW : "#e5e5e5"} strokeWidth={2.5} />
            <rect x={160} y={210} width={100} height={50} rx={6} fill="#fff" stroke={shown >= 7 ? YELLOW : "#e5e5e5"} strokeWidth={2} />
            <text x={210} y={232} textAnchor="middle" fontSize={12} fontWeight={800} fill="#111">HR PC</text>
            <text x={210} y={250} textAnchor="middle" fontSize={10} fontWeight={700} letterSpacing={2}
              fill={shown >= 8 ? "#8a6d00" : "#a3a3a3"}>VLAN 10</text>
            {shown >= 3 && (
              <motion.g initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>
                <rect x={60} y={110} width={110} height={26} rx={13} fill={YELLOW} />
                <text x={115} y={128} textAnchor="middle" fontSize={11} fontWeight={800} fill="#111">VLAN 10 · HR</text>
              </motion.g>
            )}
          </svg>
        </div>
      </div>
    </SlideShell>
  );
}
