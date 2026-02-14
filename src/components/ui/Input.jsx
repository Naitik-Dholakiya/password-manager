export default function Input({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1">

      {label && (
        <label className="text-sm text-slate-400">
          {label}
        </label>
      )}

      <input
        {...props}
        className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary transition"
      />

    </div>
  );
}
