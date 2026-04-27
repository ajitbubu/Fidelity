"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { usePortfolioStore } from "@/lib/store";
import { fmtCurrency, fmtPct } from "@/lib/utils";

const recommendationClass: Record<string, string> = {
  Buy: "bg-emerald-500/20 text-emerald-300",
  Hold: "bg-blue-500/20 text-blue-300",
  Trim: "bg-amber-500/20 text-amber-300",
  Sell: "bg-rose-500/20 text-rose-300",
  Watch: "bg-zinc-500/20 text-zinc-300",
};

export function HoldingsTable() {
  const holdings = usePortfolioStore((s) => s.snapshot.holdings);

  return (
    <Card className="overflow-x-auto">
      <h3 className="mb-3 font-semibold">Holdings</h3>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-800 text-left text-zinc-400">
            {[
              "Ticker",
              "Company/Asset",
              "Quantity",
              "Avg cost",
              "Current price",
              "Market value",
              "Unrealized gain/loss",
              "Allocation %",
              "Risk",
              "Recommendation",
              "Notes",
            ].map((h) => (
              <th key={h} className="px-2 py-2 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {holdings.map((h) => (
            <tr key={h.ticker} className="border-b border-zinc-900 align-top">
              <td className="px-2 py-2 font-semibold">{h.ticker}</td>
              <td className="px-2 py-2">{h.name}</td>
              <td className="px-2 py-2">{h.quantity}</td>
              <td className="px-2 py-2">{fmtCurrency(h.avgCost)}</td>
              <td className="px-2 py-2">{fmtCurrency(h.currentPrice)}</td>
              <td className="px-2 py-2">{fmtCurrency(h.marketValue)}</td>
              <td className="px-2 py-2">{fmtCurrency(h.gainLoss)}</td>
              <td className="px-2 py-2">{fmtPct(h.allocationPct)}</td>
              <td className="px-2 py-2">{h.riskLevel}</td>
              <td className="px-2 py-2">
                <Badge className={recommendationClass[h.recommendation ?? "Watch"]}>{h.recommendation ?? "Watch"}</Badge>
              </td>
              <td className="px-2 py-2 text-zinc-400">{h.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
