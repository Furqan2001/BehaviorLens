"use client";

import {
  Eye,
  Target,
  Layout,
  Palette,
  Smartphone,
  Sparkles,
} from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

type Props = {
  metrics?: any;
  elementBreakdown?: any;
  strengths?: string[];
};

export default function MetricsPanel({
  metrics = {},
  elementBreakdown = {},
  strengths = [],
}: Props) {
  const designScores = [
    {
      metric: "Visual Hierarchy",
      score: metrics.visualHierarchy || 0,
      icon: Eye,
      color: "#8b5cf6",
      description: "How well the design guides attention",
    },
    {
      metric: "CTA Clarity",
      score: metrics.ctaClarity || 0,
      icon: Target,
      color: "#3b82f6",
      description: "Prominence of call-to-action",
    },
    {
      metric: "Info Density",
      score: metrics.informationDensity || 0,
      icon: Layout,
      color: "#06b6d4",
      description: "Balance of content and whitespace",
    },
    {
      metric: "Color Harmony",
      score: metrics.colorHarmony || 0,
      icon: Palette,
      color: "#10b981",
      description: "Consistency and contrast",
    },
    {
      metric: "Whitespace",
      score: metrics.whitespaceUsage || 0,
      icon: Sparkles,
      color: "#f59e0b",
      description: "Spacing and breathing room",
    },
    {
      metric: "Mobile Ready",
      score: metrics.mobileReadiness || 0,
      icon: Smartphone,
      color: "#ef4444",
      description: "Mobile optimization",
    },
  ];

  const radarData = designScores.map((item) => ({
    metric: item.metric,
    score: item.score,
  }));

  const elementData = Object.entries(elementBreakdown)
    .map(([key, value]) => ({
      name: key
        .split("_")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      count: value as number,
    }))
    .filter((item) => item.count > 0);

  const overallScore = metrics.overallScore || 0;
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-blue-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return "from-green-500 to-emerald-400";
    if (score >= 60) return "from-blue-500 to-cyan-400";
    if (score >= 40) return "from-yellow-500 to-orange-400";
    return "from-red-500 to-pink-400";
  };

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Overall Design Score
            </h3>
            <div
              className={`text-6xl font-bold ${getScoreColor(overallScore)}`}
            >
              {overallScore}
              <span className="text-3xl text-gray-400">/100</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {overallScore >= 80
                ? "Excellent design quality"
                : overallScore >= 60
                ? "Good design with room for improvement"
                : overallScore >= 40
                ? "Needs significant improvements"
                : "Major design issues present"}
            </p>
          </div>
          <div
            className={`w-32 h-32 rounded-full bg-gradient-to-br ${getScoreGradient(
              overallScore
            )} flex items-center justify-center shadow-lg`}
          >
            <Sparkles className="w-16 h-16 text-white" />
          </div>
        </div>
      </div>

      {/* Design Metrics Grid */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Design Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {designScores.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: item.color }}
                  >
                    {item.score}
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  {item.metric}
                </h4>
                <p className="text-xs text-gray-500">{item.description}</p>
                <div className="mt-3 bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${item.score}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h4 className="text-lg font-bold text-gray-900 mb-4 text-center">
          Design Quality Profile
        </h4>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Element Breakdown */}
        {elementData.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h4 className="text-lg font-bold text-gray-900 mb-4">
              Element Distribution
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={elementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {elementData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        [
                          "#8b5cf6",
                          "#3b82f6",
                          "#06b6d4",
                          "#10b981",
                          "#f59e0b",
                          "#ef4444",
                        ][index % 6]
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Strengths */}
      {strengths && strengths.length > 0 && (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
          <h4 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Design Strengths
          </h4>
          <ul className="space-y-2">
            {strengths.map((strength, idx) => (
              <li key={idx} className="flex items-start gap-2 text-green-800">
                <span className="text-green-600 mt-1">✓</span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
