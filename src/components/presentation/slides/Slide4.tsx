import { SlideShell, Defs, Cable, Packet } from "../primitives";
import { motion } from "motion/react";

const PORTS = [
  { port: 1, vlan: 10, color: "#FFD54A", device: "HR PC" },
  { port: 2, vlan: 10, color: "#FFD54A", device: "HR PC" },
  { port: 3, vlan: 20, color: "#111", device: "Finance" },
  { port: 4, vlan: 30, color: "#737373", device: "IT Server" },
];

export default function Slide4() {
  return (
    <SlideShell eyebrow="Mechanism" title="How VLAN works" subtitle="Ports are mapped to VLANs. Packets stay inside their VLAN — always.">
      <div className="mt-8 flex-1">
        <svg viewBox="0 0 1200 460" className="h-[520px] w-full">
          <Defs />
          {/* switch chassis */}
          <motion.g initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <rect x={120} y={40} width={960} height={110} rx={16} fill="#111" />
            <rect x={120} y={40} width={960} height={110} rx={16} fill="url(#switchGrad)" opacity={0.15} />
            <text x={148} y={78} fill="#fff" fontSize={13} fontWeight={800} letterSpacing={3}>MANAGED SWITCH</text>
            <text x={148} y={100} fill="#FFD54A" fontSize={11} letterSpacing={2}>802.1Q · L2</text>
            <circle cx={1060} cy={62} r={4} fill="#22c55e"><animate attributeName="opacity" values="1;0.2;1" dur="1.5s" repeatCount="indefinite" /></circle>
          </motion.g>

          {PORTS.map((p, i) => {
            const x = 260 + i * 220;
            return (
              <g key={p.port}>
                {/* port */}
                <motion.rect initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 + i * 0.08 }}
                  x={x - 22} y={112} width={44} height={28} rx={4} fill={p.color} />
                <motion.text initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 + i * 0.08 }}
                  x={x} y={130} textAnchor="middle" fontSize={11} fontWeight={800} fill={p.color === "#FFD54A" ? "#111" : "#fff"}>
                  P{p.port}
                </motion.text>

                {/* cable */}
                <Cable d={`M ${x} 140 L ${x} 260 L ${x} 340`} stroke={p.color} width={2.5} delay={0.5 + i * 0.1} />
                {/* device box */}
                <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + i * 0.1 }}>
                  <rect x={x - 68} y={340} width={136} height={72} rx={12} fill="#fff" stroke="#e5e5e5" />
                  <rect x={x - 60} y={352} width={120} height={26} rx={4} fill={p.color} opacity={0.12} />
                  <text x={x} y={370} textAnchor="middle" fontSize={12} fontWeight={700} fill="#111">{p.device}</text>
                  <text x={x} y={398} textAnchor="middle" fontSize={11} fontWeight={700} letterSpacing={2} fill={p.color === "#FFD54A" ? "#8a6d00" : p.color}>
                    VLAN {p.vlan}
                  </text>
                </motion.g>
                {/* packet path both ways */}
                <path id={`s4-p-${i}`} d={`M ${x} 340 L ${x} 140`} fill="none" opacity={0} />
                <Packet pathId={`s4-p-${i}`} color={p.color} duration={2.4} delay={0.9 + i * 0.4} />
              </g>
            );
          })}

          {/* Highlight isolation */}
          <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.3, duration: 0.8 }}
            x1={480} x2={480} y1={155} y2={330} stroke="#e5e5e5" strokeDasharray="4 6" />
          <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.4, duration: 0.8 }}
            x1={700} x2={700} y1={155} y2={330} stroke="#e5e5e5" strokeDasharray="4 6" />
        </svg>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
          className="mx-auto mt-2 max-w-2xl text-center text-sm text-neutral-500">
          Ports 1 & 2 talk to each other. Port 3 and Port 4 live in their own worlds.
        </motion.div>
      </div>
    </SlideShell>
  );
}
