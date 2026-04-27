import Papa from "papaparse";
import { Holding, PortfolioSnapshot } from "@/lib/types";

const numeric = (v: string | number | undefined) =>
  Number(String(v ?? "0").replace(/[$,%\s,]/g, "")) || 0;

function parseRow(row: Record<string, string>): Holding {
  return {
    ticker: row.ticker ?? row.symbol ?? "UNKNOWN",
    name: row.company ?? row.name ?? row.asset ?? "Unknown Asset",
    quantity: numeric(row.quantity ?? row.qty),
    avgCost: numeric(row.avgCost ?? row["cost basis"] ?? row.costBasis),
    currentPrice: numeric(row.currentPrice ?? row.price ?? row["last price"]),
    marketValue: numeric(row.marketValue ?? row.value ?? row["market value"]),
    gainLoss: numeric(row.gainLoss ?? row["gain/loss"] ?? row.pnl),
    allocationPct: numeric(row.allocation ?? row["allocation %"] ?? row.weight),
    assetClass: (row.assetClass as Holding["assetClass"]) ?? "Equity",
    sector: row.sector ?? "Unknown",
    convictionTag: row.convictionTag as Holding["convictionTag"],
    fundamentalsWeak: row.fundamentalsWeak === "true",
  };
}

export function parsePortfolioCsv(csvText: string): PortfolioSnapshot {
  const result = Papa.parse<Record<string, string>>(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim(),
  });

  if (result.errors.length > 0) {
    throw new Error(`CSV parsing failed: ${result.errors[0]?.message ?? "Unknown error"}`);
  }

  const holdings = result.data.map(parseRow).filter((h) => h.ticker !== "UNKNOWN");
  const normalizedTotal = holdings.reduce((sum, h) => sum + h.marketValue, 0) || 1;

  const normalizedHoldings = holdings.map((h) => ({
    ...h,
    allocationPct: h.allocationPct > 0 ? h.allocationPct : (h.marketValue / normalizedTotal) * 100,
  }));

  return {
    asOf: new Date().toISOString().slice(0, 10),
    cashAvailable: 0,
    holdings: normalizedHoldings,
  };
}
