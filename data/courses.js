export const categories = [
  "Web Development",
  "Data Science",
  "Design",
  "Marketing",
  "Business",
  "AI & Automation"
];

export const stats = [
  { label: "Active Learners", value: "300+" },
  { label: "Expert Instructors", value: "10+" },
  { label: "Career Certificates", value: "65" },
  { label: "Avg. Rating", value: "4.8/5" }
];

export const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Frontend Developer",
    quote:
      "The project-based format helped me switch careers in under six months. The mentors gave actionable feedback every week."
  },
  {
    name: "Priya Sharma",
    role: "Product Analyst",
    quote:
      "I loved the structured roadmap and the interview prep modules. I landed a better role with a 40% pay jump."
  },
  {
    name: "Nisha Kapoor",
    role: "Freelance Designer",
    quote:
      "The design program was practical and business-friendly. I now sign clients confidently and charge premium rates."
  }
];

export const faqs = [
  {
    q: "Do I get lifetime access?",
    a: "Yes. Once you purchase a course, you retain lifetime access to videos, resources, and future updates."
  },
  {
    q: "Are certificates included?",
    a: "Yes, verified certificates are included for all tracks after completing course projects and assessments."
  },
  {
    q: "How much support will I get?",
    a: "You get mentor Q&A, peer community access, and weekly office hours for guided learning."
  }
];

export const courses = [
  {
    slug: "nextjs-mastery",
    title: "Next.js Mastery: Build Production-Ready Apps",
    category: "Web Development",
    level: "Intermediate",
    duration: "10 Weeks",
    lessons: 64,
    students: 4200,
    rating: 4.9,
    price: 1499,
    originalPrice: 2499,
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
    instructor: "Rahul Verma",
    summary:
      "Master app router, authentication, APIs, and deployment by building real SaaS-grade projects.",
    outcomes: [
      "Ship full-stack Next.js applications",
      "Design scalable API and data layers",
      "Implement secure auth and payments",
      "Deploy and monitor production workloads"
    ],
    curriculum: [
      "Modern React patterns",
      "Next.js app router deep dive",
      "Database, ORM, and caching",
      "Auth, payments, and webhooks",
      "Performance tuning and testing",
      "Deployment and observability"
    ]
  },
  {
    slug: "data-analytics-bootcamp",
    title: "Data Analytics Bootcamp: SQL, Python & BI",
    category: "Data Science",
    level: "Beginner to Intermediate",
    duration: "12 Weeks",
    lessons: 72,
    students: 5300,
    rating: 4.8,
    price: 1699,
    originalPrice: 2799,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    instructor: "Ishita Rao",
    summary:
      "Learn data storytelling, dashboards, and business insights with industry-style analytics projects.",
    outcomes: [
      "Write advanced SQL for analytics",
      "Analyze data with Python notebooks",
      "Build dashboards in Power BI/Tableau",
      "Present actionable business insights"
    ],
    curriculum: [
      "SQL fundamentals to advanced",
      "Python for analytics",
      "Exploratory data analysis",
      "Dashboard design principles",
      "A/B testing and metrics",
      "Capstone case study"
    ]
  },
  {
    slug: "ui-ux-design-pro",
    title: "UI/UX Design Pro: Research to Interface",
    category: "Design",
    level: "Beginner",
    duration: "8 Weeks",
    lessons: 48,
    students: 3100,
    rating: 4.7,
    price: 1299,
    originalPrice: 2199,
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
    instructor: "Neha Saini",
    summary:
      "Design user-first digital products from research to high-fidelity prototypes and handoff.",
    outcomes: [
      "Run user interviews and synthesize findings",
      "Create wireframes and interaction flows",
      "Design polished, accessible interfaces",
      "Build portfolio-ready case studies"
    ],
    curriculum: [
      "UX fundamentals and psychology",
      "Research planning and execution",
      "Wireframing and information architecture",
      "UI systems and design tokens",
      "Prototyping and usability testing",
      "Portfolio and client handoff"
    ]
  },
  {
    slug: "growth-marketing-ai",
    title: "Growth Marketing with AI Automation",
    category: "Marketing",
    level: "Intermediate",
    duration: "6 Weeks",
    lessons: 34,
    students: 2700,
    rating: 4.8,
    price: 999,
    originalPrice: 1799,
    image:
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1200&q=80",
    instructor: "Kabir Khanna",
    summary:
      "Build high-converting funnels and automate campaigns using modern AI marketing workflows.",
    outcomes: [
      "Plan performance marketing campaigns",
      "Write better ads with AI prompts",
      "Automate lead and email sequences",
      "Improve CAC and conversion metrics"
    ],
    curriculum: [
      "Marketing strategy and positioning",
      "Ad channels and creative testing",
      "Email and CRM automations",
      "AI-assisted content operations",
      "Funnel analytics",
      "Campaign optimization playbook"
    ]
  }
];

export function getCourseBySlug(slug) {
  return courses.find((course) => course.slug === slug);
}
