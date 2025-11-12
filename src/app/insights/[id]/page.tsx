"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BehaviorInsights from "@/components/BehaviorInsights";
import MetricsPanel from "@/components/MetricsPanel";
import { BarChart3, Eye, TrendingUp, ArrowLeft, Sparkles } from "lucide-react";
import HeatmapPanel from "@/components/HeatmapPanel";
import Link from "next/link";

export default function InsightsPage() {
  const params = useParams();
  const router = useRouter();
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<
    "metrics" | "heatmap" | "recommendations"
  >("metrics");

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await fetch(`/api/analysis/${params.id}`);

        if (!response.ok) {
          if (response.status === 404) {
            setError("Analysis not found");
          } else {
            setError("Failed to load analysis");
          }
          setLoading(false);
          return;
        }

        const result = await response.json();

        if (result.success) {
          setAnalysis(result.data);
        } else {
          setError("Failed to load analysis");
        }
      } catch (err) {
        console.error("Error fetching analysis:", err);
        setError("Failed to load analysis");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchAnalysis();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full mb-4 animate-pulse">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <p className="text-slate-600 font-medium">Loading insights...</p>
        </div>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {error || "Analysis Not Found"}
          </h2>
          <p className="text-slate-600 mb-6">
            The analysis you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium rounded-xl hover:shadow-lg transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Analyze
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    {
      id: "metrics" as const,
      label: "Performance Metrics",
      description: "Conversion rates and engagement predictions",
      icon: TrendingUp,
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      id: "heatmap" as const,
      label: "Heatmap Analysis",
      description: "Visual attention zones and interaction hotspots",
      icon: Eye,
      gradient: "from-cyan-500 to-teal-400",
    },
    {
      id: "recommendations" as const,
      label: "AI Recommendations",
      description: "AI-powered recommendations for improving your design",
      icon: BarChart3,
      gradient: "from-violet-500 to-purple-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/analyze"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Analyze</span>
        </Link>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200/50 rounded-full text-xs font-medium text-green-700 mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Analysis Complete
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Analysis Results
          </h1>
          <p className="text-slate-600">
            {analysis.fileName || "Uploaded design"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`relative group rounded-2xl p-6 text-left transition-all border ${
                  isActive
                    ? "bg-white border-slate-200 shadow-xl shadow-slate-200/50"
                    : "bg-white/60 border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-lg"
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/50 to-cyan-50/50 -z-10" />
                )}

                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${
                      tab.gradient
                    } ${
                      isActive
                        ? "shadow-lg shadow-blue-500/20 scale-110"
                        : "opacity-80 group-hover:opacity-100 group-hover:scale-105"
                    } transition-all`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {isActive && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 rounded-full">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      <span className="text-xs font-semibold text-blue-700">
                        Active
                      </span>
                    </div>
                  )}
                </div>

                <h3
                  className={`text-lg font-bold mb-2 ${
                    isActive ? "text-slate-900" : "text-slate-700"
                  }`}
                >
                  {tab.label}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    isActive ? "text-slate-600" : "text-slate-500"
                  }`}
                >
                  {tab.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="relative">
          <div className="animate-fadeIn">
            {selectedTab === "metrics" && (
              <div className="mb-12">
                <MetricsPanel
                  metrics={analysis.metrics}
                  elementBreakdown={analysis.elementBreakdown}
                  strengths={analysis.strengths}
                />
              </div>
            )}

            {selectedTab === "heatmap" && (
              <div className="mb-12">
                <HeatmapPanel
                  imageUrl={analysis.imageUrl}
                  hotspots={analysis.hotspots || []}
                  userPath={analysis.userPath}
                />
              </div>
            )}

            {selectedTab === "recommendations" && (
              <div className="mb-12">
                <BehaviorInsights insights={analysis.insights} />
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
