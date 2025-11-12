import { NextRequest, NextResponse } from "next/server";
import { analyzeUIElements, predictUserBehavior } from "@/lib/ai-services";
import connectDB from "@/lib/mongodb";
import Analysis from "@/models/Analysis";

export async function POST(request: NextRequest) {
  try {
    const { image, fileName } = await request.json();

    // Perform AI analysis
    const uiElements = await analyzeUIElements(image);
    const behaviorPredictions = await predictUserBehavior(uiElements);

    const analysisData = {
      metrics: behaviorPredictions.metrics,
      elementBreakdown: behaviorPredictions.elementBreakdown || {},
      strengths: behaviorPredictions.strengths || [],
      hotspots: behaviorPredictions.hotspots || [],
      insights: behaviorPredictions.insights || [],
      userPath: behaviorPredictions.userPath,
    };

    // Save to MongoDB
    await connectDB();
    const savedAnalysis = await Analysis.create({
      fileName: fileName || "untitled",
      imageUrl: image,
      ...analysisData,
    });

    return NextResponse.json({
      success: true,
      id: savedAnalysis._id.toString(),
      ...analysisData,
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Analysis failed",
      },
      { status: 500 }
    );
  }
}
