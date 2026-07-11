import { SlideShell, YELLOW } from "../primitives";
import { motion } from "motion/react";
import { Tag, Unplug as TagOff } from "lucide-react";

export default function Slide6() {
  return (
    <SlideShell eyebrow="Port Types" title="Tagged vs Untagged" subtitle="Two roles, two very different jobs on the same switch.">
      <div className="mt-8 grid flex-1 grid-cols-1 gap-6 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="relative overflow-hidden rounded-3xl border border-neutral-900 bg-neutral-900 p-8 text-white">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em]" style={{ color: YELLOW }}>
            <Tag className="h-4 w-4" />Tagged Port
          </div>
          <div className="mt-2 text-3xl font-bold">Trunk link</div>
          <p className="mt-2 text-neutral-400 text-sm">Carries multiple VLANs. Each frame keeps its 802.1Q tag.</p>

          <svg viewBox="0 0 400 140" className="my-6 h-32 w-full">
            <rect x={20} y={50} width={100} height={40} rx={8} fill="#fff" opacity={0.1} />
            <text x={70} y={75} textAnchor="middle" fill="#fff" fontSize={11} fontWeight={800}>SWITCH</text>
            <rect x={280} y={50} width={100} height={40} rx={8} fill="#fff" opacity={0.1} />
            <text x={330} y={75} textAnchor="middle" fill="#fff" fontSize={11} fontWeight={800}>ROUTER</text>
            <line x1={120} x2={280} y1={70} y2={70} stroke={YELLOW} strokeWidth={3} />
            <path id="s6-t" d="M 120 70 L 280 70" fill="none" opacity={0} />
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect x={-16} y={-8} width={32} height={16} rx={3} fill={YELLOW}>
                  <animateMotion dur="2.4s" begin={`${i * 0.6}s`} repeatCount="indefinite"><mpath href="#s6-t"/></animateMotion>
                </rect>
                <text fontSize={9} fontWeight={800} fill="#111" textAnchor="middle" y={3}>
                  V{[10, 20, 30][i]}
                  <animateMotion dur="2.4s" begin={`${i * 0.6}s`} repeatCount="indefinite"><mpath href="#s6-t"/></animateMotion>
                </text>
              </g>
            ))}
          </svg>

          <ul className="space-y-1.5 text-sm text-neutral-300">
            <li>• Switch ↔ Switch</li>
            <li>• Switch ↔ Router</li>
            <li>• Hypervisor uplinks</li>
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-neutral-600">
            <TagOff className="h-4 w-4" />Untagged Port
          </div>
          <div className="mt-2 text-3xl font-bold">Access port</div>
          <p className="mt-2 text-neutral-500 text-sm">Belongs to a single VLAN. Devices are unaware of tagging.</p>

          <svg viewBox="0 0 400 140" className="my-6 h-32 w-full">
            <rect x={20} y={50} width={100} height={40} rx={8} fill="#111" />
            <text x={70} y={75} textAnchor="middle" fill="#fff" fontSize={11} fontWeight={800}>SWITCH</text>
            <rect x={290} y={45} width={80} height={50} rx={6} fill="#fff" stroke="#111" strokeWidth={2} />
            <text x={330} y={75} textAnchor="middle" fill="#111" fontSize={11} fontWeight={800}>PC</text>
            <line x1={120} x2={290} y1={70} y2={70} stroke="#111" strokeWidth={3} />
            <path id="s6-a" d="M 120 70 L 290 70" fill="none" opacity={0} />
            <g>
              <rect x={-14} y={-7} width={28} height={14} rx={3} fill="#111">
                <animateMotion dur="2s" repeatCount="indefinite"><mpath href="#s6-a"/></animateMotion>
              </rect>
            </g>
          </svg>

          <ul className="space-y-1.5 text-sm text-neutral-600">
            <li>• Desktops & laptops</li>
            <li>• Printers</li>
            <li>• IP phones, cameras</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  );
}
