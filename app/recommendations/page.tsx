import { HoldingsTable } from "@/components/holdings-table";
import { PreMarketPanel } from "@/components/pre-market-panel";

export default function RecommendationsPage() {
  return (
    <main className="space-y-4">
      <PreMarketPanel />
      <HoldingsTable />
    </main>
  );
}
