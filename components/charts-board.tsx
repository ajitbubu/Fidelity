"use client";

import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  LineChart,
} from "recharts";
import { Card } from "@/components/ui/card";
import { usePortfolioStore, usePortfolioSummary } from "@/lib/store";
import { sectorExposure, topConcentration } from "@/lib/portfolio-math";

const colors = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#a855f7", "#22d3ee", "#f97316"];

export function ChartsBoard() {
  const holdings = usePortfolioStore((s) => s.snapshot.holdings);
  const summary = usePortfolioSummary();
  const sector = sectorExposure(holdings);
  const gainLoss = holdings.map((h) => ({ ticker: h.ticker, gainLoss: h.gainLoss }));
  const concentration = topConcentration(holdings);
  const progressData = [
    { name: "Current", value: summary.totalPortfolioValue },
    { name: "Target", value: summary.targetValue },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <h3 className="mb-3 font-semibold">Allocation pie chart</h3>
        <div className="h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={holdings} dataKey="marketValue" nameKey="ticker" outerRadius={90}>
                {holdings.map((_, index) => (
                  <Cell key={index} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <h3 className="mb-3 font-semibold">Sector exposure bar chart</h3>
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={sector}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="sector" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <h3 className="mb-3 font-semibold">Gain/loss chart</h3>
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={gainLoss}>
              <XAxis dataKey="ticker" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" />
              <Tooltip />
              <Bar dataKey="gainLoss" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <h3 className="mb-3 font-semibold">Target progress chart</h3>
        <div className="h-64">
          <ResponsiveContainer>
            <LineChart data={progressData}>
              <CartesianGrid stroke="#27272a" />
              <XAxis dataKey="name" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="lg:col-span-2">
        <h3 className="mb-3 font-semibold">Top holdings concentration chart</h3>
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={concentration}>
              <XAxis dataKey="ticker" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" />
              <Tooltip />
              <Bar dataKey="allocation" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
