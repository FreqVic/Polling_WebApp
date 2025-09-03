# RULES.md

## Project Rules and Guidelines

### 1. Code Style
- Use [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) for code formatting and linting.
- Use 2 spaces for indentation.
- Use single quotes for strings in JavaScript/TypeScript.
- Always use semicolons.
- Use TypeScript for all source files.


### 3. Authentication
- Use Supabase for authentication.
- All protected routes must check for authentication using the `useAuth` hook.
- Redirect unauthenticated users to `/auth`.

### 4. Environment Variables
- Store all secrets and API keys in `.env.local`.
- Never commit `.env.local` or any secrets to version control.

### 5. Commits & Pull Requests
- Write clear, descriptive commit messages.
- Reference issues or features in commit messages when applicable.
- All code must be reviewed before merging to `main`.

### 6. Testing
- Write unit tests for utility functions and critical components.
- Use mocks for Supabase and external APIs in tests.

### 7. Accessibility & UX
- All forms must have labels for inputs.
- Use semantic HTML elements.
- Ensure keyboard navigation and screen reader compatibility.

### 8. Deployment
- Use Vercel or a similar platform for deployment.
- Never expose secrets in client-side code.

---

_Keep this file updated as the project evolves._```