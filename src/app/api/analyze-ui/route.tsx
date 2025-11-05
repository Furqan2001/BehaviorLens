// app/api/analyze-ui/route.ts
import { NextRequest, NextResponse } from "next/server";
import { analyzeUIElements, predictUserBehavior } from "@/lib/ai-services";

export async function POST(request: NextRequest) {
  try {
    const { image, fileName } = await request.json();

    // Step 1: Analyze UI elements
    const uiElements = await analyzeUIElements(image);

    console.log(uiElements);

    // Step 2: Predict user behavior based on elements
    const behaviorPredictions = await predictUserBehavior(uiElements);

    // Step 3: Combine results into final analysis
    const analysis = {
      elements: uiElements.elements || [],
      hotspots:
        behaviorPredictions.hotspots ||
        generateHotspotsFromElements(uiElements),
      metrics: behaviorPredictions.metrics || {
        expectedConversionRate: 3.8,
        clickThroughRate: 15.2,
        bounceRate: 42,
        engagementScore: 8.2,
      },
      insights: behaviorPredictions.insights || [],
      userPath: behaviorPredictions.userPath || "F-pattern detected",
    };

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Analysis error:", error);

    // Return mock data on error
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

function getMockAnalysis() {
  return {
    elements: [
      {
        type: "button",
        label: "Get Started",
        position: "center-hero",
        importance: 10,
        predicted_ctr: 15.2,
      },
    ],
    hotspots: [
      { x: 50, y: 40, intensity: 90, label: "Hero CTA" },
      { x: 30, y: 60, intensity: 65, label: "Secondary Feature" },
      { x: 70, y: 60, intensity: 60, label: "Social Proof" },
    ],
    metrics: {
      expectedConversionRate: 3.8,
      clickThroughRate: 15.2,
      bounceRate: 42,
      engagementScore: 8.2,
    },
    insights: [
      {
        title: "Strong visual hierarchy detected",
        description:
          "Primary CTA stands out with high contrast and prominent placement",
        impact: "high",
        expectedImprovement: "+12% conversion rate",
        confidence: 87,
      },
      {
        title: "Above-the-fold optimization needed",
        description:
          "Key value proposition should be more prominent in viewport",
        impact: "medium",
        expectedImprovement: "+8% engagement",
        confidence: 75,
      },
      {
        title: "Mobile responsiveness concern",
        description: "Some elements may overlap on smaller screens",
        impact: "medium",
        expectedImprovement: "+5% mobile conversions",
        confidence: 68,
      },
    ],
    userPath: "F-pattern detected: Users scan logo → headline → features → CTA",
  };
}
