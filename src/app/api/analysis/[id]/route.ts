import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Analysis from "@/models/Analysis";
import mongoose from "mongoose";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid analysis ID" },
        { status: 400 }
      );
    }

    const analysis = await Analysis.findById(id);

    if (!analysis) {
      return NextResponse.json(
        { success: false, error: "Analysis not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        _id: analysis._id.toString(),
        fileName: analysis.fileName,
        imageUrl: analysis.imageUrl,
        metrics: analysis.metrics,
        hotspots: analysis.hotspots,
        userPath: analysis.userPath,
        insights: analysis.insights,
        createdAt: analysis.createdAt,
        updatedAt: analysis.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error fetching analysis:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch analysis" },
      { status: 500 }
    );
  }
}
