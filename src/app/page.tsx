// app/page.tsx
import Link from "next/link";
import { ArrowRight, Eye, Zap, TrendingUp, BarChart3 } from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: Eye,
      title: "Visual Analysis",
      description:
        "AI-powered heatmaps show exactly where users will look and click",
      color: "from-purple-500 to-blue-600",
    },
    {
      icon: TrendingUp,
      title: "Behavior Prediction",
      description:
        "Predict conversion rates and user actions before going live",
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: BarChart3,
      title: "Actionable Metrics",
      description:
        "Get concrete recommendations with expected impact percentages",
      color: "from-cyan-500 to-teal-600",
    },
    {
      icon: Zap,
      title: "Instant Insights",
      description:
        "No more waiting weeks for A/B test results - get insights in seconds",
      color: "from-teal-500 to-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Hero Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-100 rounded-full">
            <span className="text-sm font-semibold text-blue-600">
              Inspired by Rehearsals AI
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Predict User Behavior
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Before You Launch
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Upload your designs and get AI-powered predictions about user
            behavior, conversion rates, and UX improvements - instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/analyze"
              className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              Start Analyzing
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold border-2 border-gray-200 hover:border-gray-300 hover:shadow-md transition-all">
              View Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why BehaviorLens?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100"
              >
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>

          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Upload Your Design",
                description:
                  "Drop in a screenshot, mockup, or Figma export of your UI",
              },
              {
                step: "02",
                title: "AI Analysis",
                description:
                  "Our AI analyzes visual hierarchy, layout, and UX patterns",
              },
              {
                step: "03",
                title: "Get Insights",
                description:
                  "Receive predictions, heatmaps, and actionable recommendations",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-6 bg-white rounded-2xl p-8 shadow-sm"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {item.step}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Optimize Your Design?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join companies using AI to predict user behavior and boost
            conversions
          </p>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
