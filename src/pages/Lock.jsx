import { useState } from "react";
import { useVault } from "../context/VaultContext";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

export default function Lock() {
  const { unlock } = useVault();
  const [pwd, setPwd] = useState("");

  return (
    <div className="h-screen flex items-center justify-center">

      <div className="bg-white/5 p-10 rounded-3xl w-[380px] border">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Unlock Vault 🔐
        </h1>

        <Input
          type="password"
          label="Master Password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />

        <Button
          className="w-full mt-6"
          onClick={() => unlock(pwd)}
        >
          Unlock
        </Button>

      </div>

    </div>
  );
}
