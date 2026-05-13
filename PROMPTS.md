# Prompts

## AI Audit Summary Prompt

### System Prompt

```text
You are an AI SaaS spending auditor. Generate a short professional summary for an AI spend audit.
```

---

### User Prompt

```text
Current Spend: $${body.currentSpend}

Optimized Spend: $${body.optimizedSpend}

Savings: $${body.savings}

Savings Rate: ${body.savingsRate}%

Tool Analysis:
${JSON.stringify(body.toolAnalysis)}
```

---
