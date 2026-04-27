"use client";

import { Card, CardTitle, CardValue } from "@/components/ui/card";
import { usePortfolioStore, usePortfolioSummary } from "@/lib/store";
import { fmtCurrency, fmtPct } from "@/lib/utils";

export function SummaryCards() {
  const summary = usePortfolioSummary();
  const cash = usePortfolioStore((s) => s.snapshot.cashAvailable);

  const cards = [
    ["Total portfolio value", fmtCurrency(summary.totalPortfolioValue)],
    ["Cash available", fmtCurrency(cash)],
    ["Total gain/loss", fmtCurrency(summary.totalGainLoss)],
    ["% return", fmtPct(summary.returnPct)],
    ["Target value", fmtCurrency(summary.targetValue)],
    ["Gap to target", fmtCurrency(summary.gapToTarget)],
    ["Required return", fmtPct(summary.requiredReturnPct)],
    ["Days remaining", `${summary.daysRemaining}`],
    ["Req. monthly/weekly", `${fmtPct(summary.requiredMonthlyGrowthPct)} / ${fmtPct(summary.requiredWeeklyGrowthPct)}`],
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map(([title, value]) => (
        <Card key={title}>
          <CardTitle>{title}</CardTitle>
          <CardValue>{value}</CardValue>
        </Card>
      ))}
    </div>
  );
}
