"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { usePortfolioSummary } from "@/lib/store";
import { fmtCurrency, fmtPct } from "@/lib/utils";

export function TargetPlanBoard() {
  const summary = usePortfolioSummary();
  const progress = (summary.totalPortfolioValue / summary.targetValue) * 100;
  const scenarios = [
    { name: "Conservative", yearEndValue: summary.totalPortfolioValue * 1.08 },
    { name: "Base case", yearEndValue: summary.totalPortfolioValue * 1.16 },
    { name: "Aggressive", yearEndValue: summary.totalPortfolioValue * 1.24 },
  ];

  return (
    <Card>
      <h3 className="mb-4 text-lg font-semibold">Target Plan Board</h3>
      <p className="text-sm text-zinc-400">
        Progress: {fmtCurrency(summary.totalPortfolioValue)} / {fmtCurrency(summary.targetValue)} ({fmtPct(progress)})
      </p>
      <div className="mt-2">
        <Progress value={progress} />
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {scenarios.map((s) => (
          <div key={s.name} className="rounded-md bg-zinc-950 p-3">
            <p className="text-sm text-zinc-400">{s.name}</p>
            <p className="mt-1 text-lg font-semibold">{fmtCurrency(s.yearEndValue)}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-md bg-zinc-950 p-3 text-sm">
          <p className="font-medium">Required return per month</p>
          <p className="mt-1">{fmtPct(summary.requiredMonthlyGrowthPct)}</p>
        </div>
        <div className="rounded-md bg-zinc-950 p-3 text-sm">
          <p className="font-medium">Suggested allocation model</p>
          <p className="mt-1 text-zinc-300">Core AI/Semis 45% · Broad Equity 25% · Crypto 15% · Tactical themes 10% · Cash 5%</p>
        </div>
      </div>
    </Card>
  );
}
