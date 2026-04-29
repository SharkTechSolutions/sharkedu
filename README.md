# SharkEdu (Next.js)

A modern course-selling website built with Next.js App Router.

## Pages
- `/` Home page with hero, featured courses, categories, testimonials, and FAQ
- `/courses` Course catalog
- `/courses/[slug]` Course details page
- `/checkout` Checkout page (supports `?course=<slug>` preselection)

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

## Project structure
- `app/` routes and global styles
- `components/` reusable UI components
- `data/courses.js` course catalog + supporting content
