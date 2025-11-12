// lib/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function analyzeUIElements(imageBase64: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

  const prompt = `You are a UX expert analyzing a UI design. Analyze this interface and identify key elements.

CRITICAL RULES:
- Return ONLY valid JSON, no explanations
- Focus on actionable UX issues, not implementation details
- Be specific about element locations

Return this exact structure:

{
  "elements": [
    {
      "type": "cta_button|navigation|form|heading|image|text_block|input_field",
      "label": "brief label",
      "position": "top-left|top-center|top-right|middle-left|middle-center|middle-right|bottom-left|bottom-center|bottom-right",
      "importance": 1-10,
      "color": "descriptive color",
      "size": "small|medium|large"
    }
  ],
  "primaryCTA": {
    "exists": true|false,
    "label": "CTA text",
    "position": "location",
    "visibility": "high|medium|low",
    "contrast": "high|medium|low"
  },
  "visualHierarchy": {
    "clear": true|false,
    "primaryFocus": "what element draws attention first",
    "issues": ["list any hierarchy problems"]
  },
  "colorScheme": {
    "dominant": "color description",
    "contrast": "high|medium|low",
    "consistent": true|false
  },
  "spacing": {
    "adequate": true|false,
    "cluttered": true|false
  },
  "overallLayout": "landing_page|dashboard|ecommerce|blog|form|saas_app|other"
}`;

  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        data: imageBase64.split(",")[1],
        mimeType: imageBase64.split(";")[0].split(":")[1] || "image/jpeg",
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

  const prompt = `You are a UX expert analyzing UI design quality. Given this UI analysis: ${JSON.stringify(
    uiElements,
    null,
    2
  )}

Provide meaningful design quality metrics and actionable recommendations.

SCORING GUIDELINES (0-100):
- Visual Hierarchy: How well the design guides user attention (clear focal points = higher)
- CTA Clarity: How obvious and compelling the call-to-action is (prominent, contrasting = higher)
- Information Density: Balance of content (too cluttered = lower, too sparse = lower, balanced = higher)
- Color Harmony: Consistency and purposeful use of color (cohesive palette = higher)
- Whitespace Usage: Proper spacing and breathing room (adequate spacing = higher)
- Mobile Readiness: How well this would work on mobile (text size, touch targets = higher)

RECOMMENDATION RULES:
1. ONLY suggest if there are ACTUAL UX problems
2. Focus on HIGH-LEVEL issues: unclear CTAs, poor hierarchy, weak value prop, confusing nav
3. Each must be actionable and explain business impact
4. Maximum 4 recommendations
5. If design is good, return empty insights array []

Return ONLY valid JSON:

{
  "metrics": {
    "visualHierarchy": 0-100,
    "ctaClarity": 0-100,
    "informationDensity": 0-100,
    "colorHarmony": 0-100,
    "whitespaceUsage": 0-100,
    "mobileReadiness": 0-100,
    "overallScore": 0-100
  },
  "elementBreakdown": {
    "cta_buttons": number,
    "navigation": number,
    "forms": number,
    "headings": number,
    "images": number,
    "text_blocks": number
  },
  "strengths": [
    "Specific strength 1",
    "Specific strength 2"
  ],
  "hotspots": [
    {
      "x": 10-90,
      "y": 10-90,
      "intensity": 50-100,
      "label": "area name (e.g., 'Primary CTA', 'Hero Section')"
    }
  ],
  "insights": [
    {
      "title": "High-level UX issue (e.g., 'Weak Visual Hierarchy')",
      "description": "Specific problem and why it matters",
      "impact": "high|medium|low",
      "category": "hierarchy|cta|content|navigation|trust|mobile",
      "recommendation": "Specific action to take",
      "expectedImprovement": "Expected outcome (e.g., 'Increase focus by 40%')"
    }
  ],
  "userPath": "Brief description of natural eye-tracking flow"
}

Be honest in scoring - most designs have room for improvement. Scores of 60-80 are typical for good designs.`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const jsonMatch =
    text.match(/```json\n?([\s\S]*?)\n?```/) || text.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    console.error("Invalid response:", text);
    throw new Error("AI returned invalid format");
  }

  const data = JSON.parse(jsonMatch[1] || jsonMatch[0]);

  // Calculate overall score if not provided
  if (!data.metrics.overallScore) {
    const scores = [
      data.metrics.visualHierarchy,
      data.metrics.ctaClarity,
      data.metrics.informationDensity,
      data.metrics.colorHarmony,
      data.metrics.whitespaceUsage,
      data.metrics.mobileReadiness,
    ].filter((s) => typeof s === "number");

    data.metrics.overallScore = Math.round(
      scores.reduce((a, b) => a + b, 0) / scores.length
    );
  }

  return data;
}
