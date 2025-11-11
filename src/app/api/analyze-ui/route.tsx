import { NextRequest, NextResponse } from "next/server";
import { analyzeUIElements, predictUserBehavior } from "@/lib/ai-services";

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json();

    const uiElements = await analyzeUIElements(image);

    // Predict user behavior based on elements
    const behaviorPredictions = await predictUserBehavior(uiElements);

    const analysis = {
      elements: uiElements.elements || [],
      hotspots:
        behaviorPredictions.hotspots ||
        generateHotspotsFromElements(uiElements),
      metrics: behaviorPredictions.metrics,
      insights: behaviorPredictions.insights || [],
      userPath: behaviorPredictions.userPath,
    };

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json({ success: false });
  }
}

// Helper to generate hotspots from UI elements
function generateHotspotsFromElements(uiElements: any) {
  if (!uiElements.elements) return [];

  return uiElements.elements
    .filter((el: any) => el.importance >= 7)
    .map((el: any) => ({
      x: el.coordinates?.x || Math.random() * 100,
      y: el.coordinates?.y || Math.random() * 100,
      intensity: el.importance * 10,
      label: el.label || el.type,
    }));
}
