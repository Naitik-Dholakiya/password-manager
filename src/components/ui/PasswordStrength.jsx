import { getPasswordStrength } from "../../utils/passwordStrength";

export default function PasswordStrength({ password }) {
  const strength = getPasswordStrength(password);

  const bars = ["", "", "", ""];

  return (
    <div>
      <div className="flex gap-1 mb-1">
        {bars.map((_, i) => (
          <div
            key={i}
            className={`h-1 w-full rounded transition ${
              i < strength.score
                ? strength.score <= 1
                  ? "bg-red-500"
                  : strength.score === 2
                  ? "bg-yellow-400"
                  : strength.score === 3
                  ? "bg-green-400"
                  : "bg-emerald-500"
                : "bg-slate-700"
            }`}
          />
        ))}
      </div>

      <p className="text-xs text-slate-400">
        Strength:{" "}
        <span className="font-semibold text-white">
          {strength.label}
        </span>
      </p>
    </div>
  );
}
