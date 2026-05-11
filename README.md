# CourseCraft (Next.js)

A modern course-selling website built with Next.js App Router.

## Pages
- `/` Home page with hero, featured courses, categories, testimonials, and FAQ
- `/courses` Course catalog
- `/courses/[slug]` Course details page
- `/checkout` Checkout page (Razorpay integration, login required)
- `/login` Student login with Google OAuth
- `/signup` Student signup with Google OAuth
- `/my-courses` Protected student dashboard (course access from payment records)

## Run locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create environment file:
   ```bash
   copy .env.example .env.local
   ```
3. Run Prisma migration and generate client:
   ```bash
   npm run prisma:migrate -- --name init_payments
   npm run prisma:generate
   ```
4. Start development server:
   ```bash
   npm run dev
   ```
5. Open:
   ```
   http://localhost:3000
   ```

## Google OAuth setup
1. Create Google OAuth credentials in Google Cloud Console.
2. Set authorized redirect URI to:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
3. Fill `.env.local` values:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL=http://localhost:3000`

## Razorpay setup
1. Create a Razorpay test account and get API keys.
2. Fill `.env.local`:
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
3. Payment flow:
   - Frontend requests order from `/api/payments/create-order`.
   - Razorpay Checkout completes payment.
   - Backend verifies signature in `/api/payments/verify`.
   - Verified payment creates/updates purchase record in PostgreSQL.

## PostgreSQL schema
- `Student`: student identity (`id`, `email`, provider id)
- `PaymentOrder`: server-created Razorpay order records
- `CoursePurchase`: verified successful purchases (includes `razorpay_payment_id`, student email and student id)

## Project structure
- `app/` routes and global styles
- `components/` reusable UI components
- `data/courses.js` course catalog + supporting content
- `lib/auth.js` next-auth Google provider config
- `prisma/schema.prisma` PostgreSQL models
- `app/api/payments/*` Razorpay payment endpoints
