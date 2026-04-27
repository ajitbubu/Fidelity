export type Recommendation = "Buy" | "Hold" | "Trim" | "Sell" | "Watch";
export type RiskLevel = "Low" | "Medium" | "High";

export interface Holding {
  ticker: string;
  name: string;
  quantity: number;
  avgCost: number;
  currentPrice: number;
  marketValue: number;
  gainLoss: number;
  allocationPct: number;
  assetClass: "Equity" | "ETF" | "Crypto" | "Cash";
  sector: string;
  convictionTag?: "AI" | "Semiconductor" | "EV" | "Crypto" | "Clean Energy" | "Core";
  fundamentalsWeak?: boolean;
  recommendation?: Recommendation;
  riskLevel?: RiskLevel;
  notes?: string;
}

export interface PortfolioSnapshot {
  asOf: string;
  cashAvailable: number;
  holdings: Holding[];
}

export interface PortfolioSummary {
  totalPortfolioValue: number;
  totalGainLoss: number;
  returnPct: number;
  targetValue: number;
  gapToTarget: number;
  requiredReturnPct: number;
  daysRemaining: number;
  requiredMonthlyGrowthPct: number;
  requiredWeeklyGrowthPct: number;
}

export interface PreMarketPlan {
  marketSentiment: "Bullish" | "Neutral" | "Bearish";
  fedSummary: string;
  macroSummary: string;
  sectorSentiment: Record<string, "Bullish" | "Neutral" | "Bearish">;
  topActions: string[];
  buyZones: string[];
  stopLossNotes: string[];
  alertTriggers: string[];
}

export interface AlertRule {
  label: string;
  description: string;
  enabled: boolean;
}
