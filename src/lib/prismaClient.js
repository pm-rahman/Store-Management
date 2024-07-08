// defined in the global scope. This is because the global object is only
// defined in the global scope in Node.js and not in the browser.

import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const prismaClientSingleton = () =>
  new PrismaClient({
    log: ['info', 'warn', 'error'],
  });

const globalForPrisma = global;

/** @type {ReturnType<typeof prismaClientSingleton>} */
export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production')
  globalForPrisma.prisma = prisma;

export default prisma;
