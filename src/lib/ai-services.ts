// lib/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function analyzeUIElements(imageBase64: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

  const prompt = `You are a UX expert analyzing a UI design. Analyze this interface and identify key elements.

CRITICAL RULES:
- Return ONLY valid JSON, no explanations
- Focus on actionable UX issues, not implementation details
- Be specific about element locations (top, middle, bottom, left, right)

Return this exact structure:

{
  "elements": [
    {
      "type": "cta_button|navigation|form|heading|image|text_block",
      "label": "brief label",
      "position": "top-left|top-center|top-right|middle-left|middle-center|middle-right|bottom-left|bottom-center|bottom-right",
      "importance": 1-10
    }
  ],
  "primaryCTA": {
    "exists": true|false,
    "label": "CTA text",
    "position": "location",
    "visibility": "high|medium|low"
  },
  "visualHierarchy": {
    "clear": true|false,
    "primaryFocus": "what element draws attention first",
    "issues": ["list any hierarchy problems"]
  },
  "overallLayout": "landing_page|dashboard|ecommerce|blog|form|other"
}`;

  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        data: imageBase64.split(",")[1],
        mimeType: "image/jpeg",
      },
    },
  ]);

  const text = result.response.text();
  const jsonMatch =
    text.match(/```json\n?([\s\S]*?)\n?```/) || text.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    console.error("Invalid response:", text);
    throw new Error("AI returned invalid format");
  }

  return JSON.parse(jsonMatch[1] || jsonMatch[0]);
}

export async function predictUserBehavior(uiElements: any) {
  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

  const prompt = `You are a UX expert predicting user behavior. Given this UI analysis: ${JSON.stringify(
    uiElements,
    null,
    2
  )}

CRITICAL RULES FOR METRICS (MUST BE LOGICALLY CONSISTENT):
1. Conversion funnel MUST decrease monotonically: PageView (100%) > Engagement > Click > Conversion
2. Engagement must be 40-85% of page views
3. Click rate must be 30-70% of engagement
4. Conversion must be 3-25% of clicks
5. Bounce rate is inverse of engagement (if engagement is 60%, bounce is ~40%)

CRITICAL RULES FOR RECOMMENDATIONS:
1. ONLY suggest recommendations if there are ACTUAL UX problems
2. Focus on HIGH-LEVEL UX issues: unclear CTAs, poor visual hierarchy, weak value proposition, confusing navigation
3. DO NOT analyze specific UI components unless they have critical UX flaws
4. Each recommendation must be actionable and explain the business impact
5. If the design is good, return an empty insights array []

Return ONLY valid JSON:

{
  "hotspots": [
    {
      "x": 10-90,
      "y": 10-90,
      "intensity": 50-100,
      "label": "area name"
    }
  ],
  "metrics": {
    "expectedConversionRate": 3-25,
    "engagementScore": 40-85,
    "clickThroughRate": 25-60,
    "bounceRate": 15-60
  },
  "insights": [
    {
      "title": "High-level UX issue (e.g., 'Weak Call-to-Action')",
      "description": "Explain the problem and why it matters for users",
      "impact": "high|medium|low",
      "expectedImprovement": "+X% [specific metric like 'conversion rate' or 'engagement']",
      "confidence": 75-95
    }
  ],
  "userPath": "Brief description of natural eye-tracking flow (F-pattern, Z-pattern, etc.)"
}

IMPORTANT: 
- If engagement is 60%, make clickThroughRate around 35-45% and conversion around 8-15%
- Improvement should be realistic: +5-25% for high impact, +3-10% for medium, +1-5% for low
- Only include 2-4 insights maximum, focusing on the BIGGEST issues`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const jsonMatch =
    text.match(/```json\n?([\s\S]*?)\n?```/) || text.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    console.error("Invalid response:", text);
    throw new Error("AI returned invalid format");
  }

  const data = JSON.parse(jsonMatch[1] || jsonMatch[0]);

  // Validate and fix metrics if AI still messed up
  return validateAndFixMetrics(data);
}

function validateAndFixMetrics(data: any) {
  const metrics = data.metrics;

  if (metrics.engagementScore > 85) metrics.engagementScore = 75;
  if (metrics.engagementScore < 40) metrics.engagementScore = 50;

  if (metrics.clickThroughRate >= metrics.engagementScore) {
    metrics.clickThroughRate = Math.floor(metrics.engagementScore * 0.6);
  }

  if (metrics.expectedConversionRate >= metrics.clickThroughRate) {
    metrics.expectedConversionRate = Math.floor(metrics.clickThroughRate * 0.3);
  }

  metrics.bounceRate = Math.min(
    85,
    Math.max(15, 100 - metrics.engagementScore)
  );

  return data;
}
