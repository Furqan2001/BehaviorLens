import mongoose from "mongoose";

const AnalysisSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    metrics: {
      visualHierarchy: Number,
      ctaClarity: Number,
      informationDensity: Number,
      colorHarmony: Number,
      whitespaceUsage: Number,
      mobileReadiness: Number,
      overallScore: Number,
    },
    elementBreakdown: {
      cta_buttons: Number,
      navigation: Number,
      forms: Number,
      headings: Number,
      images: Number,
      text_blocks: Number,
    },
    strengths: [String],
    hotspots: [
      {
        x: Number,
        y: Number,
        intensity: Number,
        label: String,
      },
    ],
    userPath: {
      type: String,
      default: null,
    },
    insights: [
      {
        title: String,
        description: String,
        impact: String,
        category: String,
        recommendation: String,
        expectedImprovement: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Analysis ||
  mongoose.model("Analysis", AnalysisSchema);
