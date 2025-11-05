"use client";

import { useEffect, useRef } from "react";

interface HeatmapProps {
  imageUrl: string;
  hotspots: Array<{
    x: number;
    y: number;
    intensity: number;
    label: string;
  }>;
}

export default function HeatmapViewer({ imageUrl, hotspots }: HeatmapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  console.log(hotspots);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Load and draw original image
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Draw heatmap overlay
      hotspots.forEach((spot) => {
        const gradient = ctx.createRadialGradient(
          spot.x,
          spot.y,
          0,
          spot.x,
          spot.y,
          80
        );

        const opacity = spot.intensity / 100;
        gradient.addColorStop(0, `rgba(255, 0, 0, ${opacity * 0.6})`);
        gradient.addColorStop(0.5, `rgba(255, 165, 0, ${opacity * 0.3})`);
        gradient.addColorStop(1, "rgba(255, 255, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(spot.x - 80, spot.y - 80, 160, 160);
      });
    };
  }, [imageUrl, hotspots]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="max-w-full h-auto rounded-lg shadow-lg"
      />
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-3 rounded-lg">
        <h3 className="font-bold text-sm mb-2">Interaction Zones</h3>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span>High attention</span>
        </div>
        <div className="flex items-center gap-2 text-xs mt-1">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span>Medium attention</span>
        </div>
      </div>
    </div>
  );
}
