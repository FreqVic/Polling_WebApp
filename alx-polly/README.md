# ALX Polly

ALX Polly is a full-stack polling web application built with Next.js, Supabase, and TypeScript. It allows authenticated users to create polls, vote, and view results securely.

## Features
- Supabase authentication (email/password, OAuth)
- Create, list, and vote on polls
- Protected routes using `useAuth` hook
- Accessible, semantic forms
- Unit tests for API routes and utilities
- ESLint and Prettier enforced code style

## Getting Started

### Prerequisites
- Node.js 20+
- Supabase project (get your URL and anon key)

### Setup
1. Clone the repo:
   ```sh
   git clone https://github.com/your-org/alx-polly.git
   cd alx-polly
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create `.env.local` in the project root:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
4. Run the dev server:
   ```sh
   npm run dev
   ```

### Database
- See `supabase/schema.sql` for table definitions (`polls`, `poll_options`, `votes`).
- Run the SQL in Supabase SQL editor to set up tables.

### Testing
- Run unit tests:
   ```sh
   npm test
   ```
- Tests use Jest and ts-jest, with Supabase and Next.js APIs mocked.

### Code Style
- 2 spaces, single quotes, semicolons, TypeScript everywhere
- Run lint and format:
   ```sh
   npm run lint
   npm run format
   ```

### Accessibility & UX
- All forms have labels and helper text
- Keyboard and screen reader friendly

### Deployment
- Deploy on Vercel or similar
- Never commit `.env.local` or secrets

## Contributing
- Open issues and pull requests
- All code must be reviewed before merging

---

_See `.github/copilot-instructions.md` for full project rules._
