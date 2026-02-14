import { useState } from "react";
import { useVault } from "../context/VaultContext";

import SearchBar from "../components/ui/SearchBar";
import PasswordCard from "../components/ui/PasswordCard";
import Modal from "../components/ui/Modal";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import { motion } from "framer-motion";
import { useToast } from "../context/ToastContext";

import { exportToCSV } from "../utils/exportCSV";
import { getPasswordStrength } from "../utils/passwordStrength";

export default function Vault() {
  const {
    vault,
    deletePassword,
    updatePassword,
  } = useVault();

  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [filter, setFilter] = useState("all");

  const { pushToast } = useToast();

  // 🔍 Filtered list
  const filtered = vault.filter((item) => {
    const matchesSearch =
      [item.name, item.username, item.url, item.note]
        .some((f) =>
          (f || "")
            .toLowerCase()
            .includes(search.toLowerCase())
        );

    if (filter === "favorites")
      return item.favorite && matchesSearch;

    if (filter !== "all")
      return (
        item.category?.toLowerCase() === filter &&
        matchesSearch
      );

    return matchesSearch;
  });

  const saveEdit = () => {
    const strength = getPasswordStrength(editing.password);

    updatePassword(editing.id, {
      ...editing,
      strength: strength.label,
    });

    pushToast("Password updated");
    setEditing(null);
  };

  const toggleFavorite = (id) => {
    const entry = vault.find((v) => v.id === id);
    if (!entry) return;

    updatePassword(id, {
      favorite: !entry.favorite,
    });
  };

  return (
    <div>

      {/* Header */}
      <div className="flex flex-wrap gap-4 justify-between mb-6">

        <h1 className="text-3xl font-bold">
          Vault
        </h1>

        <div className="flex gap-3 items-center">

          <SearchBar
            value={search}
            onChange={setSearch}
          />

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
            className="bg-slate-800 border border-white/10 rounded-lg px-3 py-2"
          >
            <option value="all">All</option>
            <option value="favorites">Favorites</option>
            <option value="work">Work</option>
            <option value="banking">Banking</option>
            <option value="social">Social</option>
          </select>

          <Button
            variant="ghost"
            onClick={() => exportToCSV(vault)}
          >
            Export CSV
          </Button>

        </div>

      </div>

      {/* Empty */}
      {vault.length === 0 && (
        <div className="text-center text-slate-400 mt-20">
          No passwords yet. Add one 🔐
        </div>
      )}

      {/* Grid */}
      <motion.div
        layout
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filtered.map((entry) => (
          <motion.div
            key={entry.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <PasswordCard
              entry={entry}
              onEdit={setEditing}
              onDelete={(id) =>
                setConfirmDelete(id)
              }
              onCopy={() =>
                pushToast("Password copied")
              }
              onToggleFav={toggleFavorite}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* ✏️ Edit */}
      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
      >
        {editing && (
          <div className="space-y-4">

            <h2 className="text-xl font-bold">
              Edit Password
            </h2>

            <Input
              label="Name"
              value={editing.name || ""}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  name: e.target.value,
                })
              }
            />

            <Input
              label="URL"
              value={editing.url || ""}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  url: e.target.value,
                })
              }
            />

            <Input
              label="Username"
              value={editing.username || ""}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  username: e.target.value,
                })
              }
            />

            <Input
              label="Password"
              value={editing.password || ""}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  password: e.target.value,
                })
              }
            />

            <Input
              label="Note"
              value={editing.note || ""}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  note: e.target.value,
                })
              }
            />

            <Input
              label="Category"
              value={editing.category || ""}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  category: e.target.value,
                })
              }
            />

            <div className="flex justify-end gap-3 pt-4">

              <Button
                variant="ghost"
                onClick={() => setEditing(null)}
              >
                Cancel
              </Button>

              <Button onClick={saveEdit}>
                Save Changes
              </Button>

            </div>

          </div>
        )}
      </Modal>

      {/* 🗑 Delete */}
      <Modal
        open={!!confirmDelete}
        onClose={() =>
          setConfirmDelete(null)
        }
      >
        <div className="space-y-4">

          <h2 className="text-xl font-bold text-red-400">
            Delete Password?
          </h2>

          <p className="text-slate-400">
            This action cannot be undone.
          </p>

          <div className="flex justify-end gap-3 pt-4">

            <Button
              variant="ghost"
              onClick={() =>
                setConfirmDelete(null)
              }
            >
              Cancel
            </Button>

            <Button
              variant="danger"
              onClick={() => {
                deletePassword(confirmDelete);
                pushToast("Password deleted");
                setConfirmDelete(null);
              }}
            >
              Delete
            </Button>

          </div>

        </div>
      </Modal>

    </div>
  );
}
