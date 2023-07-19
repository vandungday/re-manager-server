import { Module } from '@nestjs/common';
import { ProcessOfCandidateService } from './process-of-candidate.service';
import { ProcessOfCandidateController } from './process-of-candidate.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProcessOfCandidateController],
  providers: [ProcessOfCandidateService],
})
export class ProcessOfCandidateModule {}
