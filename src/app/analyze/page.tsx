// app/analyze/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/ImageUploader";
import { Loader2 } from "lucide-react";

export default function AnalyzePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // app/analyze/page.tsx (updated handleImageUpload)
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

      // Generate ID and save to localStorage
      const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
      localStorage.setItem(
        `analysis-${id}`,
        JSON.stringify({
          ...data,
          imageUrl: base64,
          fileName: file.name,
        })
      );

      // Redirect to insights
      router.push(`/insights/${id}`);
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Analysis failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Analyze Your Design
          </h1>
          <p className="text-xl text-gray-600">
            Upload your UI design and get instant AI-powered insights
          </p>
        </div>

        {/* Upload Component */}
        <ImageUploader onUpload={handleImageUpload} loading={loading} />

        {/* Info Cards */}
        {!loading && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Heatmap Analysis",
                description: "See where users will focus their attention",
              },
              {
                title: "Behavior Predictions",
                description: "Get conversion rate and engagement predictions",
              },
              {
                title: "UX Recommendations",
                description:
                  "Receive actionable improvements with impact scores",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
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
