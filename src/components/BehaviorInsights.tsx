// components/BehaviorInsights.tsx
"use client";

interface Insight {
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  expectedImprovement: string;
}

export default function BehaviorInsights({
  insights,
}: {
  insights: Insight[];
}) {
  const impactColors = {
    high: "bg-red-100 text-red-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-green-100 text-green-800",
  };

  return (
    <div className="space-y-4">
      {insights?.map((insight, idx) => (
        <div key={idx} className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-lg">{insight.title}</h3>
            <span
              className={`text-xs px-2 py-1 rounded ${
                impactColors[insight.impact]
              }`}
            >
              {insight.impact} impact
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-2">{insight.description}</p>
          <p className="text-sm font-medium text-blue-600">
            Expected improvement: {insight.expectedImprovement}
          </p>
        </div>
      ))}
    </div>
  );
}
