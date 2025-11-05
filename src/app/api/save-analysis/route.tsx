// app/api/save-analysis/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Generate unique ID
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2);

    // In production, save to database
    // For demo, return ID and let client save to localStorage

    return NextResponse.json({ id, ...body });
  } catch (error) {
    console.error("Save error:", error);
    return NextResponse.json(
      { error: "Failed to save analysis" },
      { status: 500 }
    );
  }
}
