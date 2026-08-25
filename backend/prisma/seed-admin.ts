import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const email = "admin@techive.co.ke";
  const password = "Techive2026!";
  const hash = await bcrypt.hash(password, 10);

  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing) {
    await prisma.adminUser.update({ where: { email }, data: { passwordHash: hash } });
    console.log("Admin updated:", email);
  } else {
    await prisma.adminUser.create({ data: { email, passwordHash: hash } });
    console.log("Admin created:", email);
  }
}

main().finally(() => prisma.$disconnect());
