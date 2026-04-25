# CourseCraft (Next.js)

A modern course-selling website built with Next.js App Router.

## Pages
- `/` Home page with hero, featured courses, categories, testimonials, and FAQ
- `/courses` Course catalog
- `/courses/[slug]` Course details page
- `/checkout` Checkout page (supports `?course=<slug>` preselection)
- `/login` Student login with Google OAuth
- `/signup` Student signup with Google OAuth
- `/my-courses` Protected student dashboard for enrolled courses

## Run locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
3. Open:
   ```
   http://localhost:3000
   ```

## Google OAuth setup
1. Copy env template:
   ```bash
   copy .env.example .env.local
   ```
2. Create Google OAuth credentials in Google Cloud Console.
3. Set authorized redirect URI to:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
4. Fill `.env.local` values:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL=http://localhost:3000`

## Project structure
- `app/` routes and global styles
- `components/` reusable UI components
- `data/courses.js` course catalog + supporting content
- `lib/auth.js` next-auth Google provider config
