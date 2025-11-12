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

export default function Heatmap({ imageUrl, hotspots }: HeatmapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Load and draw original image
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      // Set canvas size to image size and account for devicePixelRatio for crisp rendering
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(img.width * dpr);
      canvas.height = Math.round(img.height * dpr);
      canvas.style.width = "100%";
      canvas.style.height = "auto";
      canvas.style.aspectRatio = `${img.width} / ${img.height}`;

      // Draw the image scaled for DPR
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, img.width, img.height);
      ctx.drawImage(img, 0, 0, img.width, img.height);

      // Draw heatmap overlay
      hotspots.forEach((spot) => {
        // Accept coordinates as percentage (0-100) or fraction (0-1) or pixels.
        let x = spot.x;
        let y = spot.y;

        // If coordinates look like percentages (0-100), convert to pixels
        if (x > 1 && x <= 100) x = (x / 100) * img.width;
        if (y > 1 && y <= 100) y = (y / 100) * img.height;

        // If coordinates are given as fractions (0-1), convert to pixels
        if (x > 0 && x <= 1) x = x * img.width;
        if (y > 0 && y <= 1) y = y * img.height;

        // Fallbacks
        const intensity =
          typeof spot.intensity === "number" ? spot.intensity : 50;

        // Radius scales with image size and intensity
        const baseRadius = Math.max(img.width, img.height) * 0.08; // 8% of larger dimension
        const radius = baseRadius * (intensity / 100);

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);

        const opacity = Math.max(0, Math.min(1, intensity / 100));
        gradient.addColorStop(0, `rgba(255, 0, 0, ${opacity * 0.6})`);
        gradient.addColorStop(0.5, `rgba(255, 165, 0, ${opacity * 0.3})`);
        gradient.addColorStop(1, "rgba(255, 255, 0, 0)");

        ctx.fillStyle = gradient;

        // Draw a rectangle covering the gradient area (in canvas pixels space)
        ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
      });
    };
  }, [imageUrl, hotspots]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="max-w-full h-auto rounded-lg shadow-lg"
      />
      <div className="absolute top-4 text-black right-4 bg-white/90 backdrop-blur p-3 rounded-lg">
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
