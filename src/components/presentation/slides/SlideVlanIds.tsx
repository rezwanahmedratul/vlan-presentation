import { SlideShell, YELLOW } from "../primitives";
import { motion } from "motion/react";

const ROWS = [
  { id: 10, dept: "HR", color: YELLOW },
  { id: 20, dept: "Finance", color: "#111" },
  { id: 30, dept: "IT", color: "#525252" },
  { id: 40, dept: "Servers", color: "#0ea5e9" },
  { id: 50, dept: "Guest Wi-Fi", color: "#a3a3a3" },
  { id: 99, dept: "Management", color: "#ef4444" },
];

export default function SlideVlanIds() {
  return (
    <SlideShell eyebrow="Reference" title="Common VLAN IDs" subtitle="A conventional map most networks follow — but any ID from 1 to 4094 is fair game.">
      <div className="mt-8 grid flex-1 grid-cols-1 gap-8 md:grid-cols-[1.15fr_1fr]">
        {/* Table */}
        <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
          <div className="grid grid-cols-[120px_1fr_auto] items-center border-b border-neutral-200 bg-neutral-50 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-neutral-500">
            <div>VLAN ID</div><div>Department</div><div>Color</div>
          </div>
          {ROWS.map((r, i) => (
            <motion.div key={r.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.12 }}
              className="grid grid-cols-[120px_1fr_auto] items-center border-b border-neutral-100 px-6 py-4 last:border-0">
              <div className="font-mono text-2xl font-bold text-neutral-900">{r.id}</div>
              <div className="text-base font-semibold text-neutral-800">{r.dept}</div>
              <div className="flex items-center gap-2">
                <motion.span className="h-4 w-10 rounded-full" style={{ background: r.color }}
                  animate={{ opacity: [1, 0.6, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Illustration - office lighting up */}
        <div className="flex flex-col">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6">
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-500">Office · lighting up</div>
            <svg viewBox="0 0 420 300" className="mt-3 h-72 w-full">
              {/* building */}
              <rect x={20} y={30} width={380} height={250} rx={16} fill="#fafafa" stroke="#e5e5e5" />
              {ROWS.map((r, i) => {
                const col = i % 3;
                const row = Math.floor(i / 3);
                const x = 50 + col * 120;
                const y = 60 + row * 110;
                return (
                  <motion.g key={r.id} initial={{ opacity: 0.25 }} animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.15 }}>
                    <rect x={x} y={y} width={100} height={80} rx={10} fill={r.color} opacity={0.15} />
                    <rect x={x} y={y} width={100} height={80} rx={10} fill="none" stroke={r.color} strokeWidth={2} />
                    <text x={x + 50} y={y + 34} textAnchor="middle" fontSize={11} fontWeight={800} letterSpacing={2}
                      fill={r.color === YELLOW ? "#8a6d00" : r.color}>V{r.id}</text>
                    <text x={x + 50} y={y + 54} textAnchor="middle" fontSize={11} fontWeight={700} fill="#111">{r.dept}</text>
                    <motion.circle cx={x + 90} cy={y + 12} r={3} fill={r.color}
                      animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.2 }} />
                  </motion.g>
                );
              })}
            </svg>
          </div>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6 }}
            className="mt-4 rounded-2xl bg-neutral-900 px-5 py-4 text-sm text-neutral-200">
            <span className="font-bold" style={{ color: YELLOW }}>1 – 4094</span> · VLAN IDs range from 1 to 4094, allowing thousands of separate logical networks on the same physical infrastructure.
          </motion.div>
        </div>
      </div>
    </SlideShell>
  );
}
