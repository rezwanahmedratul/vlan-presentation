import { SlideShell, YELLOW } from "../primitives";
import { motion } from "motion/react";
import { Router, Shield, Server, Monitor, Printer, Tv, Camera, Cpu } from "lucide-react";

const aware = [
  { Icon: Router, label: "Managed Switch" },
  { Icon: Router, label: "Router" },
  { Icon: Shield, label: "Firewall" },
  { Icon: Cpu, label: "Hypervisor" },
  { Icon: Server, label: "Linux Server" },
];
const unaware = [
  { Icon: Monitor, label: "Desktop PC" },
  { Icon: Printer, label: "Printer" },
  { Icon: Tv, label: "Smart TV" },
  { Icon: Camera, label: "IP Camera" },
];

export default function Slide7() {
  return (
    <SlideShell eyebrow="Compatibility" title="VLAN-aware vs unaware" subtitle="Some devices speak 802.1Q. Others need the switch to strip the tag before delivery.">
      <div className="mt-8 grid flex-1 grid-cols-1 gap-6 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="rounded-3xl border border-neutral-200 bg-white p-8">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-neutral-500">
            <span className="h-2 w-2 rounded-full" style={{ background: YELLOW }} />VLAN-aware
          </div>
          <div className="text-2xl font-bold">Understands tags</div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {aware.map(({ Icon, label }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.06 }}
                className="flex items-center gap-3 rounded-xl border border-neutral-200 px-4 py-3 text-sm font-semibold">
                <Icon className="h-4 w-4 text-neutral-700" />{label}
                <span className="ml-auto rounded-md px-2 py-0.5 text-[10px] font-bold" style={{ background: YELLOW, color: "#111" }}>TAG</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 rounded-xl bg-neutral-50 p-3 font-mono text-xs text-neutral-600">
            frame → [DST][SRC]<span className="mx-1 rounded px-1" style={{ background: YELLOW, color: "#111" }}>[VLAN 10]</span>[TYPE][DATA]
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}
          className="rounded-3xl border border-neutral-900 bg-neutral-900 p-8 text-white">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-neutral-400">
            <span className="h-2 w-2 rounded-full bg-neutral-500" />VLAN-unaware
          </div>
          <div className="text-2xl font-bold">Tag stripped at port</div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {unaware.map(({ Icon, label }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.06 }}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold">
                <Icon className="h-4 w-4 text-neutral-300" />{label}
                <span className="ml-auto rounded-md border border-white/20 px-2 py-0.5 text-[10px] font-bold text-neutral-400 line-through">TAG</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 rounded-xl bg-white/5 p-3 font-mono text-xs text-neutral-300">
            frame → [DST][SRC]<span className="mx-1 rounded px-1 line-through text-neutral-500">[VLAN 10]</span>[TYPE][DATA]
          </div>
        </motion.div>
      </div>
    </SlideShell>
  );
}
