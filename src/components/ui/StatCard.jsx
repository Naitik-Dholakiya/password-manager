import { motion } from "framer-motion";

export default function StatCard({ icon, title, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white/5 p-6 rounded-2xl border border-white/10 flex items-center gap-4"
    >
      <div className="p-3 bg-primary/20 text-primary rounded-xl">
        {icon}
      </div>
      <div>
        <p className="text-sm text-slate-400">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
    </motion.div>
  );
}
