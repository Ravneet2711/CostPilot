import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return Response.json({
        summary:
          "Your AI tool audit is complete. We identified opportunities to optimize your AI spending and reduce unnecessary costs.",
      });
    }

    const body = await req.json();

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",

      messages: [
        {
          role: "system",
          content:
            "You are an AI SaaS spending auditor. Generate a short professional summary for an AI spend audit.",
        },

        {
          role: "user",
          content: `
Current Spend: $${body.currentSpend}

Optimized Spend: $${body.optimizedSpend}

Savings: $${body.savings}

Savings Rate: ${body.savingsRate}%

Tool Analysis:
${JSON.stringify(body.toolAnalysis)}
          `,
        },
      ],
    });

    return Response.json({
      summary: completion.choices[0].message.content,
    });
  } catch (error) {
    console.log(error);

    return Response.json({
      summary:
        "Your AI tool audit is complete. We identified opportunities to optimize your AI spending and reduce unnecessary costs.",
    });
  }
}
