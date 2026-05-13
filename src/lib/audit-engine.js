import {
  AI_TOOLS,
  TOOL_DISCOUNTS,
  TOOL_RECOMMENDATIONS,
} from "@/lib/constants";

export function generateAudit(auditData) {
  if (!auditData) return null;

  const { tools, formData } = auditData;

  let currentSpend = 0;
  let optimizedSpend = 0;

  const getTeamCategory = (size) => {
    if (size === "1") return "solo";

    if (["2-5", "6-10"].includes(size)) {
      return "small";
    }

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

      // TEAM SIZE NUMBER
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

      // TOO MANY SEATS
      if (currentSeats > teamSizeNum && !currentPlan.isUsageBased) {
        recommendedSeats = Math.max(1, teamSizeNum);

        status = "overprovisioned";

        reason = `
          You have ${currentSeats}
          seats but only
          ${teamSizeNum} team members.
        `;
      }

      // EXPENSIVE PLAN
      const planKeys = Object.keys(toolData.plans);

      const currentPlanIndex = planKeys.indexOf(item.plan);

      if (teamSizeNum <= 2 && currentPlanIndex > 1) {
        const lowerPlanKey = planKeys[Math.max(0, currentPlanIndex - 1)];

        const lowerPlan = toolData.plans[lowerPlanKey];

        if (lowerPlan && !lowerPlan.isUsageBased) {
          recommendedPlan = lowerPlanKey;

          status = "overprovisioned";

          reason = `
            ${lowerPlan.name} plan
            would likely be enough
            for your team size.
          `;
        }
      }

      // OPTIMIZED COST
      const recommendedPlanData = toolData.plans[recommendedPlan];

      const optimizedCost = recommendedPlanData.isUsageBased
        ? currentCost
        : recommendedPlanData.price * recommendedSeats;

      optimizedSpend += optimizedCost;

      const toolDiscount = TOOL_DISCOUNTS[item.tool] || 0;

      const toolsSavings = Math.round(optimizedCost * toolDiscount);

      return {
        toolId: item.tool,
        toolName: toolData.name,
        planName: currentPlan.name,
        recommendedPlan: recommendedPlanData.name,
        currentSeats,
        recommendedSeats,
        currentCost,
        optimizedCost,
        savings: currentCost - optimizedCost,
        toolsSavings,
        reason,
        status,
      };
    })
    .filter(Boolean);

  const savings = currentSpend - optimizedSpend;

  const savingsRate =
    currentSpend > 0 ? Math.round((savings / currentSpend) * 100) : 0;

  const totalSavings = toolAnalysis.reduce((sum, t) => sum + t.toolsSavings, 0);

  return {
    currentSpend,
    optimizedSpend,
    savings,
    savingsRate,
    totalSavings,
    toolAnalysis,
    recommendation: aiRecommendation,
    useCase,
    teamCategory,
  };
}
