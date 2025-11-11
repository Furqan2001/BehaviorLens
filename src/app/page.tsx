import Link from "next/link";
import { ArrowRight, Eye, Zap, TrendingUp, BarChart3 } from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: Eye,
      title: "Visual Analysis",
      description:
        "AI-powered heatmaps show exactly where users will look and click",
      color: "from-blue-500 to-cyan-400",
    },
    {
      icon: TrendingUp,
      title: "Behavior Prediction",
      description:
        "Predict conversion rates and user actions before going live",
      color: "from-cyan-500 to-teal-400",
    },
    {
      icon: BarChart3,
      title: "Actionable Metrics",
      description:
        "Get concrete recommendations with expected impact percentages",
      color: "from-violet-500 to-purple-400",
    },
    {
      icon: Zap,
      title: "Instant Insights",
      description:
        "No more waiting weeks for A/B test results - get insights in seconds",
      color: "from-indigo-500 to-blue-400",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Upload Your Design",
      description: "Drop in a screenshot, mockup, or Figma export of your UI",
    },
    {
      step: "02",
      title: "AI Analysis",
      description: "Our AI analyzes visual hierarchy, layout, and UX patterns",
    },
    {
      step: "03",
      title: "Get Insights",
      description:
        "Receive predictions, heatmaps, and actionable recommendations",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30">
      <section className="px-4 pt-20 pb-24 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200/50 rounded-full text-sm font-medium text-blue-700 mb-8">
            <Zap className="w-4 h-4" />
            AI-Powered Design Intelligence
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Predict User Behavior
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
              Before You Launch
            </span>
          </h1>

          <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Upload your designs and get AI-powered predictions about user
            behavior, conversion rates, and UX improvements — instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/analyze"
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-cyan-500/20 hover:scale-105 transition-all flex items-center gap-2"
            >
              Start Analyzing
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#how-it-works"
              className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:border-slate-300 hover:shadow-lg transition-all"
            >
              See How It Works
            </Link>
          </div>

          {/* <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { label: "Accuracy Rate", value: "94%" },
              { label: "Avg. Time Saved", value: "12hrs" },
              { label: "Designs Analyzed", value: "10K+" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div> */}
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Why BehaviorLens?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Leverage cutting-edge AI to understand and optimize user behavior
              before your design goes live
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group bg-slate-50 rounded-2xl p-6 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all border border-slate-100 hover:border-slate-200"
              >
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600">
              Get actionable insights in three simple steps
            </p>
          </div>

          <div className="space-y-6">
            {steps.map((item, idx) => (
              <div
                key={idx}
                className="relative flex items-start gap-6 bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-lg hover:border-slate-200 transition-all"
              >
                {idx < steps.length - 1 && (
                  <div className="absolute left-12 top-24 w-0.5 h-12 bg-gradient-to-b from-cyan-400 to-transparent" />
                )}

                <div className="relative flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  <span className="text-2xl font-bold text-white">
                    {item.step}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Optimize Your Design?
          </h2>
          <p className="text-xl text-slate-300 mb-10 leading-relaxed">
            Join companies using AI to predict user behavior and boost
            conversions before launching
          </p>
          <Link
            href="/analyze"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-cyan-500/30 hover:scale-105 transition-all"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <p className="mt-6 text-sm text-slate-400">
            No credit card required • Instant results • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
}
