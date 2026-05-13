import Link from "next/link";
import React from "react";

const CTA = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-28">
      <div className="bg-black text-white rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 lg:p-20 text-center">
        <p className="text-purple-300 font-medium mb-4 text-sm sm:text-base">
          Start saving today
        </p>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-6 max-w-4xl mx-auto">
          Discover how much you can save on AI tools.
        </h2>

        <p className="text-gray-300 text-base sm:text-lg leading-7 sm:leading-8 max-w-2xl mx-auto mb-8 sm:mb-10">
          Audit your subscriptions, optimize your plans, and uncover hidden
          savings in minutes.
        </p>

        <Link
          href="/audit"
          className="inline-block bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-medium hover:opacity-90 transition text-sm sm:text-base"
        >
          Start Free Audit
        </Link>
      </div>
    </section>
  );
};

export default CTA;
