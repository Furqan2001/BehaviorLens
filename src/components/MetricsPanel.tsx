"use client";

import { motion } from "framer-motion";

interface Metrics {
  expectedConversionRate: number;
  clickThroughRate: number;
  bounceRate: number;
  engagementScore: number;
}

export default function MetricsPanel({ metrics }: { metrics: Metrics }) {
  const items = [
    {
      label: "Expected Conversion",
      value: `${metrics.expectedConversionRate}%`,
      color: "green",
    },
    {
      label: "CTR Prediction",
      value: `${metrics.clickThroughRate}%`,
      color: "blue",
    },
    {
      label: "Predicted Bounce Rate",
      value: `${metrics.bounceRate}%`,
      color: "red",
    },
    {
      label: "Engagement Score",
      value: `${metrics.engagementScore}/10`,
      color: "purple",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {items.map((item, idx) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-white p-4 rounded-lg shadow"
        >
          <p className="text-sm text-gray-600">{item.label}</p>
          <p className={`text-2xl font-bold text-${item.color}-600 mt-1`}>
            {item.value}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
