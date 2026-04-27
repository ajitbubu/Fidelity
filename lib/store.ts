"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { samplePortfolio, mockPreMarketPlan, defaultAlertRules } from "@/lib/mock-data";
import { calculateSummary } from "@/lib/portfolio-math";
import { parsePortfolioCsv } from "@/lib/csv-parser";
import { enrichHoldingsWithRecommendations } from "@/lib/recommendation-engine";
import { AlertRule, PortfolioSnapshot, PreMarketPlan } from "@/lib/types";

interface PortfolioStore {
  snapshot: PortfolioSnapshot;
  preMarketPlan: PreMarketPlan;
  alerts: AlertRule[];
  uploadCsv: (csvText: string) => void;
  setCashAvailable: (cash: number) => void;
}

function withRecommendations(snapshot: PortfolioSnapshot): PortfolioSnapshot {
  const totalValue = snapshot.holdings.reduce((sum, h) => sum + h.marketValue, 0) + snapshot.cashAvailable;
  const holdings = enrichHoldingsWithRecommendations(snapshot.holdings, {
    marketTrend: "Positive",
    totalPortfolioValue: totalValue,
    cashAvailable: snapshot.cashAvailable,
  });

  return { ...snapshot, holdings };
}

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set) => ({
      snapshot: withRecommendations(samplePortfolio),
      preMarketPlan: mockPreMarketPlan,
      alerts: defaultAlertRules,
      uploadCsv: (csvText: string) => {
        const parsed = parsePortfolioCsv(csvText);
        set({ snapshot: withRecommendations(parsed) });
      },
      setCashAvailable: (cash: number) =>
        set((state) => ({
          snapshot: withRecommendations({ ...state.snapshot, cashAvailable: cash }),
        })),
    }),
    {
      name: "portfolio-dashboard-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        snapshot: state.snapshot,
        alerts: state.alerts,
        preMarketPlan: state.preMarketPlan,
      }),
    }
  )
);

export const usePortfolioSummary = () => {
  const snapshot = usePortfolioStore((s) => s.snapshot);
  return calculateSummary(snapshot);
};
