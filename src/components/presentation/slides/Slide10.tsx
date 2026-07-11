import { SlideShell, YELLOW } from "../primitives";
import { motion } from "motion/react";
import { Check } from "lucide-react";

const ITEMS = [
  "Better Security",
  "Less Broadcast Traffic",
  "Better Performance",
  "Easier Management",
  "Logical Network Segmentation",
];

export default function Slide10() {
  return (
    <SlideShell>
      <div className="grid h-full w-full grid-cols-1 items-center gap-10 md:grid-cols-[1.1fr_1fr]">
        <div>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="mb-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-neutral-500">
            <span className="h-px w-8" style={{ background: YELLOW }} />Summary
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }}
            className="text-[clamp(2.5rem,5.5vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.03em]">
            Why VLANs matter.
          </motion.h1>

          <ul className="mt-8 space-y-3">
            {ITEMS.map((t, i) => (
              <motion.li key={t} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.15 }}
                className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white/70 backdrop-blur px-5 py-4">
                <motion.span
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.55 + i * 0.15, type: "spring", stiffness: 400 }}
                  className="grid h-9 w-9 place-items-center rounded-full shadow-sm" style={{ background: YELLOW }}>
                  <Check className="h-4 w-4 text-neutral-900" strokeWidth={3} />
                </motion.span>
                <span className="text-lg font-semibold text-neutral-900">{t}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="relative flex flex-col items-center justify-center">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }}
            className="relative rounded-[2rem] border border-neutral-200 bg-white p-12 text-center shadow-[0_30px_80px_-30px_rgba(0,0,0,0.15)]">
            <motion.div
              className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em]"
              style={{ background: YELLOW, color: "#111" }}
              initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 }}>
              End of Session
            </motion.div>
            <div className="text-[clamp(2.5rem,4.5vw,4rem)] font-bold leading-none tracking-[-0.03em]">Thank You</div>
            <div className="mt-4 text-lg text-neutral-500">Questions?</div>
          </motion.div>
        </div>
      </div>
    </SlideShell>
  );
}
