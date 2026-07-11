import { SlideShell, YELLOW } from "../primitives";
import { motion } from "motion/react";
import { ShieldCheck, ShieldAlert, Lock } from "lucide-react";
import { useEffect, useState } from "react";

const VLANS = [
  { id: 10, name: "HR", color: YELLOW, safe: true },
  { id: 20, name: "Finance", color: "#0ea5e9", safe: true },
  { id: 30, name: "IT", color: "#22c55e", safe: true },
  { id: 40, name: "Guest Wi-Fi", color: "#a855f7", safe: false },
];

export default function SlideSecurity() {
  const [phase, setPhase] = useState(0); // 0 healthy, 1 infected, 2 contained
  useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p + 1) % 3), 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <SlideShell eyebrow="Security" title="How VLANs help protect a network" subtitle="Network segmentation limits the impact of security incidents.">
      <div className="mt-6 grid flex-1 grid-cols-1 gap-6 md:grid-cols-[1.4fr_1fr]">
        {/* Network diagram */}
        <div className="relative rounded-3xl border border-neutral-200 bg-white p-4">
          <svg viewBox="0 0 900 500" className="h-[440px] w-full">
            {/* Core switch */}
            <rect x={370} y={30} width={160} height={44} rx={8} fill="#111" />
            <text x={450} y={57} textAnchor="middle" fill="#fff" fontSize={11} fontWeight={800} letterSpacing={2}>CORE + FW</text>

            {VLANS.map((v, i) => {
              const x = 90 + i * 220;
              const infected = phase >= 1 && !v.safe;
              const contained = phase === 2;
              const strokeC = infected ? "#ef4444" : v.color;
              return (
                <g key={v.id}>
                  {/* trunk */}
                  <line x1={450} y1={74} x2={x + 90} y2={140} stroke={v.color} strokeOpacity={0.5} strokeWidth={2} />

                  {/* shield/firewall at boundary */}
                  <g transform={`translate(${x + 90}, 120)`}>
                    <motion.circle r={12} fill={contained && !v.safe ? "#ef4444" : "#fff"} stroke={v.color} strokeWidth={2}
                      animate={{ scale: contained ? [1, 1.25, 1] : 1 }} transition={{ duration: 0.8, repeat: contained ? Infinity : 0 }} />
                    <g transform="translate(-6,-6)">
                      <Lock className="w-3 h-3" />
                    </g>
                    <text x={0} y={4} textAnchor="middle" fontSize={10} fontWeight={800} fill={contained && !v.safe ? "#fff" : v.color}>⛨</text>
                  </g>

                  {/* VLAN block */}
                  <motion.rect x={x} y={150} width={180} height={310} rx={16} fill={v.color} fillOpacity={0.08}
                    stroke={strokeC} strokeWidth={2}
                    animate={{ stroke: strokeC, filter: infected ? "drop-shadow(0 0 12px rgba(239,68,68,0.5))" : "none" }} />
                  <text x={x + 90} y={175} textAnchor="middle" fontSize={11} fontWeight={800} letterSpacing={2}
                    fill={v.color === YELLOW ? "#8a6d00" : v.color}>VLAN {v.id}</text>
                  <text x={x + 90} y={196} textAnchor="middle" fontSize={13} fontWeight={800} fill="#111">{v.name}</text>

                  {/* devices */}
                  {[0, 1, 2].map((j) => {
                    const dx = x + 30 + (j % 2) * 90;
                    const dy = 230 + Math.floor(j / 2) * 100;
                    const isInfectedHost = infected && j === 0;
                    return (
                      <g key={j}>
                        <rect x={dx - 22} y={dy - 18} width={44} height={32} rx={4} fill="#fff"
                          stroke={isInfectedHost ? "#ef4444" : v.color} strokeWidth={2} />
                        <rect x={dx - 16} y={dy - 12} width={32} height={16} rx={2}
                          fill={isInfectedHost ? "#ef4444" : v.color} opacity={isInfectedHost ? 0.35 : 0.15} />
                        {/* status dot */}
                        <motion.circle cx={dx + 16} cy={dy - 22} r={4}
                          fill={isInfectedHost ? "#ef4444" : "#22c55e"}
                          animate={{ opacity: [1, 0.35, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
                        {isInfectedHost && (
                          <text x={dx} y={dy + 32} textAnchor="middle" fontSize={9} fontWeight={800} fill="#ef4444">MALWARE</text>
                        )}
                      </g>
                    );
                  })}

                  {/* Attack packets confined to Guest VLAN */}
                  {infected && (
                    <>
                      <path id={`sec-p-${i}`}
                        d={`M ${x + 30} 230 Q ${x + 90} 300 ${x + 120} 330 Q ${x + 60} 380 ${x + 30} 230`}
                        fill="none" opacity={0} />
                      {[0, 0.5, 1].map((delay) => (
                        <g key={delay}>
                          <circle r={5} fill="#ef4444">
                            <animateMotion dur="2.4s" begin={`${delay}s`} repeatCount="indefinite">
                              <mpath href={`#sec-p-${i}`} />
                            </animateMotion>
                          </circle>
                          <circle r={9} fill="#ef4444" opacity={0.3}>
                            <animateMotion dur="2.4s" begin={`${delay}s`} repeatCount="indefinite">
                              <mpath href={`#sec-p-${i}`} />
                            </animateMotion>
                          </circle>
                        </g>
                      ))}
                    </>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Phase banner */}
          <motion.div key={phase}
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
            className="absolute left-6 top-6 flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em]"
            style={{
              background: phase === 0 ? "#dcfce7" : phase === 1 ? "#fee2e2" : "#fef3c7",
              color: phase === 0 ? "#166534" : phase === 1 ? "#b91c1c" : "#8a6d00",
            }}>
            {phase === 0 && <><ShieldCheck className="h-3.5 w-3.5" /> All VLANs healthy</>}
            {phase === 1 && <><ShieldAlert className="h-3.5 w-3.5" /> Guest VLAN infected</>}
            {phase === 2 && <><Lock className="h-3.5 w-3.5" /> Only Guest VLAN affected</>}
          </motion.div>
        </div>

        {/* Side panel */}
        <div className="flex flex-col gap-3">
          {[
            { t: "Attack stays inside its VLAN", s: "Broadcast + L2 boundaries block lateral spread." },
            { t: "Sensitive systems keep running", s: "HR, Finance and IT remain operational." },
            { t: "Isolate without downtime", s: "Admins quarantine one VLAN, not the whole LAN." },
          ].map((it, i) => (
            <motion.div key={it.t} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.12 }}
              className="rounded-2xl border border-neutral-200 bg-white/80 p-5">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-500">0{i + 1}</div>
              <div className="mt-1 text-lg font-bold text-neutral-900">{it.t}</div>
              <div className="text-sm text-neutral-500">{it.s}</div>
            </motion.div>
          ))}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="rounded-2xl bg-neutral-900 p-5 text-sm text-neutral-200">
            <span className="font-bold" style={{ color: YELLOW }}>Note · </span>
            VLANs improve security through isolation, but they are not a complete solution. Firewalls, access controls and monitoring still matter.
          </motion.div>
        </div>
      </div>
    </SlideShell>
  );
}
