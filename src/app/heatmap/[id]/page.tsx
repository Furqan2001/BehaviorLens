"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import HeatmapViewer from "@/components/HeatMap";

export default function HeatmapPage() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href={`/insights/${params.id}`}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Insights
            </Link>
            <h1 className="text-4xl font-bold text-gray-900">
              Interaction Heatmap
            </h1>
            <p className="text-gray-600 mt-2">
              Predicted user attention and interaction zones
            </p>
          </div>

          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all">
            <Download className="w-4 h-4" />
            Export Heatmap
          </button>
        </div>

        {/* Heatmap Viewer */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <HeatmapViewer
            imageUrl={analysis.imageUrl}
            hotspots={analysis.hotspots || []}
          />
        </div>

        {/* Hotspot Details */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              High Attention Zones
            </h3>
            <div className="space-y-3">
              {analysis.hotspots
                ?.filter((h: any) => h.intensity > 70)
                .map((hotspot: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                  >
                    <span className="font-medium text-gray-900">
                      {hotspot.label}
                    </span>
                    <span className="text-sm font-bold text-red-600">
                      {hotspot.intensity}% attention
                    </span>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              User Eye Path
            </h3>
            <p className="text-gray-600 mb-4">
              {analysis.userPath ||
                "Users typically follow an F-pattern when scanning this design"}
            </p>
            <div className="space-y-2">
              {[
                "Primary headline",
                "Hero image",
                "Call-to-action",
                "Supporting content",
              ].map((step, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">
                      {idx + 1}
                    </span>
                  </div>
                  <span className="text-gray-700">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
