import prisma from "./prismaClient";
import bcrypt from "bcrypt";
export default async function verifyUser(email, password) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return null;
  }
  const isValidPassword = bcrypt.compare(password, user?.password);
  if (!isValidPassword) {
    return null;
  }
  return { id: user.id, email: user.email };
}
