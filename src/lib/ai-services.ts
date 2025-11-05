// lib/ai-services.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function analyzeUIElements(imageBase64: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

  const prompt = `Analyze this UI/UX design and identify all elements. Return ONLY valid JSON:

{
  "elements": [
    {
      "type": "button|link|input|navigation|heading|image",
      "label": "element text or description",
      "position": "top-left|top-center|top-right|center|bottom-left|etc",
      "importance": 1-10,
      "coordinates": {"x": 0-100, "y": 0-100}
    }
  ],
  "visualHierarchy": {
    "primary": ["element labels"],
    "secondary": ["element labels"],
    "tertiary": ["element labels"]
  },
  "frictionPoints": ["description of issues"]
}

Focus on:
1. All clickable elements (buttons, links, CTAs)
2. Form fields and inputs
3. Navigation elements
4. Visual hierarchy
5. Potential UX friction points`;

  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        data: imageBase64.split(",")[1],
        mimeType: "image/jpeg",
      },
    },
  ]);

  const response = await result.response;
  const text = response.text();

  // Extract JSON from markdown code blocks if present
  const jsonMatch =
    text.match(/```json\n?([\s\S]*?)\n?```/) || text.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    console.error("No JSON found in response:", text);
    throw new Error("Invalid response format");
  }

  const jsonText = jsonMatch[1] || jsonMatch[0];
  return JSON.parse(jsonText);
}

export async function predictUserBehavior(uiElements: any) {
  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

  const prompt = `Given these UI elements: ${JSON.stringify(uiElements)}

Predict user behavior and return ONLY valid JSON:

{
  "hotspots": [
    {
      "x": 0-100,
      "y": 0-100,
      "intensity": 0-100,
      "label": "description"
    }
  ],
  "metrics": {
    "expectedConversionRate": number,
    "clickThroughRate": number,
    "bounceRate": number,
    "engagementScore": 1-10
  },
  "insights": [
    {
      "title": "short title",
      "description": "detailed description",
      "impact": "high|medium|low",
      "expectedImprovement": "+X% metric",
      "confidence": 0-100
    }
  ],
  "userPath": "description of eye-tracking pattern",
  "dropOffPoints": ["list of potential drop-off areas"]
}

Base on UX principles: Fitts's Law, F-pattern, Z-pattern, visual hierarchy, cognitive load.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  const jsonMatch =
    text.match(/```json\n?([\s\S]*?)\n?```/) || text.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    console.error("No JSON found in response:", text);
    throw new Error("Invalid response format");
  }

  const jsonText = jsonMatch[1] || jsonMatch[0];
  return JSON.parse(jsonText);
}
