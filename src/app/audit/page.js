import AuditForm from "@/components/audit/AuditForm";

export default function AuditPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-[#f5f0ff] to-[#ebe9ff]">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              AI Spend Audit
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
              Cut unnecessary
              <span className="text-purple-600"> AI costs </span>
              instantly.
            </h1>

            <p className="text-base sm:text-lg text-gray-500 leading-7 sm:leading-relaxed mb-8">
              Analyze your current AI stack, uncover duplicate tools, and
              discover smarter alternatives in under 2 minutes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button className="w-full sm:w-auto bg-black text-white px-6 py-4 rounded-2xl font-medium hover:opacity-90 transition">
                Start Free Audit
              </button>

              <p className="text-sm text-gray-500">No signup required</p>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-[28px] sm:rounded-[32px] p-5 sm:p-8 shadow-[0_20px_80px_rgba(124,58,237,0.15)]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">
                <div>
                  <p className="text-gray-500 text-sm mb-2">Monthly Spend</p>

                  <h2 className="text-4xl sm:text-5xl font-bold">₹32,000</h2>
                </div>

                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium w-fit">
                  Save 45%
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
                  <span className="text-sm sm:text-base">ChatGPT Team</span>

                  <span className="font-semibold">₹12k</span>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
                  <span className="text-sm sm:text-base">Claude Pro</span>

                  <span className="font-semibold">₹8k</span>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
                  <span className="text-sm sm:text-base">Cursor</span>

                  <span className="font-semibold">₹6k</span>
                </div>
              </div>

              <div className="mt-8 bg-purple-600 text-white rounded-2xl p-5">
                <p className="text-sm opacity-80 mb-2">Potential Savings</p>

                <h3 className="text-2xl sm:text-3xl font-bold">₹14,500/mo</h3>
              </div>
            </div>
          </div>
        </div>

        <AuditForm />
      </section>
    </main>
  );
}
