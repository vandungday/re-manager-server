import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Candidate } from '@prisma/client';

@Injectable()
export class CandidateService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCandidateDto: CreateCandidateDto): Promise<Candidate> {
    const { jobId, email, source } = createCandidateDto;

    const job = await this.prismaService.job.findUnique({
      where: { id: jobId },
    });

    if (!job) throw new NotFoundException('Job not found');

    const candidate = await this.prismaService.candidate.findFirst({
      where: {
        email,
        jobId,
        source,
      },
    });

    if (candidate && candidate.source === 'WEB_FORM' && source === 'WEB_FORM') {
      return this.prismaService.candidate.update({
        where: { id: candidate.id },
        data: createCandidateDto,
      });
    }

    if (candidate) {
      throw new NotFoundException(`Candidate already exists with job ${job.title} and source ${source}`);
    }

    return this.prismaService.candidate.create({
      data: createCandidateDto,
    });
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const candidates = await this.prismaService.candidate.findMany({
      skip,
      take: limit,
    });

    const total = candidates.length;
    const pages = Math.ceil(total / limit) || 1;

    return { candidates, total, page, pages, limit };
  }

  async findOne(id: number) {
    const candidate = await this.prismaService.candidate.findUnique({
      where: { id },
    });

    if (!candidate) throw new NotFoundException('Candidate not found');

    return candidate;
  }

  async update(id: number, updateCandidateDto: UpdateCandidateDto) {
    const candidate = await this.prismaService.candidate.findUnique({
      where: { id },
    });

    if (!candidate) throw new NotFoundException('Candidate not found');

    return this.prismaService.candidate.update({
      where: { id },
      data: updateCandidateDto,
    });
  }

  async remove(id: number) {
    const candidate = await this.prismaService.candidate.findUnique({
      where: { id },
    });

    if (!candidate) throw new NotFoundException('Candidate not found');

    return this.prismaService.candidate.delete({ where: { id } });
  }
}
