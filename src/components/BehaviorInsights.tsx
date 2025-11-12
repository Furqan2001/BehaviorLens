"use client";

import {
  AlertCircle,
  CheckCircle2,
  Info,
  TrendingUp,
  Sparkles,
} from "lucide-react";

interface Insight {
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  expectedImprovement: string;
  confidence?: number;
}

export default function BehaviorInsights({
  insights,
}: {
  insights: Insight[];
}) {
  const impactConfig = {
    high: {
      badge: "bg-red-50 text-red-700 border-red-200",
      icon: AlertCircle,
      iconBg: "from-red-500 to-orange-500",
      label: "High Impact",
      accentColor: "border-l-red-500",
    },
    medium: {
      badge: "bg-amber-50 text-amber-700 border-amber-200",
      icon: Info,
      iconBg: "from-amber-500 to-yellow-500",
      label: "Medium Impact",
      accentColor: "border-l-amber-500",
    },
    low: {
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icon: CheckCircle2,
      iconBg: "from-emerald-500 to-teal-500",
      label: "Low Impact",
      accentColor: "border-l-emerald-500",
    },
  };

  if (!insights || insights.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 shadow-sm border border-slate-100 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full mb-4">
          <Sparkles className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          No Recommendations Yet
        </h3>
        <p className="text-slate-600">
          Upload a design to receive AI-powered insights and recommendations.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-900 mb-1">
          AI Recommendations
        </h3>
        <p className="text-sm text-slate-500">
          Actionable insights to improve your design performance
        </p>
      </div>

      {insights.map((insight, idx) => {
        const config = impactConfig[insight.impact];
        const Icon = config.icon;

        return (
          <div
            key={idx}
            className={`group bg-white rounded-2xl p-6 shadow-sm border-l-4 ${config.accentColor} border-y border-r border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`flex-shrink-0 p-3 rounded-xl bg-gradient-to-br ${config.iconBg} shadow-lg group-hover:scale-110 transition-transform`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h4 className="font-bold text-slate-900 text-lg leading-tight">
                    {insight.title}
                  </h4>
                  <span
                    className={`flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border ${config.badge}`}
                  >
                    {config.label}
                  </span>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {insight.description}
                </p>

                <div className="flex items-center justify-between gap-4 pt-3 border-t border-slate-100">
                  {insight.expectedImprovement && (
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-semibold text-slate-900">
                        Expected improvement:
                      </span>
                      <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        {insight.expectedImprovement}
                      </span>
                    </div>
                  )}

                  {insight.confidence && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">
                        Confidence:
                      </span>
                      <div className="flex items-center gap-1">
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                            style={{ width: `${insight.confidence}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-slate-700">
                          {insight.confidence}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
