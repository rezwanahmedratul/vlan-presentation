import { SlideShell, Defs, YELLOW } from "../primitives";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

type Cmd = { p: string; cmd: string; vlan?: 10 | 20 | 30; port?: number };

const COMMANDS: Cmd[] = [
  { p: "Switch>", cmd: "enable" },
  { p: "Switch#", cmd: "configure terminal" },
  // VLAN 10 - HR
  { p: "Switch(config)#", cmd: "vlan 10", vlan: 10 },
  { p: "Switch(config-vlan)#", cmd: "name HR", vlan: 10 },
  { p: "Switch(config-vlan)#", cmd: "exit" },
  { p: "Switch(config)#", cmd: "interface fa0/1" },
  { p: "Switch(config-if)#", cmd: "switchport mode access" },
  { p: "Switch(config-if)#", cmd: "switchport access vlan 10", vlan: 10, port: 0 },
  { p: "Switch(config-if)#", cmd: "exit" },
  // VLAN 20 - SALES
  { p: "Switch(config)#", cmd: "vlan 20", vlan: 20 },
  { p: "Switch(config-vlan)#", cmd: "name SALES", vlan: 20 },
  { p: "Switch(config-vlan)#", cmd: "exit" },
  { p: "Switch(config)#", cmd: "interface fa0/2" },
  { p: "Switch(config-if)#", cmd: "switchport access vlan 20", vlan: 20, port: 1 },
  { p: "Switch(config-if)#", cmd: "exit" },
  // VLAN 30 - IT
  { p: "Switch(config)#", cmd: "vlan 30", vlan: 30 },
  { p: "Switch(config-vlan)#", cmd: "name IT", vlan: 30 },
  { p: "Switch(config-vlan)#", cmd: "exit" },
  { p: "Switch(config)#", cmd: "interface fa0/3" },
  { p: "Switch(config-if)#", cmd: "switchport access vlan 30", vlan: 30, port: 2 },
  { p: "Switch(config-if)#", cmd: "end" },
];

const VLAN_META = {
  10: { name: "HR", color: "#FFD54A", ink: "#8a6d00" },
  20: { name: "SALES", color: "#7dd3fc", ink: "#075985" },
  30: { name: "IT", color: "#c4b5fd", ink: "#4c1d95" },
} as const;

