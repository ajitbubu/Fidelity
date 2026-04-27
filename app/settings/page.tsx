"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { usePortfolioStore } from "@/lib/store";

export default function SettingsPage() {
  const cash = usePortfolioStore((s) => s.snapshot.cashAvailable);
  const setCash = usePortfolioStore((s) => s.setCashAvailable);

  return (
    <main>
      <Card>
        <h2 className="mb-2 text-lg font-semibold">Settings</h2>
        <p className="mb-2 text-sm text-zinc-400">Manual controls for local simulation and planning.</p>
        <label className="block text-sm font-medium">Cash available</label>
        <Input type="number" value={cash} onChange={(e) => setCash(Number(e.target.value) || 0)} className="mt-1 max-w-xs" />
      </Card>
    </main>
  );
}
