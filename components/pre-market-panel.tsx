"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePortfolioStore } from "@/lib/store";

export function PreMarketPanel() {
  const plan = usePortfolioStore((s) => s.preMarketPlan);
  return (
    <Card>
      <h3 className="mb-4 text-lg font-semibold">Today&apos;s Pre-Market Plan</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-sm text-zinc-400">Market sentiment</p>
          <Badge className="mt-2 bg-blue-500/20 text-blue-300">{plan.marketSentiment}</Badge>
          <p className="mt-3 text-sm"><span className="font-medium">Fed/rate summary:</span> {plan.fedSummary}</p>
          <p className="mt-2 text-sm"><span className="font-medium">Jobs/inflation summary:</span> {plan.macroSummary}</p>
        </div>

        <div>
          <p className="text-sm text-zinc-400">Sector sentiment</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {Object.entries(plan.sectorSentiment).map(([sector, mood]) => (
              <Badge key={sector} className="bg-zinc-800 text-zinc-200">
                {sector}: {mood}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <ul className="rounded-md bg-zinc-950 p-3 text-sm">
          <li className="mb-2 font-medium">Top actions for today</li>
          {plan.topActions.map((x) => (
            <li key={x}>• {x}</li>
          ))}
        </ul>
        <ul className="rounded-md bg-zinc-950 p-3 text-sm">
          <li className="mb-2 font-medium">Buy zones</li>
          {plan.buyZones.map((x) => (
            <li key={x}>• {x}</li>
          ))}
        </ul>
        <ul className="rounded-md bg-zinc-950 p-3 text-sm">
          <li className="mb-2 font-medium">Stop-loss / risk control</li>
          {plan.stopLossNotes.map((x) => (
            <li key={x}>• {x}</li>
          ))}
        </ul>
        <ul className="rounded-md bg-zinc-950 p-3 text-sm">
          <li className="mb-2 font-medium">Alert triggers</li>
          {plan.alertTriggers.map((x) => (
            <li key={x}>• {x}</li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
