import { TARGET_VALUE } from "@/lib/mock-data";
import { Holding, PortfolioSnapshot, PortfolioSummary } from "@/lib/types";

export function daysRemainingInYear(currentDate = new Date()): number {
  const end = new Date(Date.UTC(currentDate.getUTCFullYear(), 11, 31));
  const ms = end.getTime() - currentDate.getTime();
  return Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

export function calculateSummary(snapshot: PortfolioSnapshot): PortfolioSummary {
  const holdingsValue = snapshot.holdings.reduce((sum, h) => sum + h.marketValue, 0);
  const totalPortfolioValue = holdingsValue + snapshot.cashAvailable;
  const totalGainLoss = snapshot.holdings.reduce((sum, h) => sum + h.gainLoss, 0);
  const investedCapital = snapshot.holdings.reduce((sum, h) => sum + (h.marketValue - h.gainLoss), 0);
  const returnPct = investedCapital > 0 ? (totalGainLoss / investedCapital) * 100 : 0;
  const gapToTarget = TARGET_VALUE - totalPortfolioValue;
  const requiredReturnPct = totalPortfolioValue > 0 ? (gapToTarget / totalPortfolioValue) * 100 : 0;
  const daysRemaining = daysRemainingInYear();
  const monthsRemaining = Math.max(1, daysRemaining / 30.44);
  const weeksRemaining = Math.max(1, daysRemaining / 7);

  return {
    totalPortfolioValue,
    totalGainLoss,
    returnPct,
    targetValue: TARGET_VALUE,
    gapToTarget,
    requiredReturnPct,
    daysRemaining,
    requiredMonthlyGrowthPct: requiredReturnPct / monthsRemaining,
    requiredWeeklyGrowthPct: requiredReturnPct / weeksRemaining,
  };
}

export function sectorExposure(holdings: Holding[]): { sector: string; value: number }[] {
  const map = new Map<string, number>();
  holdings.forEach((h) => map.set(h.sector, (map.get(h.sector) || 0) + h.marketValue));
  return Array.from(map.entries()).map(([sector, value]) => ({ sector, value }));
}

export function topConcentration(holdings: Holding[]): { ticker: string; allocation: number }[] {
  return [...holdings]
    .sort((a, b) => b.allocationPct - a.allocationPct)
    .slice(0, 5)
    .map((h) => ({ ticker: h.ticker, allocation: Number(h.allocationPct.toFixed(2)) }));
}
