import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
      <div className="text-center md:text-left">
        <p className="text-purple-600 font-medium mb-4 text-sm sm:text-base">
          Save Money on AI Tools
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
          Stop Overpaying for AI subscriptions
        </h1>
        <p className="text-gray-500 text-base sm:text-lg leading-7 sm:leading-8 mb-8 max-w-xl mx-auto md:mx-0">
          Analyze your AI stack, discover cheaper plans, and uncover hidden
          savings instantly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <Link
            href="/audit"
            className="bg-black hover:bg-gray-900 transition text-white px-6 py-3 rounded-2xl inline-block text-center"
          >
            Start Free Audit
          </Link>

          <button className="border border-gray-300 hover:border-black transition px-6 py-3 rounded-2xl">
            Learn More
          </button>
        </div>
      </div>
      <div className="bg-white border border-gray-200 shadow-2xl rounded-[28px] sm:rounded-[32px] p-5 sm:p-8 backdrop-blur-sm">
        <p className="text-sm text-gray-500 mb-3">Potential Annual Savings</p>

        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-8">
          ₹1,68,000
        </h2>

        <div className="space-y-5">
          <div className="flex items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-900">ChatGPT Team</p>

              <p className="text-sm text-gray-500">Recommended downgrade</p>
            </div>

            <span className="text-green-600 font-semibold text-sm sm:text-base whitespace-nowrap">
              Save ₹48,000
            </span>
          </div>

          <div className="flex items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-900">Claude Max</p>

              <p className="text-sm text-gray-500">Better pricing available</p>
            </div>

            <span className="text-green-600 font-semibold text-sm sm:text-base whitespace-nowrap">
              Save ₹60,000
            </span>
          </div>

          <div className="flex items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-medium text-gray-900">Cursor Business</p>

              <p className="text-sm text-gray-500">Unused premium features</p>
            </div>

            <span className="text-green-600 font-semibold text-sm sm:text-base whitespace-nowrap">
              Save ₹30,000
            </span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <p className="text-gray-500 text-sm sm:text-base">
              Estimated Monthly Savings
            </p>

            <p className="text-xl sm:text-2xl font-bold">₹14,000</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
