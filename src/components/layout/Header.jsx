export default function Header() {
  return (
    <header className="h-16 border-b border-white/10 bg-slate-950 flex items-center justify-between px-6">

      <h2 className="font-semibold text-lg">
        Password Manager
      </h2>

      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center font-bold">
          N
        </div>
      </div>

    </header>
  );
}
