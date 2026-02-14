import { NavLink } from "react-router-dom";
import {
  Home,
  PlusCircle,
  Lock,
  Settings as SettingsIcon,
} from "lucide-react";

const links = [
  { name: "Dashboard", path: "/", icon: <Home size={20} /> },
  { name: "Add Password", path: "/add", icon: <PlusCircle size={20} /> },
  { name: "Vault", path: "/vault", icon: <Lock size={20} /> },
  { name: "Settings", path: "/settings", icon: <SettingsIcon size={20} /> },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white/5 backdrop-blur-xl p-6 flex flex-col gap-6 border-r border-white/10">
      <h1 className="text-2xl font-bold">PassVault</h1>

      <nav className="flex flex-col gap-3 mt-6">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition ${
                isActive ? "bg-primary/20 text-primary" : "text-slate-400"
              }`
            }
          >
            {link.icon}
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
