"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePortfolioStore } from "@/lib/store";

export function AlertsBoard() {
  const alerts = usePortfolioStore((s) => s.alerts);

  return (
    <Card>
      <h3 className="mb-3 text-lg font-semibold">Alerts Board</h3>
      <div className="space-y-2">
        {alerts.map((alert) => (
          <div key={alert.label} className="rounded-md bg-zinc-950 p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="font-medium">{alert.label}</p>
              <Badge className={alert.enabled ? "bg-emerald-500/20 text-emerald-300" : "bg-zinc-700 text-zinc-200"}>
                {alert.enabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-zinc-400">{alert.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
