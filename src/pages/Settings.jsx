import { useState } from "react";
import { useVault } from "../context/VaultContext";
import { useToast } from "../context/ToastContext";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Modal from "../components/ui/Modal";

export default function Settings() {
  const { vault, clearVault, setMasterPassword } = useVault();
  const { pushToast } = useToast();

  const [master, setMaster] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);
  const [importFile, setImportFile] = useState(null);

  // Set Master Password
  const handleMaster = () => {
    if (!master) return pushToast("Enter a password", "error");
    setMasterPassword(master);
    pushToast("Master password updated");
    setMaster("");
  };

  // Export Vault
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(vault, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "vault.json";
    link.click();
    pushToast("Vault exported");
  };

  // Import Vault
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        localStorage.setItem("vault", JSON.stringify(data));
        pushToast("Vault imported successfully");
        window.location.reload();
      } catch {
        pushToast("Invalid JSON file", "error");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-md mx-auto space-y-8">

      <h1 className="text-3xl font-bold">Settings</h1>

      {/* Master Password */}
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
        <h2 className="text-xl font-semibold">Master Password</h2>
        <div className="flex gap-3">
          <Input
            type="password"
            placeholder="Enter new master password"
            value={master}
            onChange={(e) => setMaster(e.target.value)}
          />
          <Button onClick={handleMaster}>Set</Button>
        </div>
      </div>

      {/* Export / Import Vault */}
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
        <h2 className="text-xl font-semibold">Vault Backup</h2>
        <div className="flex gap-3">
          <Button onClick={handleExport}>Export Vault</Button>
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-none file:bg-primary file:text-white hover:file:bg-primary/80"
          />
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-900/10 p-6 rounded-2xl border border-red-500/30 space-y-4">
        <h2 className="text-xl font-semibold text-red-400">Danger Zone</h2>
        <p className="text-slate-400 text-sm">
          Clear all passwords. This action <strong>cannot</strong> be undone.
        </p>
        <Button variant="danger" onClick={() => setConfirmClear(true)}>
          Clear Vault
        </Button>
      </div>

      {/* Confirm Clear Modal */}
      <Modal open={confirmClear} onClose={() => setConfirmClear(false)}>
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-red-400">Clear Vault?</h2>
          <p className="text-slate-400">This action cannot be undone.</p>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost" onClick={() => setConfirmClear(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                clearVault();
                setConfirmClear(false);
                pushToast("Vault cleared");
              }}
            >
              Clear
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
