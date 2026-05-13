# Reflection

## The hardest bug I hit this week, and how I debugged it
 The hardest bug I faced was during deployment on vercel. The OpenAI summary feature was working fine on localhost, but after deploying to Vercel, The API suddenly stopped and kept showing "Missing Credentials" error. At first I thought there was something wrong with my API route or request body. I checked the fetch calls and console logs. I spent a lot of time on debugging the wrong parts before finally checking the Vercel deployment logs carefully.
Then I realized the actual problem was simple: my `OPENAI_API_KEY` existed only in `.env.local` and I didn't added it to Vercel environment variables. After adding the key in Vercel settings and redeploying, everything started working correctly. 



## How I used AI tools

I used ChatGPT regularly during development for UI ideas, debugging responsiveness issues, improving component structure, and enhancing written documentation. It was useful for speeding up repetitive work. I also used it to improve wording for summaries and landing page copy.


---

## Self-rating

### Discipline — 8/10

### Code Quality — 7/10

### Design Sense — 8/10

### Problem Solving — 7/10

### Entrepreneurial Thinking — 7/10