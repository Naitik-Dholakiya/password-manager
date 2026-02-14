export default function Button({
  children,
  variant = "primary",
  ...props
}) {
  const base =
    "px-5 py-3 rounded-xl font-semibold transition active:scale-95";

  const styles = {
    primary: "bg-primary hover:opacity-90",
    danger: "bg-red-500/20 text-red-400 hover:bg-red-500/30",
    ghost: "bg-white/10 hover:bg-white/20",
  };

  return (
    <button
      {...props}
      className={`${base} ${styles[variant]}`}
    >
      {children}
    </button>
  );
}
