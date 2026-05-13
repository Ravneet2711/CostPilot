"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Sparkles, CheckCircle2 } from "lucide-react";
import {
  AI_TOOLS,
  TOOL_DISCOUNTS,
  TOOL_RECOMMENDATIONS,
} from "../lib/constants";

export default function ResultsCard() {
  const router = useRouter();
  const [auditData, setAuditData] = useState(null);
  const [summary, setSummary] = useState("");
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem("auditData");
    if (storedData) {
      setAuditData(JSON.parse(storedData));
    }
  }, []);

  const results = useMemo(() => {
    if (!auditData) return null;

    const { tools, formData } = auditData;

    let currentSpend = 0;
    let optimizedSpend = 0;

    const getTeamCategory = (size) => {
      if (size === "1") return "solo";
      if (["2-5", "6-10"].includes(size)) return "small";
      return "large";
    };

    const teamCategory = getTeamCategory(formData.teamSize);
    const useCase = formData.useCase || "mixed";

    const aiRecommendation =
      TOOL_RECOMMENDATIONS[useCase]?.[teamCategory] ||
      TOOL_RECOMMENDATIONS.mixed.solo;

    const toolAnalysis = tools
      .map((item) => {
        const toolData = AI_TOOLS[item.tool];
        if (!toolData) return null;

        const currentPlan = toolData.plans[item.plan];
        if (!currentPlan) return null;

        const currentSeats = Number(item.seats || 1);
        const currentCost = currentPlan.isUsageBased
          ? Number(item.monthlySpend || 0)
          : currentPlan.price * currentSeats;

        currentSpend += currentCost;

        let recommendedSeats = currentSeats;
        let recommendedPlan = item.plan;
        let reason = "Your current setup looks optimized.";
        let status = "optimal";

        // Parse team size number
        const teamSizeNum =
          formData.teamSize === "1"
            ? 1
            : formData.teamSize === "2-5"
              ? 5
              : formData.teamSize === "6-10"
                ? 10
                : formData.teamSize === "11-25"
                  ? 25
                  : formData.teamSize === "26-50"
                    ? 50
                    : formData.teamSize === "51-100"
                      ? 100
                      : 150;

        if (currentSeats > teamSizeNum && !currentPlan.isUsageBased) {
          recommendedSeats = Math.max(1, teamSizeNum);
          status = "overprovisioned";
          reason = `You have ${currentSeats} seats but only ${teamSizeNum} team members. Reduce to ${recommendedSeats} seats.`;
        }

        const planKeys = Object.keys(toolData.plans);
        const currentPlanIndex = planKeys.indexOf(item.plan);

        if (teamSizeNum <= 2 && currentPlanIndex > 1) {
          const lowerPlanKey = planKeys[Math.max(0, currentPlanIndex - 1)];
          const lowerPlan = toolData.plans[lowerPlanKey];
          if (lowerPlan && !lowerPlan.isUsageBased) {
            recommendedPlan = lowerPlanKey;
            status = "overprovisioned";
            reason = `For a team of ${teamSizeNum}, the ${lowerPlan.name} plan would likely meet your needs at a lower cost.`;
          }
        }

        let alternativeTool = null;
        const isRecommended = aiRecommendation.recommended === item.tool;
        const isBudgetOption = aiRecommendation.budget.includes(item.tool);

        if (!isRecommended && !isBudgetOption && currentCost > 50) {
          const recommendedToolData = AI_TOOLS[aiRecommendation.recommended];
          if (recommendedToolData) {
            const recPlanKeys = Object.keys(recommendedToolData.plans);
            const bestPlan =
              recPlanKeys.find((k) => recommendedToolData.plans[k].price > 0) ||
              recPlanKeys[0];
            const altPlanData = recommendedToolData.plans[bestPlan];
            const altCost = altPlanData.price * recommendedSeats;

            if (altCost < currentCost * 0.8) {
              alternativeTool = {
                toolId: aiRecommendation.recommended,
                toolName: recommendedToolData.name,
                planName: altPlanData.name,
                cost: altCost,
                savings: currentCost - altCost,
                reason: aiRecommendation.reason,
              };
            }
          }
        }

        const recommendedPlanData = toolData.plans[recommendedPlan];
        const optimizedCost = recommendedPlanData.isUsageBased
          ? currentCost
          : recommendedPlanData.price * recommendedSeats;

        optimizedSpend += optimizedCost;

        const toolDiscount = TOOL_DISCOUNTS[item.tool] || 0;
        const totalSavings = Math.round(optimizedCost * toolDiscount);

        return {
          toolId: item.tool,
          toolName: toolData.name,
          category: toolData.category,
          planName: currentPlan.name,
          recommendedPlan: recommendedPlanData.name,
          currentSeats,
          recommendedSeats,
          currentCost,
          optimizedCost,
          savings: currentCost - optimizedCost,
          totalSavings,
          reason,
          status,
          alternativeTool,
          isRecommended,
        };
      })
      .filter(Boolean);

    const savings = currentSpend - optimizedSpend;
    const savingsRate =
      currentSpend > 0 ? Math.round((savings / currentSpend) * 100) : 0;
    const totalAISavings = toolAnalysis.reduce(
      (sum, t) => sum + t.totalSavings,
      0,
    );

    return {
      currentSpend,
      optimizedSpend,
      savings,
      savingsRate,
      totalAISavings,
      toolAnalysis,
      recommendation: aiRecommendation,
      useCase,
      teamCategory,
    };
  }, [auditData]);

  useEffect(() => {
    const generateSummary = async () => {
      if (!results) return;

      setIsGenerating(true);
      try {
        const response = await fetch("/api/generate-summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentSpend: results.currentSpend,
            optimizedSpend: results.optimizedSpend,
            savings: results.savings,
            tools: results.toolAnalysis.map((t) => ({
              name: t.toolName,
              currentCost: t.currentCost,
              savings: t.savings,
              reason: t.reason,
            })),
            recommendation: results.recommendation,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setSummary(data.summary);
        } else {
          throw new Error("Failed to generate");
        }
      } catch (error) {
        const savingsText =
          results.savings > 0
            ? `You could save $${results.savings}/month by optimizing your AI tool stack.`
            : "Your AI tool spending looks well-optimized.";

        setSummary(
          `${savingsText} Based on your ${results.useCase} use case and team size, we recommend focusing on ${AI_TOOLS[results.recommendation.recommended]?.name || "Claude"} as your primary tool. ${results.recommendation.reason}`,
        );
      } finally {
        setIsGenerating(false);
      }
    };

    if (results) {
      generateSummary();
    }
  }, [results]);

  const handleNewAudit = () => {
    localStorage.removeItem("auditData");
    router.push("/audit");
  };

  if (!results) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
          <p className="text-gray-500">Loading your audit results...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 sm:py-12 px-3 sm:px-6">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-10 rounded-[2rem] sm:rounded-[2.5rem] border border-purple-100 bg-white p-6 sm:p-8 md:p-12 shadow-sm">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#F3F0FF] px-4 py-2 text-sm font-medium text-[#6D5EF5]">
            <Sparkles className="h-4 w-4" />
            AI-Powered Summary
          </div>
          <p className="max-w-3xl text-sm sm:text-lg leading-7 sm:leading-relaxed text-gray-600">
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-gray-600" />
                Analyzing your AI spend...
              </span>
            ) : (
              summary
            )}
          </p>
        </div>

        <div className="mb-10 rounded-[1.5rem] sm:rounded-[2.5rem] bg-black p-5 sm:p-8 text-white md:p-12">
          <p className="mb-2 text-sm font-medium text-emerald-400">
            Potential Savings
          </p>
          <h1 className="mb-2 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Save ${results.savings.toLocaleString()}/mo
          </h1>
          <p className="text-base sm:text-lg text-gray-400">
            ${(results.savings * 12).toLocaleString()}/year
          </p>

          <div className="mt-8 sm:mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-white/10 p-5 sm:p-6 backdrop-blur">
              <p className="mb-1 text-sm text-gray-400">Current Spend</p>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                ${results.currentSpend.toLocaleString()}/mo
              </h3>
            </div>
            <div className="rounded-2xl sm:rounded-3xl bg-white/10 p-5 sm:p-6 backdrop-blur">
              <p className="mb-1 text-sm text-gray-400">Recommended</p>
              <h3 className="text-3xl font-bold text-emerald-400 md:text-4xl">
                ${results.optimizedSpend.toLocaleString()}/mo
              </h3>
            </div>
            <div className="rounded-2xl sm:rounded-3xl bg-white/10 p-5 sm:p-6 backdrop-blur">
              <p className="mb-1 text-sm text-gray-400">Savings Rate</p>
              <h3 className="text-3xl font-bold text-emerald-400 md:text-4xl">
                {results.savingsRate}%
              </h3>
            </div>
          </div>
        </div>

        {results.recommendation && (
          <div className="mb-10 rounded-[1.5rem] sm:rounded-[2rem] border border-emerald-200 bg-emerald-50 p-5 sm:p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="h-3 w-3" />
                  Recommended for {results.useCase}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Best Tool:{" "}
                  {AI_TOOLS[results.recommendation.recommended]?.name}
                </h3>
                <p className="mt-1 text-gray-600">
                  {results.recommendation.reason}
                </p>
              </div>
              <div className="shrink-0">
                <p className="mb-1 text-xs text-gray-500">
                  Budget Alternatives
                </p>
                <div className="flex flex-wrap gap-2">
                  {results.recommendation.budget.map((toolId) => (
                    <span
                      key={toolId}
                      className="rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm"
                    >
                      {AI_TOOLS[toolId]?.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mb-10">
          <h2 className="mb-6 text-2xl sm:text-3xl font-semibold text-gray-900">
            Tool-by-Tool Analysis
          </h2>
          <div className="space-y-5">
            {results.toolAnalysis.map((tool, index) => (
              <div
                key={index}
                className="rounded-[1.5rem] sm:rounded-[2rem] border border-gray-100 bg-white p-5 sm:p-6 md:p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-xl font-bold text-gray-600">
                      {tool.toolName[0]}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                          {tool.toolName}
                        </h3>
                        {tool.isRecommended && (
                          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                            Recommended
                          </span>
                        )}
                        {tool.status === "overprovisioned" && (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                            Overspending
                          </span>
                        )}
                      </div>
                      <p className="text-sm sm:text-base text-gray-500 break-words">
                        {tool.planName} Plan - {tool.currentSeats} seat
                        {tool.currentSeats > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  {tool.savings > 0 && (
                    <div className="rounded-2xl bg-emerald-100 px-4 py-3 text-center font-semibold text-emerald-700 text-sm sm:text-base">
                      Save ${tool.savings.toLocaleString()}/mo
                    </div>
                  )}
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-gray-50 p-5">
                    <p className="mb-1 text-sm text-gray-500">Current</p>
                    <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                      ${tool.currentCost.toLocaleString()}/mo
                    </h4>
                  </div>
                  <div className="rounded-2xl bg-gray-50 p-5">
                    <p className="mb-1 text-sm text-gray-500">Recommended</p>
                    <h4 className="text-2xl font-bold text-emerald-600 md:text-3xl">
                      ${tool.optimizedCost.toLocaleString()}/mo
                    </h4>
                  </div>
                </div>

                {tool.status !== "optimal" && (
                  <div className="mt-5 rounded-2xl border border-amber-100 bg-amber-50 p-4">
                    <p className="text-sm font-medium text-amber-800">
                      {tool.reason}
                    </p>
                  </div>
                )}

                {tool.alternativeTool && (
                  <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                    <p className="text-sm text-blue-800">
                      <span className="font-semibold">Alternative: </span>
                      Consider {tool.alternativeTool.toolName} (
                      {tool.alternativeTool.planName}) - saves $
                      {tool.alternativeTool.savings.toLocaleString()}/mo.{" "}
                      {tool.alternativeTool.reason}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {results.totalAISavings > 50 && (
          <div className="mb-10 rounded-[1.5rem] sm:rounded-[2rem] bg-gradient-to-r from-emerald-600 to-teal-600 p-5 sm:p-6 md:p-8 text-white">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-semibold">
                  Get Even More Savings with CostPilot
                </h3>
                <p className="mt-1 text-emerald-100">
                  Access discounted AI tool credits through CostPilot
                  marketplace. Save an additional $
                  {results.totalAISavings.toLocaleString()}/mo on top of your
                  optimizations.
                </p>
              </div>
              <Button className="w-full sm:w-auto shrink-0 bg-white text-emerald-700 hover:bg-gray-100">
                Learn About CostPilot
              </Button>
            </div>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-4">
          <Button
            variant="outline"
            onClick={handleNewAudit}
            className="w-full sm:w-auto border-0 bg-[#6D5EF5] px-6 py-3 text-white hover:bg-[#5b4df0] hover:text-white"
          >
            Run New Audit
          </Button>
        </div>
      </div>
    </main>
  );
}
