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

## Why I Wrote the Prompt This Way

I intentionally kept the prompt short and structured because the summary is displayed inside a compact dashboard UI card.

The goal was:
- keep the response professional
- avoid unnecessary explanations
- focus only on spending insights
- make the output readable in a few seconds

I also wanted the summaries to feel trustworthy and financially focused instead of sounding overly creative.

---

## What I Tried That Didn't Work

### 1. Long prompts

Initially, I experimented with very detailed prompts asking the model to explain every recommendation. The responses became too long and cluttered for the UI.

### 2. AI-generated savings calculations

I briefly tried letting the model generate optimization recommendations directly, but the outputs were inconsistent and financially unreliable.

The same inputs sometimes produced different savings estimates, which reduced trust in the audit.

Because of that, I moved all pricing logic to deterministic hardcoded rules.

### 3. Casual tone prompts

I tested more conversational prompts, but they made the product feel less professional for startup founders and engineering teams.

A cleaner business-style tone worked much better.

---

## Failure Handling

If the OpenAI API fails or credentials are unavailable, the application falls back to a static templated summary so the audit experience never breaks completely.

This ensures users always receive an audit result even during API failures.