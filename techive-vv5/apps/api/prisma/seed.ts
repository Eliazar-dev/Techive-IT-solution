// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("ChangeMe123!", 12);
  const admin = await prisma.adminUser.upsert({
    where: { email: "admin@techive.co.ke" },
    update: {},
    create: { email: "admin@techive.co.ke", passwordHash, role: "super_admin" },
  });
  console.log("Admin user:", admin.email, "(password: ChangeMe123! — change this immediately after first login)");

  await prisma.service.createMany({
    skipDuplicates: true,
    data: [
      { slug: "custom-software", title: "Custom Software", description: "Engineered web and mobile platforms built to fit your precise workflows.", icon: "terminal", order: 0 },
      { slug: "ai-ml", title: "AI & Machine Learning", description: "Automate manual decisions and build natural pipelines using custom models.", icon: "cpu", order: 1 },
      { slug: "data-intelligence", title: "Data & Intelligence", description: "Turn raw datasets into intuitive, beautiful executive dashboard interfaces.", icon: "bar-chart", order: 2 },
      { slug: "cloud-devops", title: "Cloud & DevOps", description: "Resilient infrastructure and CI/CD pipelines that scale with your traffic.", icon: "cloud", order: 3 },
      { slug: "ui-ux", title: "UI/UX Design", description: "Interfaces engineered around clarity, speed, and real user behavior.", icon: "layout", order: 4 },
      { slug: "marketing-seo", title: "Digital Marketing & SEO", description: "Structural SEO and growth systems that compound over time.", icon: "trending-up", order: 5 },
    ],
  });

  await prisma.solution.createMany({
    skipDuplicates: true,
    data: [
      { slug: "healthcare-tech", tag: "Industry Native", title: "Healthcare Tech", description: "HIPAA-compliant platforms bridging administrative data, telemetry streams, and modern patient portals securely.", order: 0 },
      { slug: "fintech-systems", tag: "Industry Native", title: "FinTech Systems", description: "Robust ledger tooling and smart banking APIs engineered with high throughput, fraud detection, and safety.", order: 1 },
      { slug: "edtech-platforms", tag: "Industry Native", title: "EdTech Platforms", description: "Scalable virtual learning spaces designed with interactive progression tracks and dynamic course managers.", order: 2 },
    ],
  });

  await prisma.course.createMany({
    skipDuplicates: true,
    data: [
      { slug: "web-dev-bootcamp", title: "Web Development Bootcamp", durationWeeks: 12, level: "Beginner to Pro", description: "From HTML fundamentals to full-stack React and Node applications.", order: 0 },
      { slug: "ai-data-science", title: "AI & Data Science Program", durationWeeks: 16, level: "Intermediate", description: "Python, statistics, and applied machine learning for real datasets.", order: 1 },
      { slug: "ui-ux-masterclass", title: "UI/UX Design Masterclass", durationWeeks: 8, level: "All Levels", description: "Design systems, prototyping, and user research from first principles.", order: 2 },
      { slug: "cloud-engineering", title: "Cloud Engineering Track", durationWeeks: 10, level: "Advanced", description: "AWS/Azure architecture, containers, and production-grade CI/CD.", order: 3 },
      { slug: "building-with-ai", title: "Building with AI", durationWeeks: 6, level: "All Levels", description: "Learn to build real websites, mobile apps, and software using AI-assisted development tools and workflows — from idea to shipped product.", order: 4 },
    ],
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      { slug: "scribeai-health", title: "ScribeAI Health", category: "Healthcare AI", summary: "AI-assisted clinical documentation platform reducing charting time by 60%.", order: 0 },
      { slug: "apex-ledger", title: "Apex Ledger", category: "FinTech API", summary: "High-throughput ledger system with real-time fraud detection.", order: 1 },
      { slug: "nova-learn", title: "Nova Learn", category: "EdTech Platform", summary: "Interactive learning platform with adaptive progression tracking.", order: 2 },
    ],
  });

  await prisma.teamMember.createMany({
    skipDuplicates: true,
    data: [
      { name: "Amara Okoye", role: "Founder & Lead Engineer", order: 0 },
      { name: "David Mwangi", role: "Head of AI Systems", order: 1 },
      { name: "Grace Wanjiru", role: "Lead Product Designer", order: 2 },
    ],
  });

  await prisma.testimonial.createMany({
    skipDuplicates: true,
    data: [
      { quote: "TECHIVE completely transformed how we managed clinical data ingestion. Fast, clean, and perfectly engineered.", authorName: "Dr. Sarah Jenkins", authorTitle: "Director of Product, ScribeAI", order: 0 },
      { quote: "The ledger pipelines they set up for Apex hold up perfectly under heavy peak hours. Exceptional quality.", authorName: "Marcus Miller", authorTitle: "VP of Engineering, Apex Ledger", order: 1 },
      { quote: "Outstanding design choices and intuitive progression tracks. Our course engagement rose by 40%.", authorName: "Elena Rostova", authorTitle: "Co-founder, Nova Learn", order: 2 },
    ],
  });

  await prisma.blogPost.createMany({
    skipDuplicates: true,
    data: [
      { slug: "future-of-llm-integrations", title: "The Future of LLM Integrations", excerpt: "Best practices for setting up reliable context gates.", content: "Full article content goes here.", isPublished: true },
      { slug: "auditable-ledgers", title: "Building Highly Auditable Ledgers", excerpt: "How our engineers architect fault-tolerant ledger systems.", content: "Full article content goes here.", isPublished: true },
    ],
  });

  await prisma.settings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      companyName: "Techive IT Solutions",
      companyEmail: "hello@techive.co.ke",
      companyPhone: "+254 700 000 000",
      companyAddress: "Thika, Kenya",
    },
  });

  // Placeholder gallery entries — replace with real coding/dev photos or
  // videos through the admin panel's Gallery upload once available.
  await prisma.galleryItem.createMany({
    skipDuplicates: true,
    data: [
      { type: "image", url: "", caption: "Our engineers pairing on a client build", order: 0 },
      { type: "image", url: "", caption: "Live sprint planning at the Techive studio", order: 1 },
      { type: "image", url: "", caption: "Shipping a new release", order: 2 },
    ],
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
