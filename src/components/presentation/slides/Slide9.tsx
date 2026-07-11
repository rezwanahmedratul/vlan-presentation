import { SlideShell, Defs, Cable, Packet, YELLOW } from "../primitives";
import { motion } from "motion/react";
import { Wifi, Router, Shield, Globe } from "lucide-react";

const DEPTS = [
  { name: "HR", vlan: 10, color: YELLOW, x: 130 },
  { name: "Finance", vlan: 20, color: "#111", x: 380 },
  { name: "IT", vlan: 30, color: "#525252", x: 630 },
  { name: "Guest WiFi", vlan: 99, color: "#a3a3a3", x: 880 },
];

export default function Slide9() {
  return (
    <SlideShell eyebrow="In the wild" title="Real-world example" subtitle="One office. Four VLANs. Zero cross-talk.">
      <div className="mt-6 flex-1">
        <svg viewBox="0 0 1080 520" className="h-[520px] w-full">
          <Defs />
          {/* Internet */}
          <motion.g initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <circle cx={540} cy={50} r={30} fill="#111" />
            <text x={540} y={55} textAnchor="middle" fill="#fff" fontSize={11} fontWeight={800}>NET</text>
            <text x={540} y={100} textAnchor="middle" fontSize={11} fontWeight={700} letterSpacing={2} fill="#737373">INTERNET</text>
          </motion.g>
          {/* firewall */}
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
            <rect x={480} y={130} width={120} height={40} rx={8} fill={YELLOW} />
            <text x={540} y={155} textAnchor="middle" fill="#111" fontSize={12} fontWeight={800}>FIREWALL</text>
          </motion.g>
          <Cable d="M 540 80 L 540 130" width={2.5} delay={0.35} />
          {/* router */}
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
            <rect x={490} y={200} width={100} height={40} rx={8} fill="#111" />
            <text x={540} y={225} textAnchor="middle" fill="#fff" fontSize={12} fontWeight={800}>ROUTER</text>
          </motion.g>
          <Cable d="M 540 170 L 540 200" width={2.5} delay={0.55} />
          {/* core switch */}
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <rect x={330} y={280} width={420} height={50} rx={10} fill="#111" />
            <rect x={330} y={280} width={420} height={50} rx={10} fill="url(#switchGrad)" opacity={0.15} />
            <text x={540} y={310} textAnchor="middle" fill="#fff" fontSize={12} fontWeight={800} letterSpacing={2}>CORE SWITCH · 802.1Q TRUNK</text>
          </motion.g>
          <Cable d="M 540 240 L 540 280" width={2.5} delay={0.7} />

          {/* departments */}
          {DEPTS.map((d, i) => (
            <g key={d.name}>
              <Cable d={`M 540 330 Q ${(540 + d.x) / 2} 380 ${d.x} 420`} stroke={d.color} width={2.5} delay={0.85 + i * 0.1} />
              <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 + i * 0.1 }}>
                <rect x={d.x - 90} y={420} width={180} height={80} rx={12} fill="#fff" stroke={d.color} strokeWidth={2} />
                <text x={d.x} y={448} textAnchor="middle" fontSize={14} fontWeight={800} fill="#111">{d.name}</text>
                <text x={d.x} y={470} textAnchor="middle" fontSize={11} fontWeight={800} letterSpacing={2} fill={d.color === YELLOW ? "#8a6d00" : d.color}>VLAN {d.vlan}</text>
                <text x={d.x} y={488} textAnchor="middle" fontSize={10} fill="#737373">isolated broadcast</text>
              </motion.g>
              <path id={`s9-${i}`} d={`M 540 305 Q ${(540 + d.x) / 2} 380 ${d.x} 420`} fill="none" opacity={0} />
              <Packet pathId={`s9-${i}`} color={d.color} duration={2.8} delay={i * 0.4} />
            </g>
          ))}
        </svg>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
          className="mt-2 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-neutral-500">
          <span className="inline-flex items-center gap-2"><Globe className="h-4 w-4" />Internet</span>
          <span className="inline-flex items-center gap-2"><Shield className="h-4 w-4" />Firewall</span>
          <span className="inline-flex items-center gap-2"><Router className="h-4 w-4" />Router</span>
          <span className="inline-flex items-center gap-2"><Wifi className="h-4 w-4" />Guest network isolated</span>
        </motion.div>
      </div>
    </SlideShell>
  );
}
