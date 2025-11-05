// app/insights/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import BehaviorInsights from "@/components/BehaviorInsights";
import MetricsPanel from "@/components/MetricsPanel";
import { ArrowRight, BarChart3, Eye, TrendingUp, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function InsightsPage() {
  const params = useParams();
  const router = useRouter();
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load analysis from localStorage (in production, fetch from API/database)
    const savedAnalysis = localStorage.getItem(`analysis-${params.id}`);
    if (savedAnalysis) {
      setAnalysis(JSON.parse(savedAnalysis));
    } else {
      // If no analysis found, redirect to analyze page
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Analysis Results
          </h1>
          <p className="text-gray-600">
            {analysis.fileName || "Uploaded design"}
          </p>
        </div>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link
            href={`/heatmap/${params.id}`}
            className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Heatmap Analysis
            </h3>
            <p className="text-sm text-gray-600">
              Visual attention zones and interaction hotspots
            </p>
          </Link>

          <Link
            href={`/metrics/${params.id}`}
            className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Performance Metrics
            </h3>
            <p className="text-sm text-gray-600">
              Conversion rates and engagement predictions
            </p>
          </Link>

          <button
            onClick={() => router.push("/analyze")}
            className="group bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all text-left"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Analyze New Design
            </h3>
            <p className="text-sm text-purple-100">
              Upload another design for comparison
            </p>
          </button>
        </div>

        {/* Metrics Overview */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Key Metrics Overview
          </h2>
          <MetricsPanel metrics={analysis.metrics} />
        </div>

        {/* Behavior Insights */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            AI-Powered Recommendations
          </h2>
          <BehaviorInsights insights={analysis.insights} />
        </div>

        {/* Design Preview */}
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Analyzed Design
          </h2>
          <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden">
            <img
              src={analysis.imageUrl}
              alt="Analyzed design"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
