import React from "react";

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 sm:mb-16">
          <div className="text-purple-600 font-medium mb-4 text-sm sm:text-base">
            How It Works
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-5 leading-tight">
            How CostPilot Works
          </h2>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-500 leading-7 sm:leading-relaxed px-2">
            Get actionable AI cost insights in just a few simple steps.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative overflow-hidden rounded-[2rem] border border-gray-100 bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition duration-300">
            <span className="absolute right-4 sm:right-6 top-3 sm:top-4 text-6xl sm:text-7xl font-bold text-gray-100">
              01
            </span>

            <div className="mb-6 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 font-bold text-lg">
              +
            </div>

            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
              Add Your AI Tools
            </h3>

            <p className="text-gray-500 leading-7 text-sm sm:text-base">
              Select the AI tools your team currently uses, including plans,
              seats, and monthly spending.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-gray-100 bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition duration-300">
            <span className="absolute right-4 sm:right-6 top-3 sm:top-4 text-6xl sm:text-7xl font-bold text-gray-100">
              02
            </span>

            <div className="mb-6 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-700 font-bold text-lg">
              %
            </div>

            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
              Analyze Your Spending
            </h3>

            <p className="text-gray-500 leading-7 text-sm sm:text-base">
              CostPilot evaluates your subscriptions, detects overspending, and
              identifies optimization opportunities.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-gray-100 bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition duration-300">
            <span className="absolute right-4 sm:right-6 top-3 sm:top-4 text-6xl sm:text-7xl font-bold text-gray-100">
              03
            </span>

            <div className="mb-6 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 font-bold text-lg">
              ⚡
            </div>

            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
              Get Smart Recommendations
            </h3>

            <p className="text-gray-500 leading-7 text-sm sm:text-base">
              Receive AI-powered recommendations, cost-saving suggestions, and a
              personalized optimization report instantly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
