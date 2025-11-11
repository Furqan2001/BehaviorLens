import Heatmap from "@/components/HeatMap";

type Props = {
  imageUrl?: string;
  hotspots?: any[];
  userPath?: string;
};

export default function HeatmapPanel({
  imageUrl,
  hotspots = [],
  userPath,
}: Props) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
      <div className="mb-6">
        {/* Ensure a string is always provided to the HeatmapViewer */}
        <Heatmap imageUrl={imageUrl ?? ""} hotspots={hotspots} />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            High Attention Zones
          </h3>
          <div className="space-y-3">
            {hotspots
              .filter((h: any) => (h.intensity ?? 0) > 70)
              .map((hotspot: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                >
                  <span className="font-medium text-gray-900">
                    {hotspot.label}
                  </span>
                  <span className="text-sm font-bold text-red-600">
                    {hotspot.intensity}% attention
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            User Eye Path
          </h3>
          <p className="text-gray-600 mb-4">
            {userPath ||
              "Users typically follow an F-pattern when scanning this design"}
          </p>
          <div className="space-y-2">
            {[
              "Primary headline",
              "Hero image",
              "Call-to-action",
              "Supporting content",
            ].map((step, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">
                    {idx + 1}
                  </span>
                </div>
                <span className="text-gray-700">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
