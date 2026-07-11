import { SlideShell, YELLOW } from "../primitives";
import { motion } from "motion/react";
import { Cable as CableIcon, Network } from "lucide-react";

export default function SlideAccessTrunk() {
  return (
    <SlideShell eyebrow="Ports 101" title="Access vs Trunk Ports" subtitle="Two roles that shape how frames enter and leave a switch.">
      <div className="mt-8 grid flex-1 grid-cols-1 gap-6 md:grid-cols-2">
        {/* Access */}
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
          className="rounded-3xl border border-neutral-200 bg-white p-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-neutral-600">
            <CableIcon className="h-4 w-4" />Access Port
          </div>
          <div className="mt-1 text-3xl font-bold">PC → Switch</div>
          <p className="mt-2 text-sm text-neutral-500">Connects an end device. One VLAN. Untagged frames.</p>

          <svg viewBox="0 0 420 160" className="my-6 h-36 w-full">
            {/* PC */}
            <rect x={24} y={54} width={80} height={54} rx={6} fill="#fff" stroke="#111" strokeWidth={2} />
            <rect x={32} y={62} width={64} height={30} rx={3} fill="#111" opacity={0.08} />
            <text x={64} y={130} textAnchor="middle" fontSize={11} fontWeight={700} fill="#525252">PC</text>
            {/* Switch */}
            <rect x={300} y={54} width={100} height={54} rx={8} fill="#111" />
            <text x={350} y={86} textAnchor="middle" fill="#fff" fontSize={11} fontWeight={800} letterSpacing={2}>SWITCH</text>
            {/* Cable */}
            <line x1={104} x2={300} y1={80} y2={80} stroke="#111" strokeWidth={3} />
            <path id="s-acc" d="M 104 80 L 300 80" fill="none" opacity={0} />
            <g>
              <rect x={-16} y={-8} width={32} height={16} rx={3} fill="#111">
                <animateMotion dur="2.2s" repeatCount="indefinite"><mpath href="#s-acc"/></animateMotion>
              </rect>
            </g>
          </svg>

          <ul className="space-y-1.5 text-sm text-neutral-600">
            <li>• Connects PCs, printers, phones</li>
            <li>• Carries a single VLAN</li>
            <li>• Sends untagged frames</li>
            <li>• Common on end devices</li>
          </ul>
        </motion.div>

        {/* Trunk */}
        <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          className="rounded-3xl border border-neutral-900 bg-neutral-900 p-8 text-white">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em]" style={{ color: YELLOW }}>
            <Network className="h-4 w-4" />Trunk Port
          </div>
          <div className="mt-1 text-3xl font-bold">Switch ⇄ Switch</div>
          <p className="mt-2 text-sm text-neutral-400">One cable, many VLANs, 802.1Q tags on every frame.</p>

          <svg viewBox="0 0 420 160" className="my-6 h-36 w-full">
            <rect x={20} y={54} width={100} height={54} rx={8} fill="#fff" opacity={0.08} />
            <rect x={20} y={54} width={100} height={54} rx={8} fill="none" stroke="#fff" strokeOpacity={0.3} />
            <text x={70} y={86} textAnchor="middle" fill="#fff" fontSize={11} fontWeight={800} letterSpacing={2}>SWITCH A</text>
            <rect x={300} y={54} width={100} height={54} rx={8} fill="#fff" opacity={0.08} />
            <rect x={300} y={54} width={100} height={54} rx={8} fill="none" stroke="#fff" strokeOpacity={0.3} />
            <text x={350} y={86} textAnchor="middle" fill="#fff" fontSize={11} fontWeight={800} letterSpacing={2}>SWITCH B</text>
            <line x1={120} x2={300} y1={80} y2={80} stroke={YELLOW} strokeWidth={3} />
            <path id="s-trk" d="M 120 80 L 300 80" fill="none" opacity={0} />
            {[
              { c: YELLOW, t: "V10", delay: 0 },
              { c: "#fff", t: "V20", delay: 0.5 },
              { c: "#a3a3a3", t: "V30", delay: 1 },
            ].map((p, i) => (
              <g key={i} opacity={0}>
                <set attributeName="opacity" to="1" begin={`${p.delay}s`} />
                <rect x={-18} y={-9} width={36} height={18} rx={3} fill={p.c}>
                  <animateMotion dur="2.4s" begin={`${p.delay}s`} repeatCount="indefinite"><mpath href="#s-trk"/></animateMotion>
                </rect>
                <text fontSize={9} fontWeight={800} fill="#111" textAnchor="middle" y={3}>
                  {p.t}
                  <animateMotion dur="2.4s" begin={`${p.delay}s`} repeatCount="indefinite"><mpath href="#s-trk"/></animateMotion>
                </text>
              </g>
            ))}
          </svg>

          <ul className="space-y-1.5 text-sm text-neutral-300">
            <li>• Switch ↔ Switch, Router, Hypervisor</li>
            <li>• Carries multiple VLANs</li>
            <li>• Uses 802.1Q tagging</li>
            <li>• Backbone of segmented networks</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  );
}
