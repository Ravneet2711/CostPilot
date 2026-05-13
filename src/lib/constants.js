export const AI_TOOLS = {
  cursor: {
    name: "Cursor",
    logo: "/logos/cursor.svg",
    category: "coding",
    plans: {
      hobby: {
        price: 0,
        name: "Hobby",
        features: ["Limited completions", "2 week Pro trial"],
      },
      pro: {
        price: 20,
        name: "Pro",
        features: ["Unlimited completions", "500 fast premium requests/mo"],
      },
      business: {
        price: 40,
        name: "Business",
        features: ["Everything in Pro", "Admin dashboard", "Usage stats"],
      },
      enterprise: {
        price: 60,
        name: "Enterprise",
        features: ["Custom contracts", "SSO", "Priority support"],
      },
    },
    url: "https://cursor.sh/pricing",
  },
  github_copilot: {
    name: "GitHub Copilot",
    logo: "/logos/copilot.svg",
    category: "coding",
    plans: {
      individual: {
        price: 10,
        name: "Individual",
        features: ["Code completions", "Chat in IDE"],
      },
      business: {
        price: 19,
        name: "Business",
        features: ["Organization management", "Policy controls"],
      },
      enterprise: {
        price: 39,
        name: "Enterprise",
        features: ["Custom model fine-tuning", "Advanced security"],
      },
    },
    url: "https://github.com/features/copilot#pricing",
  },
  claude: {
    name: "Claude",
    logo: "/logos/claude.svg",
    category: "general",
    plans: {
      free: {
        price: 0,
        name: "Free",
        features: ["Limited usage", "Claude 3.5 Sonnet"],
      },
      pro: {
        price: 20,
        name: "Pro",
        features: ["5x more usage", "Claude 3.5 Opus"],
      },
      max: {
        price: 100,
        name: "Max",
        features: ["20x more usage", "Priority access"],
      },
      team: {
        price: 30,
        name: "Team",
        features: ["Admin controls", "Higher limits", "Per seat"],
      },
      enterprise: {
        price: 50,
        name: "Enterprise",
        features: ["SSO", "Custom contracts", "SLA"],
      },
    },
    url: "https://claude.ai/pricing",
  },
  chatgpt: {
    name: "ChatGPT",
    logo: "/logos/chatgpt.svg",
    category: "general",
    plans: {
      plus: {
        price: 20,
        name: "Plus",
        features: ["GPT-4o", "DALL-E", "Browsing"],
      },
      team: {
        price: 30,
        name: "Team",
        features: ["Workspace features", "Admin console", "Per seat"],
      },
      enterprise: {
        price: 60,
        name: "Enterprise",
        features: ["Unlimited GPT-4", "Advanced analytics", "SSO"],
      },
    },
    url: "https://openai.com/chatgpt/pricing",
  },
  anthropic_api: {
    name: "Anthropic API",
    logo: "/logos/anthropic.svg",
    category: "api",
    plans: {
      payg: {
        price: 0,
        name: "Pay-as-you-go",
        features: ["$3/M input tokens", "$15/M output tokens (Sonnet)"],
        isUsageBased: true,
      },
    },
    url: "https://anthropic.com/api",
  },
  openai_api: {
    name: "OpenAI API",
    logo: "/logos/openai.svg",
    category: "api",
    plans: {
      payg: {
        price: 0,
        name: "Pay-as-you-go",
        features: ["$5/M input tokens", "$15/M output tokens (GPT-4o)"],
        isUsageBased: true,
      },
    },
    url: "https://openai.com/api/pricing",
  },
  gemini: {
    name: "Gemini",
    logo: "/logos/gemini.svg",
    category: "general",
    plans: {
      pro: {
        price: 20,
        name: "Pro",
        features: ["Gemini Advanced", "2TB storage"],
      },
      ultra: {
        price: 30,
        name: "Ultra",
        features: ["Highest capabilities", "Early access"],
      },
    },
    url: "https://gemini.google.com/pricing",
  },
  windsurf: {
    name: "Windsurf",
    logo: "/logos/windsurf.svg",
    category: "coding",
    plans: {
      free: {
        price: 0,
        name: "Free",
        features: ["Basic completions", "Limited usage"],
      },
      pro: {
        price: 15,
        name: "Pro",
        features: ["Unlimited completions", "All models"],
      },
      team: {
        price: 25,
        name: "Team",
        features: ["Admin dashboard", "Priority support"],
      },
    },
    url: "https://windsurf.ai/pricing",
  },
};

