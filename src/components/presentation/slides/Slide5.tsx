import { SlideShell, YELLOW } from "../primitives";
import { motion } from "motion/react";

const FIELDS = [
  { label: "Dest MAC", w: 90, color: "#f5f5f5", text: "#525252" },
  { label: "Src MAC", w: 90, color: "#f5f5f5", text: "#525252" },
  { label: "802.1Q Tag", w: 130, color: YELLOW, text: "#111", highlight: true },
  { label: "EtherType", w: 90, color: "#f5f5f5", text: "#525252" },
  { label: "Payload", w: 220, color: "#f5f5f5", text: "#525252" },
  { label: "FCS", w: 60, color: "#f5f5f5", text: "#525252" },
];

export default function Slide5() {
  return (
    <SlideShell eyebrow="Protocol" title="VLAN Tagging" subtitle="An extra 4-byte tag identifies which VLAN a frame belongs to as it travels between switches.">
      <div className="mt-10 flex-1">
        {/* Ethernet frame */}
        <div className="flex items-stretch justify-center gap-1">
          {FIELDS.map((f, i) => (
            <motion.div key={f.label}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.08 }}
              className="relative flex flex-col items-center justify-center rounded-md border border-neutral-200 py-4 text-xs font-semibold"
              style={{ width: f.w, background: f.color, color: f.text, boxShadow: f.highlight ? "0 10px 30px -10px rgba(255,213,74,0.7)" : undefined }}>
              {f.highlight && (
                <motion.div className="absolute -top-8 rounded-full bg-neutral-900 px-2.5 py-1 text-[10px] font-bold text-white"
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
                  VLAN ID
                </motion.div>
              )}
              {f.label}
            </motion.div>
          ))}
        </div>

        {/* Trunk animation */}
        <div className="mt-14">
          <svg viewBox="0 0 1000 220" className="h-52 w-full">
            {/* switch A */}
            <motion.g initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <rect x={40} y={80} width={180} height={60} rx={10} fill="#111" />
              <text x={130} y={116} textAnchor="middle" fill="#fff" fontSize={12} fontWeight={800} letterSpacing={2}>SWITCH A</text>
            </motion.g>
            {/* trunk */}
            <motion.line x1={220} y1={110} x2={780} y2={110} stroke="#111" strokeWidth={3}
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 0.9 }} />
            <text x={500} y={100} textAnchor="middle" fontSize={11} fontWeight={700} letterSpacing={3} fill="#737373">TRUNK · 802.1Q</text>
            {/* switch B */}
            <motion.g initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <rect x={780} y={80} width={180} height={60} rx={10} fill="#111" />
              <text x={870} y={116} textAnchor="middle" fill="#fff" fontSize={12} fontWeight={800} letterSpacing={2}>SWITCH B</text>
            </motion.g>

            {/* tagged packet */}
            <path id="s5-trunk" d="M 220 110 L 780 110" fill="none" opacity={0} />
            <g>
              <rect x={-22} y={-12} width={44} height={24} rx={4} fill={YELLOW}>
                <animateMotion dur="3s" repeatCount="indefinite" rotate="auto"><mpath href="#s5-trunk"/></animateMotion>
              </rect>
              <text fontSize={10} fontWeight={800} fill="#111" textAnchor="middle" y={4}>
                VLAN 10
                <animateMotion dur="3s" repeatCount="indefinite" rotate="auto"><mpath href="#s5-trunk"/></animateMotion>
              </text>
            </g>
            <g>
              <rect x={-22} y={-12} width={44} height={24} rx={4} fill="#111">
                <animateMotion dur="3s" begin="1s" repeatCount="indefinite" rotate="auto"><mpath href="#s5-trunk"/></animateMotion>
              </rect>
              <text fontSize={10} fontWeight={800} fill="#fff" textAnchor="middle" y={4}>
                VLAN 20
                <animateMotion dur="3s" begin="1s" repeatCount="indefinite" rotate="auto"><mpath href="#s5-trunk"/></animateMotion>
              </text>
            </g>
          </svg>
        </div>
      </div>
    </SlideShell>
  );
}
