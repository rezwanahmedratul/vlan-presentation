import { SlideShell, Defs, SwitchIcon, Device, Cable, Packet } from "../primitives";
import { motion } from "motion/react";
import { AlertTriangle, ShieldCheck } from "lucide-react";

export default function Slide3() {
  return (
    <SlideShell eyebrow="Motivation" title="Why do we need VLANs?" subtitle="Same hardware. Two very different networks.">
      <div className="mt-8 grid flex-1 grid-cols-1 gap-6 md:grid-cols-2">
        {/* Without VLAN */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="relative overflow-hidden rounded-3xl border border-red-200 bg-red-50/40 p-6">
          <div className="flex items-center gap-2 text-red-600 text-xs font-bold uppercase tracking-widest"><AlertTriangle className="h-4 w-4" />Without VLAN</div>
          <div className="mt-1 text-2xl font-bold">Broadcast storm</div>
          <svg viewBox="0 0 400 260" className="mt-4 h-56 w-full">
            <Defs />
            <SwitchIcon x={100} y={20} w={200} h={44} label="SWITCH" ports={6} />
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const x = 30 + i * 68;
              return (
                <g key={i}>
                  <Cable d={`M ${x} 220 L ${x} 120 L ${140 + i * 20} 64`} stroke="#ef4444" delay={0.3 + i * 0.05} width={1.5} />
                  <Device x={x} y={230} label="PC" color="#ef4444" size={32} />
                </g>
              );
            })}
            {/* chaos packets */}
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <path id={`s3a-${i}`} d={`M 200 44 Q ${100 + i * 100} ${100 + i * 40} ${50 + i * 130} 220`} fill="none" opacity={0} />
                <Packet pathId={`s3a-${i}`} color="#ef4444" duration={1.3} delay={i * 0.3} size={6} />
              </g>
            ))}
          </svg>
          <ul className="mt-2 space-y-1 text-sm text-red-700/80">
            <li>• Broadcasts hit every device</li>
            <li>• No isolation between teams</li>
            <li>• Congestion & security risk</li>
          </ul>
        </motion.div>

        {/* With VLAN */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}
          className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6">
          <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-widest"><ShieldCheck className="h-4 w-4" />With VLAN</div>
          <div className="mt-1 text-2xl font-bold">Separated by design</div>
          <svg viewBox="0 0 400 260" className="mt-4 h-56 w-full">
            <Defs />
            <SwitchIcon x={100} y={20} w={200} h={44} label="SWITCH" ports={6} />
            {[
              { c: "#FFD54A", xs: [30, 98] },
              { c: "#111", xs: [166, 234] },
              { c: "#737373", xs: [302, 370] },
            ].map((v, gi) => v.xs.map((x, pi) => (
              <g key={`${gi}-${pi}`}>
                <Cable d={`M ${x} 220 L ${x} 120 L ${140 + gi * 60 + pi * 20} 64`} stroke={v.c} delay={0.3 + gi * 0.1 + pi * 0.05} width={2} />
                <Device x={x} y={230} label={["HR", "Fin", "IT"][gi]} color={v.c} size={32} />
                <path id={`s3b-${gi}-${pi}`} d={`M ${x} 220 L ${x} 120 L ${140 + gi * 60 + pi * 20} 64`} fill="none" opacity={0} />
                <Packet pathId={`s3b-${gi}-${pi}`} color={v.c} duration={2.6} delay={gi * 0.4 + pi * 0.6} size={5} />
              </g>
            )))}
          </svg>
          <ul className="mt-2 space-y-1 text-sm text-neutral-600">
            <li>✓ Security · segmented departments</li>
            <li>✓ Performance · less broadcast traffic</li>
            <li>✓ Management · logical groups</li>
          </ul>
        </motion.div>
      </div>
    </SlideShell>
  );
}
