# Architecture

## Data Flow

1. User visits the homepage and performs a free audit.

2. The audit form captures:
   - AI tools
   - plans
   - monthly spend
   - seats
   - team size
   - primary use case

3. The audit form stores the state in the React state and saves it in LocalStorage.

4. Once the form is submitted, the audit engine calculates:
   - whether you are overspending
   - whether your account needs more seats
   - better plans
   - more affordable options
   - possible optimizations

5. The audit data is passed to the results page.

6. The results page sends summarized audit information to an OpenAI API route.

7. OpenAI returns a brief summary paragraph.

8. If the API fails, a default static paragraph appears.

9. Results will be presented in a dashboard UI.

---
