"use client";

import { motion } from "framer-motion";
import { TrendingUp, AlertCircle, CheckCircle, ArrowRight } from "lucide-react";

const impactConfig = {
  high: {
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-800",
    badgeColor: "bg-red-100",
    icon: AlertCircle,
    iconColor: "text-red-600",
  },
  medium: {
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    textColor: "text-yellow-800",
    badgeColor: "bg-yellow-100",
    icon: TrendingUp,
    iconColor: "text-yellow-600",
  },
  low: {
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-800",
    badgeColor: "bg-green-100",
    icon: CheckCircle,
    iconColor: "text-green-600",
  },
};

interface PredictionCardProps {
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  expectedImprovement: string;
  confidence?: number;
  index?: number;
}

export default function PredictionCard({
  title,
  description,
  impact,
  expectedImprovement,
  confidence = 85,
  index = 0,
}: PredictionCardProps) {
  const config = impactConfig[impact];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className={`${config.bgColor} ${config.borderColor} border-2 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1">
          <div className={`p-2 rounded-lg ${config.badgeColor}`}>
            <Icon className={`w-5 h-5 ${config.iconColor}`} />
          </div>
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-gray-700 transition-colors">
            {title}
          </h3>
        </div>

        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${config.badgeColor} ${config.textColor} uppercase tracking-wide`}
        >
          {impact} impact
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-sm leading-relaxed mb-4">
        {description}
      </p>

      {/* Expected Improvement */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <ArrowRight className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-semibold text-blue-600">
            {expectedImprovement}
          </span>
        </div>

        {/* Confidence Score */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Confidence:</span>
          <div className="flex items-center gap-1">
            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${confidence}%` }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                className={`h-full ${
                  confidence >= 80
                    ? "bg-green-500"
                    : confidence >= 60
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              />
            </div>
            <span className="text-xs font-medium text-gray-700">
              {confidence}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
