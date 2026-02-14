import { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { encryptVault, decryptVault } from "../utils/crypto";
import { hashPassword } from "../utils/hash";
import { useEffect } from "react";

const VaultContext = createContext();

export function VaultProvider({ children }) {
  const [encrypted, setEncrypted] = useLocalStorage(
    "vault_encrypted",
    ""
  );

  const [masterHash, setMasterHash] = useLocalStorage(
    "master_hash",
    null
  );

  const [vault, setVault] = useState([]);
  const [unlocked, setUnlocked] = useState(false);
  const [sessionKey, setSessionKey] = useState(null);

  // 🔓 Unlock / Setup
  const unlock = (pwd) => {
    if (!masterHash) {
      setMasterHash(hashPassword(pwd));
      setEncrypted(encryptVault([], pwd));
      setSessionKey(pwd);
      setVault([]);
      setUnlocked(true);
      return true;
    }

    if (hashPassword(pwd) === masterHash) {
      const decrypted = decryptVault(encrypted, pwd);
      setVault(decrypted || []);
      setSessionKey(pwd);
      setUnlocked(true);
      return true;
    }

    return false;
  };

  // 🔒 Lock
  const lock = () => {
    setVault([]);
    setUnlocked(false);
    setSessionKey(null);
  };

  // 💾 Persist encrypted
  const persist = (data) => {
    if (!sessionKey) return;

    setEncrypted(encryptVault(data, sessionKey));
    setVault(data);
  };

  // ➕ Add
  const addPassword = (entry) => {
    const updated = [
      ...vault,
      { ...entry, id: crypto.randomUUID() },
    ];
    persist(updated);
  };

  // ✏️ Update
  const updatePassword = (id, data) => {
    setVault((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, ...data } : item
      );

      localStorage.setItem("vault", JSON.stringify(updated));
      return updated;
    });
  };

  // Delete
  const deletePassword = (id) => {
    setVault((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem("vault", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("vault")) || [];
    setVault(stored);
  }, []);

  return (
    <VaultContext.Provider
      value={{
        vault,
        unlocked,
        unlock,
        lock,
        addPassword,
        updatePassword,
        deletePassword,
      }}
    >
      {children}
    </VaultContext.Provider>
  );
}

export const useVault = () => useContext(VaultContext);
