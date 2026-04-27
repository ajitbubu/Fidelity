import { Holding, Recommendation, RiskLevel } from "@/lib/types";

type MarketTrend = "Positive" | "Sideways" | "Negative";

export interface RecommendationContext {
  marketTrend: MarketTrend;
  totalPortfolioValue: number;
  cashAvailable: number;
}

function deriveRiskLevel(holding: Holding): RiskLevel {
  if (holding.assetClass === "Crypto" || holding.allocationPct > 20) return "High";
  if (holding.allocationPct > 10 || holding.sector === "EV") return "Medium";
  return "Low";
}

export function generateHoldingRecommendation(
  holding: Holding,
  context: RecommendationContext
): { recommendation: Recommendation; riskLevel: RiskLevel; notes: string } {
  const gainPct = holding.marketValue > 0 ? (holding.gainLoss / (holding.marketValue - holding.gainLoss || 1)) * 100 : 0;
  const notes: string[] = [];
  const riskLevel = deriveRiskLevel(holding);

  if (holding.allocationPct > 20) {
    notes.push("Concentration risk: allocation above 20%.");
  }

  if (holding.assetClass === "Crypto" && holding.allocationPct > 15) {
    notes.push("Crypto volatility risk elevated due to portfolio weight.");
  }

  if (gainPct > 50 && holding.allocationPct > 20) {
    return {
      recommendation: "Trim",
      riskLevel,
      notes: [...notes, "Position has >50% gain with high concentration; scale out partially."].join(" "),
    };
  }

  if (gainPct < -25 && holding.fundamentalsWeak) {
    return {
      recommendation: "Sell",
      riskLevel,
      notes: [...notes, "Loss exceeds 25% with weaker fundamentals/news backdrop."].join(" "),
    };
  }

  const aiOrSemi = holding.convictionTag === "AI" || holding.convictionTag === "Semiconductor";
  if (aiOrSemi && context.marketTrend === "Positive") {
    return {
      recommendation: "Hold",
      riskLevel,
      notes: [...notes, "High conviction in positive trend; add only on pullbacks."].join(" "),
    };
  }

  if (context.cashAvailable / context.totalPortfolioValue > 0.05) {
    notes.push("Cash is above 5%; use staged deployment plan.");
  }

  if (holding.gainLoss < 0 && holding.assetClass !== "Crypto") {
    return {
      recommendation: "Watch",
      riskLevel,
      notes: [...notes, "Monitor technical support and thesis updates."].join(" "),
    };
  }

  return {
    recommendation: "Hold",
    riskLevel,
    notes: notes.join(" ") || "Position aligned with current strategy.",
  };
}

export function enrichHoldingsWithRecommendations(holdings: Holding[], context: RecommendationContext): Holding[] {
  return holdings.map((holding) => {
    const { recommendation, riskLevel, notes } = generateHoldingRecommendation(holding, context);
    return {
      ...holding,
      recommendation,
      riskLevel,
      notes: holding.notes ? `${holding.notes} ${notes}`.trim() : notes,
    };
  });
}
