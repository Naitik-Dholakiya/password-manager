import { Routes, Route } from "react-router-dom";
import { useVault } from "./context/VaultContext";
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import AddPassword from "./pages/AddPassword";
import Vault from "./pages/Vault";
import Settings from "./pages/Settings";
import Lock from "./pages/Lock";
import useAutoLock from "./hooks/useAutoLock";


export default function App() {
  // Auto Lock after 5 minutes of inactivity
  const { unlocked, lock } = useVault();
  
  useAutoLock(5 * 60 * 1000, lock); // 5 minutes
  // Locked Screen
  if (!unlocked) {
    return <Lock />;
  }

  return (
    <div className="flex min-h-screen text-white bg-slate-900">

      <Sidebar />

      <main className="flex-1 p-8 overflow-auto">

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddPassword />} />
          <Route path="/vault" element={<Vault />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>

      </main>
    </div>
  );
}