export default function Slide8() {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setShown((s) => (s < COMMANDS.length ? s + 1 : s)), 500);
    return () => clearInterval(t);
  }, []);

  // Which VLANs have been created & which ports are assigned
  const executed = COMMANDS.slice(0, shown);
  const createdVlans = new Set(
    executed.filter((c) => c.cmd.startsWith("vlan ")).map((c) => c.vlan!)
  );
  const assignedPorts: Record<number, 10 | 20 | 30> = {};
  executed.forEach((c) => {
    if (c.cmd.startsWith("switchport access vlan") && c.port !== undefined && c.vlan) {
      assignedPorts[c.port] = c.vlan;
    }
  });

  return (
    <SlideShell eyebrow="Hands-on" title="Creating three VLANs" subtitle="Watch HR, Sales & IT come alive on the switch — line by line.">
      <div className="mt-8 grid flex-1 grid-cols-1 gap-6 md:grid-cols-[1.1fr_1fr]">
        {/* Terminal */}
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-950 shadow-2xl">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span className="ml-3 text-[11px] font-semibold uppercase tracking-widest text-neutral-500">console · Switch01</span>
          </div>
          <div className="min-h-[440px] max-h-[520px] overflow-hidden p-6 font-mono text-[13px] leading-relaxed">
            {executed.slice(-16).map((c, i) => (
              <motion.div key={shown - 16 + i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="flex gap-3">
                <span className="text-neutral-500">{c.p}</span>
                <span className={c.vlan ? "font-semibold" : "text-emerald-300"} style={c.vlan ? { color: VLAN_META[c.vlan].color } : undefined}>{c.cmd}</span>
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

        {/* Live topology */}
        <div className="rounded-2xl border border-neutral-200 bg-gradient-to-br from-white to-neutral-50 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold uppercase tracking-widest text-neutral-500">Live topology</div>
            <div className="flex gap-1.5">
              {[10, 20, 30].map((v) => (
                <motion.span
                  key={v}
                  animate={{ opacity: createdVlans.has(v as 10) ? 1 : 0.25, scale: createdVlans.has(v as 10) ? 1 : 0.9 }}
                  className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                  style={{ background: VLAN_META[v as 10].color, color: VLAN_META[v as 10].ink }}
                >
                  VLAN {v}
                </motion.span>
              ))}
            </div>
          </div>

          <svg viewBox="0 0 420 380" className="mt-3 h-[340px] w-full">
            <Defs />
            {/* Switch */}
            <rect x={70} y={50} width={280} height={58} rx={10} fill="#111" />
            <rect x={70} y={50} width={280} height={58} rx={10} fill="url(#switchGrad)" opacity={0.18} />
            <text x={90} y={84} fill="#fff" fontSize={12} fontWeight={800} letterSpacing={2}>SWITCH01</text>

            {/* Ports */}
            {[0, 1, 2, 3].map((i) => {
              const vlan = assignedPorts[i];
              const meta = vlan ? VLAN_META[vlan] : null;
              return (
                <motion.rect
                  key={i}
                  x={230 + i * 28}
                  y={72}
                  width={22}
                  height={18}
                  rx={2}
                  fill={meta ? meta.color : "#525252"}
                  animate={{ opacity: meta ? [1, 0.5, 1] : 1 }}
                  transition={{ repeat: meta ? Infinity : 0, duration: 1.4 }}
                />
              );
            })}

            {/* Three PCs */}
            {([0, 1, 2] as const).map((i) => {
              const vlan = assignedPorts[i];
              const meta = vlan ? VLAN_META[vlan] : null;
              const x = 40 + i * 130;
              return (
                <g key={i}>
                  <line
                    x1={241 + i * 28}
                    y1={108}
                    x2={x + 50}
                    y2={240}
                    stroke={meta ? meta.color : "#e5e5e5"}
                    strokeWidth={meta ? 2.5 : 1.5}
                    strokeDasharray={meta ? "0" : "4 4"}
                  />
                  <motion.rect
                    x={x}
                    y={245}
                    width={100}
                    height={62}
                    rx={8}
                    fill="#fff"
                    stroke={meta ? meta.color : "#e5e5e5"}
                    strokeWidth={2}
                    animate={{ y: meta ? [245, 243, 245] : 245 }}
                    transition={{ repeat: meta ? Infinity : 0, duration: 2 }}
                  />
                  <text x={x + 50} y={272} textAnchor="middle" fontSize={13} fontWeight={800} fill="#111">
                    PC-{i + 1}
                  </text>
                  <text
                    x={x + 50}
                    y={292}
                    textAnchor="middle"
                    fontSize={10}
                    fontWeight={700}
                    letterSpacing={1.5}
                    fill={meta ? meta.ink : "#a3a3a3"}
                  >
                    {meta ? `VLAN ${vlan} · ${meta.name}` : "unassigned"}
                  </text>
                </g>
              );
            })}

            {/* VLAN badges above switch */}
            <g>
              {([10, 20, 30] as const).map((v, i) => {
                const meta = VLAN_META[v];
                const active = createdVlans.has(v);
                return (
                  <motion.g
                    key={v}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: active ? 1 : 0, y: active ? 0 : -6 }}
                    transition={{ duration: 0.4 }}
                  >
                    <rect x={70 + i * 96} y={18} width={90} height={24} rx={12} fill={meta.color} />
                    <text x={115 + i * 96} y={34} textAnchor="middle" fontSize={11} fontWeight={800} fill={meta.ink}>
                      VLAN {v} · {meta.name}
                    </text>
                  </motion.g>
                );
              })}
            </g>

            {/* Progress caption */}
            <text x={210} y={360} textAnchor="middle" fontSize={11} fontWeight={700} letterSpacing={2} fill="#737373">
              {createdVlans.size === 0
                ? "WAITING FOR CONFIGURATION…"
                : `${createdVlans.size} / 3 VLAN${createdVlans.size > 1 ? "s" : ""} CREATED`}
            </text>
          </svg>
        </div>
      </div>
    </SlideShell>
  );
}
