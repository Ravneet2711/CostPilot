import React from "react";

const Features = () => {
  return (
    <section
      id="features"
      className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32"
    >
      <div className="text-center mb-14 sm:mb-16">
        <p className="text-purple-600 font-medium mb-4 text-sm sm:text-base">
          Features
        </p>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6 max-w-4xl mx-auto leading-tight">
          Everything you need to optimize AI spending
        </h2>

        <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-7 sm:leading-8 px-2">
          Analyze subscriptions, discover hidden savings, and generate beautiful
          shareable audit reports
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="bg-white rounded-[2rem] border border-gray-200 p-6 sm:p-8 shadow-sm hover:shadow-lg hover:-translate-y-2 duration-300 transition">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-6 text-xl sm:text-2xl">
            💡
          </div>

          <h3 className="text-xl sm:text-2xl font-semibold mb-4">
            Smart Recommendation
          </h3>

          <p className="text-gray-500 leading-7 text-sm sm:text-base">
            Get personalized plan downgrade suggestions based on your AI usage
            and team size.
          </p>
        </div>

        <div className="bg-white rounded-[2rem] border border-gray-200 p-6 sm:p-8 shadow-sm hover:shadow-lg hover:-translate-y-2 duration-300 transition">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-6 text-xl sm:text-2xl">
            📊
          </div>

          <h3 className="text-xl sm:text-2xl font-semibold mb-4">
            Real Savings Insights
          </h3>

          <p className="text-gray-500 leading-7 text-sm sm:text-base">
            Discover monthly and annual savings opportunities across your AI
            subscriptions.
          </p>
        </div>

        <div className="bg-white rounded-[2rem] border border-gray-200 p-6 sm:p-8 shadow-sm hover:shadow-lg hover:-translate-y-2 duration-300 transition">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-6 text-xl sm:text-2xl">
            🚀
          </div>

          <h3 className="text-xl sm:text-2xl font-semibold mb-4">
            Shareable Reports
          </h3>

          <p className="text-gray-500 leading-7 text-sm sm:text-base">
            Generate beautiful public audit reports with clean and professional
            summaries.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
