import { SummaryCards } from "@/components/summary-cards";
import { HoldingsTable } from "@/components/holdings-table";
import { PreMarketPanel } from "@/components/pre-market-panel";
import { TargetPlanBoard } from "@/components/target-plan-board";
import { ChartsBoard } from "@/components/charts-board";

export default function DashboardPage() {
  return (
    <main className="space-y-4">
      <SummaryCards />
      <TargetPlanBoard />
      <PreMarketPanel />
      <ChartsBoard />
      <HoldingsTable />
    </main>
  );
}
