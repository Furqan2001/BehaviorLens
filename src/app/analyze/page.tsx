"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/ImageUploader";
import { Eye, TrendingUp, Lightbulb, Sparkles } from "lucide-react";

export default function AnalyzePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (file: File) => {
    setLoading(true);

    try {
      const base64 = await fileToBase64(file);

      const response = await fetch("/api/analyze-ui", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: base64,
          fileName: file.name,
        }),
      });

      if (!response.ok) throw new Error("Analysis failed");

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Analysis failed");
      }

      // Redirect directly to insights with the ID from the response
      router.push(`/insights/${data.id}`);
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Analysis failed. Please try again.");
      setLoading(false);
    }
  };

  const features = [
    {
      icon: Eye,
      title: "Heatmap Analysis",
      description: "See where users will focus their attention",
      color: "from-blue-500 to-cyan-400",
    },
    {
      icon: TrendingUp,
      title: "Behavior Predictions",
      description: "Get conversion rate and engagement predictions",
      color: "from-cyan-500 to-teal-400",
    },
    {
      icon: Lightbulb,
      title: "UX Recommendations",
      description: "Receive actionable improvements with impact scores",
      color: "from-violet-500 to-purple-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30">
      <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200/50 rounded-full text-sm font-medium text-blue-700 mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered Analysis
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Analyze Your Design
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Upload your UI design and get instant AI-powered insights about user
            behavior and conversions
          </p>
        </div>

        <div className="mb-12">
          <ImageUploader onUpload={handleImageUpload} loading={loading} />
        </div>

        {loading && (
          <div className="bg-white rounded-2xl p-12 shadow-lg border border-slate-100 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full mb-4 animate-pulse">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Analyzing Your Design
            </h3>
            <p className="text-slate-600 mb-6">
              Our AI is processing your design and generating insights...
            </p>
            <div className="max-w-md mx-auto">
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-pulse"
                  style={{ width: "60%" }}
                />
              </div>
            </div>
          </div>
        )}

        {!loading && (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              What You'll Get
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((item, idx) => (
                <div
                  key={idx}
                  className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-200 transition-all"
                >
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${item.color} mb-4 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform`}
                  >
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">
                    Fast & Accurate Analysis
                  </h3>
                  <p className="text-sm text-slate-600">
                    Our AI analyzes visual hierarchy, color psychology, layout
                    patterns, and UX best practices to give you actionable
                    insights in seconds — no waiting for A/B test results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {!loading && (
          <div className="mt-12 text-center">
            <p className="text-sm text-slate-500 mb-2">
              Supported formats: PNG, JPG, WEBP • Max file size: 10MB
            </p>
            <p className="text-xs text-slate-400">
              Works best with landing pages, product pages, and web app
              interfaces
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
}
