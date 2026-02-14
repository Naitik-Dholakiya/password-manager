import {
  Eye,
  EyeOff,
  Copy,
  Trash2,
  Pencil,
  ExternalLink,
  Star,
} from "lucide-react";
import { useState } from "react";

export default function PasswordCard({
  entry,
  onDelete,
  onEdit,
  onCopy,
  onToggleFav,
}) {
  const [show, setShow] = useState(false);

  const copyPassword = () => {
    navigator.clipboard.writeText(entry.password);
    onCopy && onCopy();
  };

  const strengthColor = {
    Weak: "text-red-400",
    Medium: "text-yellow-400",
    Strong: "text-green-400",
    "Very Strong": "text-teal-400",
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10 hover:border-primary transition">

      {/* Top */}
      <div className="flex justify-between items-start mb-2">

        {/* Name + URL */}
        <div>
          <a
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-lg hover:underline text-blue-400 flex items-center gap-1"
          >
            {entry.name}
            <ExternalLink size={14} />
          </a>

          <p className="text-xs text-slate-500 break-all">
            {entry.url}
          </p>
        </div>

        {/* Favorite */}
        <button
          onClick={() => onToggleFav(entry.id)}
          className={`p-1 rounded-lg ${entry.favorite
            ? "text-yellow-400"
            : "text-slate-500 hover:text-yellow-400"
            }`}
        >
          <Star
            size={18}
            fill={entry.favorite ? "currentColor" : "none"}
          />
        </button>

      </div>

      {/* Username */}
      <p className="text-sm text-slate-400 mb-1">
        {entry.username}
      </p>

      {/* Note */}
      {entry.note && (
        <p className="text-xs text-slate-500 italic mb-2">
          {entry.note}
        </p>
      )}

      {/* Password Row */}
      <div className="flex items-center justify-between mt-2">

        <div className="font-mono flex items-center gap-3">

          <span>
            {show ? entry.password : "••••••••"}
          </span>

          {!show && entry.strength && (
            <span
              className={`text-xs font-semibold ${strengthColor[entry.strength]
                }`}
            >
              {entry.strength}
            </span>
          )}

        </div>

        {/* Actions */}
        <div className="flex gap-2">

          <button
            onClick={() => setShow(!show)}
            className="p-2 hover:bg-white/10 rounded-lg"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>

          <button
            onClick={copyPassword}
            className="p-2 hover:bg-white/10 rounded-lg"
          >
            <Copy size={18} />
          </button>

          <button
            onClick={() => onEdit(entry)}
            className="p-2 hover:bg-white/10 rounded-lg"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(entry.id)}
            className="p-2 hover:bg-red-500/20 rounded-lg text-red-400"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

    </div>
  );
}