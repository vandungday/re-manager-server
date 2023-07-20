import pLimit from 'p-limit';
import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';

const prisma = new PrismaClient();
const logger = new Logger('SeedDatabase');
const limit = pLimit(2);

async function insertData() {
  try {
    const originPath = `${process.cwd()}/src/common/data`;
    const processes = readFileSync(`${originPath}/process.json`, 'utf-8');
    const jobs = readFileSync(`${originPath}/job.json`, 'utf-8');
    const candidates = readFileSync(`${originPath}/candidate.json`, 'utf-8');

    const pProcess = prisma.process.createMany({
      data: JSON.parse(processes),
      skipDuplicates: true,
    });

    const pJob = prisma.job.createMany({
      data: JSON.parse(jobs),
      skipDuplicates: true,
    });

    const pCandidate = prisma.candidate.createMany({
      data: JSON.parse(candidates),
      skipDuplicates: true,
    });

    const input = [
      limit(() => pProcess),
      limit(() => pJob),
      limit(() => pCandidate),
    ];
    await Promise.all(input);
  } catch (error) {
    logger.error('[SEED_DATABASE][INSERT][ERROR]', error);
    process.exit(1);
  } finally {
    logger.log('[SEED_DATABASE][INSERT] Done!]');
    await prisma.$disconnect();
  }
}

insertData();
