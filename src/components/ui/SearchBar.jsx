import { Search } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full max-w-md">

      <Search
        className="absolute left-3 top-3 text-slate-400"
        size={18}
      />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by site or username..."
        className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 outline-none focus:ring-2 focus:ring-primary"
      />

    </div>
  );
}
