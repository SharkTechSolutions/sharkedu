export const categories = [
"Web Development",
"Data & Analytics",
"Product Design",
"Growth Marketing",
"Business Systems",
"AI & Automation"
];

export const stats = [
{ label: "Active Learners", value: "12K+" },
{ label: "Expert Mentors", value: "25+" },
{ label: "Industry Projects", value: "150+" },
{ label: "Avg. Rating", value: "4.9/5" }
];

export const testimonials = [
{
name: "Aarav Mehta",
role: "Frontend Developer",
quote:
"The MERN Stack training helped me build real-world projects with confidence. The mentorship and practical assignments made learning highly effective."
},
{
name: "Priya Sharma",
role: "Data Analyst",
quote:
"The learning structure was industry-focused and easy to follow. I improved my technical skills and gained practical project experience."
},
{
name: "Nisha Kapoor",
role: "UI/UX Designer",
quote:
"The design modules were clean, practical, and professionally structured. I learned how to create modern user experiences and portfolio-ready designs."
}
];

export const faqs = [
{
q: "Will I get lifetime access to the course?",
a: "Yes. All enrolled students receive lifetime access to course content, recorded sessions, updates, and learning resources."
},
{
q: "Do courses include certificates?",
a: "Yes. SharkEdu provides verified completion certificates after successful course completion and project submission."
},
{
q: "Are the courses beginner friendly?",
a: "Yes. Courses are designed for beginners, intermediate learners, and working professionals with step-by-step guidance."
},
{
q: "Will there be mentor support during the course?",
a: "Yes. Students receive mentor guidance, doubt-solving sessions, project reviews, and community support throughout the learning journey."
}
];

export const courses = [
{
slug: "mern-stack-ai-mastery",
title: "MERN Stack & AI Tools Mastery",
category: "Web Development",
level: "Beginner to Advanced",
duration: "16 Weeks",
lessons: 95,
students: 8200,
rating: 4.9,
price: 3000,
originalPrice: 10000,
image:
"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
instructor: "Ravi Singh",
summary:
"Master full-stack web development with MongoDB, Express.js, React.js, Node.js, and modern AI tools through real-world projects.",
outcomes: [
"Build complete production-ready MERN applications",
"Integrate AI tools into development workflows",
"Create scalable backend APIs and authentication systems",
"Deploy modern full-stack applications to production"
],
curriculum: [
"Modern JavaScript and ES6 concepts",
"Advanced React.js development",
"Node.js and Express.js backend development",
"MongoDB database integration",
"Authentication and JWT security",
"AI tools for developers",
"Cloud deployment and hosting",
"Capstone production projects"
]
},

{
slug: "nextjs-mastery",
title: "Next.js Mastery: Build Production-Ready Apps",
category: "Web Development",
level: "Intermediate",
duration: "10 Weeks",
lessons: 64,
students: 4200,
rating: 4.9,
price: 7000,
originalPrice: 9000,
image:
"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
instructor: "Anuj Singh",
summary:
"Learn how to build scalable Next.js applications with authentication, APIs, dashboards, and deployment workflows.",
outcomes: [
"Develop production-grade Next.js applications",
"Build secure authentication systems",
"Optimize performance and scalability",
"Deploy full-stack applications professionally"
],
curriculum: [
"Modern React architecture",
"Next.js routing and server components",
"Backend integration and APIs",
"Authentication and authorization",
"Performance optimization",
"Deployment and production workflows"
]
},

{
slug: "data-analytics-bootcamp",
title: "Data Analytics Bootcamp: SQL, Python & BI",
category: "Data & Analytics",
level: "Beginner to Intermediate",
duration: "12 Weeks",
lessons: 72,
students: 5300,
rating: 4.8,
price: 7000,
originalPrice: 9000,
image:
"https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
instructor: "Anuj Singh",
summary:
"Learn practical data analytics using SQL, Python, dashboards, and business intelligence workflows.",
outcomes: [
"Analyze and visualize business data",
"Build practical SQL and Python workflows",
"Create interactive dashboards",
"Generate actionable business insights"
],
curriculum: [
"SQL for analytics",
"Python data analysis",
"Data visualization techniques",
"Dashboard and reporting systems",
"Business intelligence workflows",
"Analytics capstone projects"
]
},

{
slug: "ui-ux-design-pro",
title: "UI/UX Design Pro: Research to Interface",
category: "Product Design",
level: "Beginner",
duration: "8 Weeks",
lessons: 48,
students: 3100,
rating: 4.7,
price: 7000,
originalPrice: 9000,
image:
"https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
instructor: "Kulkamal Singh",
summary:
"Design modern user experiences using professional UI/UX workflows, wireframing, and responsive interface systems.",
outcomes: [
"Create modern UI systems",
"Improve usability and accessibility",
"Build responsive prototypes",
"Present professional case studies"
],
curriculum: [
"User research fundamentals",
"Wireframing and UX flows",
"Typography and color systems",
"Responsive UI design",
"Interactive prototyping",
"Portfolio design projects"
]
},

{
slug: "growth-marketing-ai",
title: "Growth Marketing with AI Automation",
category: "Growth Marketing",
level: "Intermediate",
duration: "6 Weeks",
lessons: 34,
students: 2700,
rating: 4.8,
price: 7000,
originalPrice: 9000,
image:
"https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1200&q=80",
instructor: "Harsh Sharma",
summary:
"Learn AI-powered growth marketing, automation systems, and modern digital campaign optimization strategies.",
outcomes: [
"Build high-converting marketing funnels",
"Use AI tools for campaign workflows",
"Optimize lead generation systems",
"Scale marketing performance efficiently"
],
curriculum: [
"Growth marketing strategy",
"AI-powered content workflows",
"CRM and automation systems",
"Campaign analytics",
"Lead generation techniques",
"Marketing optimization projects"
]
}
];

export function getCourseBySlug(slug) {
return courses.find((course) => course.slug === slug);
}