export const USE_CASES = [
  { value: "coding", label: "Coding / Development" },
  { value: "writing", label: "Writing / Content" },
  { value: "data", label: "Data Analysis" },
  { value: "research", label: "Research" },
  { value: "mixed", label: "Mixed / General" },
];

export const TEAM_SIZES = [
  { value: "1", label: "1 person (Solo)" },
  { value: "2-5", label: "2-5 people" },
  { value: "6-10", label: "6-10 people" },
  { value: "11-25", label: "11-25 people" },
  { value: "26-50", label: "26-50 people" },
  { value: "51-100", label: "51-100 people" },
  { value: "100+", label: "100+ people" },
];

export const ALTERNATIVES = {
  coding: {
    budget: ["windsurf", "github_copilot"],
    balanced: ["cursor", "github_copilot"],
    premium: ["cursor"],
  },
  general: {
    budget: ["gemini", "claude"],
    balanced: ["chatgpt", "claude"],
    premium: ["claude", "chatgpt"],
  },
  api: {
    budget: ["anthropic_api"],
    balanced: ["openai_api", "anthropic_api"],
    premium: ["openai_api"],
  },
};

export const TOOL_DISCOUNTS = {
  cursor: 0.25,
  github_copilot: 0.2,
  claude: 0.3,
  chatgpt: 0.25,
  anthropic_api: 0.15,
  openai_api: 0.15,
  gemini: 0.2,
  windsurf: 0.15,
};

export const TOOL_RECOMMENDATIONS = {
  coding: {
    solo: {
      budget: ["windsurf", "github_copilot"],
      recommended: "cursor",
      reason:
        "Cursor offers the best codebase understanding for solo devs working on complex projects",
    },
    small: {
      budget: ["github_copilot", "windsurf"],
      recommended: "cursor",
      reason:
        "For small teams, Cursor Business provides excellent collaboration features",
    },
    large: {
      budget: ["github_copilot"],
      recommended: "github_copilot",
      reason:
        "GitHub Copilot Enterprise scales well with existing GitHub workflows",
    },
  },
  writing: {
    solo: {
      budget: ["gemini", "chatgpt"],
      recommended: "claude",
      reason:
        "Claude excels at nuanced writing and handles long documents best",
    },
    small: {
      budget: ["chatgpt", "gemini"],
      recommended: "claude",
      reason: "Claude Team provides consistent quality for content teams",
    },
    large: {
      budget: ["chatgpt"],
      recommended: "chatgpt",
      reason: "ChatGPT Team scales well for large content operations",
    },
  },
  data: {
    solo: {
      budget: ["gemini", "chatgpt"],
      recommended: "claude",
      reason:
        "Claude handles complex data analysis and large datasets effectively",
    },
    small: {
      budget: ["chatgpt", "claude"],
      recommended: "claude",
      reason: "Claude is excellent for data interpretation and analysis",
    },
    large: {
      budget: ["openai_api"],
      recommended: "openai_api",
      reason: "OpenAI API allows custom data pipelines at scale",
    },
  },
  research: {
    solo: {
      budget: ["gemini", "chatgpt"],
      recommended: "claude",
      reason: "Claude provides thorough analysis with better citation handling",
    },
    small: {
      budget: ["claude", "chatgpt"],
      recommended: "claude",
      reason: "Claude Team is ideal for research collaboration",
    },
    large: {
      budget: ["chatgpt"],
      recommended: "claude",
      reason:
        "Claude handles long research documents and complex analysis better",
    },
  },
  mixed: {
    solo: {
      budget: ["chatgpt", "gemini"],
      recommended: "claude",
      reason: "Claude is the most versatile for mixed use cases",
    },
    small: {
      budget: ["chatgpt", "claude"],
      recommended: "claude",
      reason: "Claude Team balances all capabilities well",
    },
    large: {
      budget: ["chatgpt"],
      recommended: "chatgpt",
      reason: "ChatGPT Team has the broadest feature set for diverse needs",
    },
  },
};
