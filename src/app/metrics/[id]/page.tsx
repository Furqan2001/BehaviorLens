// app/metrics/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import MetricsPanel from "@/components/MetricsPanel";
import PredictionCard from "@/components/PredictionCard";
import { ArrowLeft, TrendingUp, TrendingDown, Loader2 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function MetricsPage() {
  const params = useParams();
  const router = useRouter();
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedAnalysis = localStorage.getItem(`analysis-${params.id}`);
    if (savedAnalysis) {
      setAnalysis(JSON.parse(savedAnalysis));
    } else {
      router.push("/analyze");
    }
    setLoading(false);
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!analysis) return null;

  // Mock data for conversion funnel
  const funnelData = [
    { stage: "Page View", value: 100, color: "#8b5cf6" },
    { stage: "Engagement", value: 75, color: "#6366f1" },
    { stage: "Click CTA", value: 45, color: "#3b82f6" },
    {
      stage: "Conversion",
      value: analysis.metrics?.expectedConversionRate || 3.8,
      color: "#10b981",
    },
  ];

  // Mock data for improvement timeline
  const timelineData = [
    {
      month: "Current",
      conversion: analysis.metrics?.expectedConversionRate || 3.8,
    },
    { month: "Week 1", conversion: 4.2 },
    { month: "Week 2", conversion: 4.8 },
    { month: "Week 3", conversion: 5.3 },
    { month: "Month 1", conversion: 5.8 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/insights/${params.id}`}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Insights
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">
            Performance Metrics
          </h1>
          <p className="text-gray-600 mt-2">
            Predicted performance and conversion analytics
          </p>
        </div>

        {/* Main Metrics */}
        <div className="mb-8">
          <MetricsPanel metrics={analysis.metrics} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Conversion Funnel */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Conversion Funnel
            </h3>
            <div className="space-y-4">
              {funnelData.map((stage, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-700">
                      {stage.stage}
                    </span>
                    <span className="font-bold text-gray-900">
                      {stage.value}%
                    </span>
                  </div>
                  <div className="relative h-12 bg-gray-100 rounded-lg overflow-hidden">
                    <div
                      style={{
                        width: `${stage.value}%`,
                        backgroundColor: stage.color,
                      }}
                      className="absolute inset-y-0 left-0 flex items-center justify-end pr-4 transition-all duration-1000"
                    >
                      {idx < funnelData.length - 1 && (
                        <TrendingDown className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projected Improvement */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Projected Improvement
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="conversion"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-6 flex items-center gap-2 text-green-600">
              <TrendingUp className="w-5 h-5" />
              <span className="font-bold">+52% improvement potential</span>
            </div>
          </div>
        </div>

        {/* Top Improvements */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Top Impact Improvements
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {analysis.insights
              ?.filter((i: any) => i.impact === "high")
              .map((insight: any, idx: number) => (
                <PredictionCard
                  key={idx}
                  title={insight.title}
                  description={insight.description}
                  impact={insight.impact}
                  expectedImprovement={insight.expectedImprovement}
                  confidence={insight.confidence || 85}
                  index={idx}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
