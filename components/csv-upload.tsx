"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { usePortfolioStore } from "@/lib/store";

export function CsvUpload() {
  const uploadCsv = usePortfolioStore((s) => s.uploadCsv);
  const [message, setMessage] = useState<string>("Upload a CSV with headers like ticker, quantity, cost basis, market value, gain/loss, allocation.");

  const onFile = async (file: File | null) => {
    if (!file) return;
    const text = await file.text();
    try {
      uploadCsv(text);
      setMessage(`Loaded snapshot from ${file.name}.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "CSV upload failed.");
    }
  };

  return (
    <Card>
      <h2 className="mb-2 text-lg font-semibold">CSV Upload</h2>
      <p className="mb-3 text-sm text-zinc-400">Latest uploaded snapshot is persisted locally in browser storage.</p>
      <div className="flex flex-wrap items-center gap-3">
        <Input type="file" accept=".csv,text/csv" onChange={(e) => onFile(e.target.files?.[0] ?? null)} />
        <Button onClick={() => setMessage("Tip: include optional columns like sector, assetClass, convictionTag for better recommendations.")}>CSV format tips</Button>
      </div>
      <p className="mt-3 text-sm text-zinc-300">{message}</p>
    </Card>
  );
}
