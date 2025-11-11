"use client";

import PredictionCard from "@/components/PredictionCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  metrics?: any;
  insights?: any[];
  largeView?: boolean;
};

export default function MetricsPanel(props: Props) {
  const { metrics = {}, insights = [], largeView = false } = props;

  // Build funnel data based on provided metrics
  const funnelData = [
    { stage: "Page View", value: 100, color: "#8b5cf6" },
    {
      stage: "Engagement",
      value: metrics.engagementScore ?? 75,
      color: "#6366f1",
    },
    {
      stage: "Click CTA",
      value: metrics.clickThroughRate ?? 45,
      color: "#3b82f6",
    },
    {
      stage: "Conversion",
      value: metrics.expectedConversionRate ?? 3.8,
      color: "#10b981",
    },
  ];

  const currentConversion = metrics.expectedConversionRate ?? 6.8;

  const timelineData = [
    { month: "Current", conversion: currentConversion },
    { month: "Week 1", conversion: currentConversion * 1.05 }, // +5%
    { month: "Week 2", conversion: currentConversion * 1.12 }, // +12%
    { month: "Week 3", conversion: currentConversion * 1.18 }, // +18%
    { month: "Month 1", conversion: currentConversion * 1.25 }, // +25%
  ];

  return (
    <div
      className={`${
        largeView ? "p-8" : "p-6"
      } bg-white rounded-2xl shadow-sm border border-gray-200`}
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900">Key Metrics</h3>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Expected Conversion</div>
            <div className="text-2xl font-bold text-gray-900">
              {metrics.expectedConversionRate ?? "--"}%
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Engagement</div>
            <div className="text-2xl font-bold text-gray-900">
              {metrics.engagementScore ?? "--"}%
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Bounce Rate</div>
            <div className="text-2xl font-bold text-gray-900">
              {metrics.bounceRate ?? "--"}%
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Conversion Funnel */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h4 className="text-lg font-bold text-gray-900 mb-4">
            Conversion Funnel
          </h4>
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
                <div className="relative h-10 bg-gray-100 rounded-lg overflow-hidden">
                  <div
                    style={{
                      width: `${stage.value}%`,
                      backgroundColor: stage.color,
                    }}
                    className="absolute inset-y-0 left-0 flex items-center justify-end pr-4 transition-all duration-1000"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projected Improvement */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h4 className="text-lg font-bold text-gray-900 mb-4">
            Projected Improvement
          </h4>
          <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer width="100%" height={220}>
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
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Estimated improvement trajectory based on suggested optimizations.
          </div>
        </div>
      </div>

      {/* Top Improvements */}
      {insights && insights.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-bold text-gray-900 mb-4">
            Top Impact Improvements
          </h4>
          <div className="grid grid-cols-1 gap-4">
            {insights
              .filter((i: any) => i.impact === "high")
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
      )}
    </div>
  );
}
