import { useState } from "react";
import { useVault } from "../context/VaultContext";
import { useToast } from "../context/ToastContext";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import PasswordStrength from "../components/ui/PasswordStrength";

import { generatePassword } from "../utils/passwordGenerator";
import { getPasswordStrength } from "../utils/passwordStrength";

export default function AddPassword() {
  const { addPassword } = useVault();
  const { pushToast } = useToast();

  const [form, setForm] = useState({
    name: "",
    url: "",
    username: "",
    password: "",
    note: "",
    category: "",
  });

  const strength = getPasswordStrength(form.password);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.url || !form.username || !form.password) {
      pushToast("Please fill all required fields", "error");
      return;
    }

    addPassword({
      ...form,
      strength: strength.label,
      createdAt: Date.now(),
      favorite: false,
    });

    pushToast("Password added successfully");

    setForm({
      name: "",
      url: "",
      username: "",
      password: "",
      note: "",
      category: "",
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white/5 p-8 rounded-2xl border border-white/10 space-y-6">

      <h1 className="text-2xl font-bold">
        Add New Password
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <Input
          label="Website / App Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <Input
          label="Website / App URL"
          name="url"
          value={form.url}
          onChange={handleChange}
          placeholder="https://example.com"
        />

        <Input
          label="Username / Email"
          name="username"
          value={form.username}
          onChange={handleChange}
        />

        {/* Password */}
        <div className="space-y-2">

          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />

          <PasswordStrength password={form.password} />

          <button
            type="button"
            onClick={() =>
              setForm({
                ...form,
                password: generatePassword(),
              })
            }
            className="text-sm text-indigo-400 hover:underline"
          >
            Generate Secure Password
          </button>

        </div>

        <Input
          label="Note"
          name="note"
          value={form.note}
          onChange={handleChange}
        />

        <Input
          label="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="e.g. Social, Work, Banking"
        />

        <Button type="submit" className="w-full">
          Add Password
        </Button>

      </form>

    </div>
  );
}