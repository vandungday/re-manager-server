import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProcessOfCandidateDto } from './dto/create-process-of-candidate.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ProcessOfCandidate } from '@prisma/client';
import { UpdateProcessOfCandidateDto } from './dto/update-process-of-candidate.dto';

@Injectable()
export class ProcessOfCandidateService {
  constructor(private readonly prismaService: PrismaService) {}

  private async _validate(processId: number, candidateId: number) {
    const pProcess = this.prismaService.process.findUnique({
      where: { id: processId },
    });

    const pCandidate = this.prismaService.candidate.findUnique({
      where: { id: candidateId },
    });

    const [process, candidate] = await Promise.all([pProcess, pCandidate]);

    if (!process || !candidate) {
      throw new NotFoundException('Process or candidate not found');
    }
  }

  async create(
    createProcessOfCandidateDto: CreateProcessOfCandidateDto,
  ): Promise<ProcessOfCandidate> {
    const { processId, candidateId } = createProcessOfCandidateDto;
    await this._validate(processId, candidateId);

    const isExisted = await this.prismaService.processOfCandidate.findUnique({
      where: { processId_candidateId: { processId, candidateId } },
    });

    if (isExisted) {
      throw new BadRequestException('Process of candidate is existed');
    }

    return this.prismaService.processOfCandidate.create({
      data: createProcessOfCandidateDto,
    });
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const processOfCandidates =
      await this.prismaService.processOfCandidate.findMany({
        skip,
        take: limit,
      });

    const total = processOfCandidates.length;
    const pages = Math.ceil(total / limit) || 1;

    return {
      process_of_candidates: processOfCandidates,
      total,
      page,
      pages,
      limit,
    };
  }

  async findOne(processId: number, candidateId: number) {
    await this._validate(processId, candidateId);

    const processOfCandidate =
      await this.prismaService.processOfCandidate.findUnique({
        where: { processId_candidateId: { processId, candidateId } },
      });

    if (!processOfCandidate) {
      throw new NotFoundException('Process of candidate not found');
    }

    return processOfCandidate;
  }

  async update(
    processId: number,
    candidateId: number,
    updateProcessOfCandidateDto: UpdateProcessOfCandidateDto,
  ) {
    await this._validate(processId, candidateId);

    const processOfCandidate =
      await this.prismaService.processOfCandidate.findUnique({
        where: { processId_candidateId: { processId, candidateId } },
      });

    if (!processOfCandidate) {
      throw new NotFoundException('Process of candidate not found');
    }

    const {
      processId: pId,
      candidateId: cId,
      ...data
    } = updateProcessOfCandidateDto;

    return this.prismaService.processOfCandidate.update({
      where: { processId_candidateId: { processId, candidateId } },
      data,
    });
  }

  async delete(processId: number, candidateId: number) {
    await this._validate(processId, candidateId);

    const processOfCandidate =
      await this.prismaService.processOfCandidate.findUnique({
        where: { processId_candidateId: { processId, candidateId } },
      });

    if (!processOfCandidate) {
      throw new NotFoundException('Process of candidate not found');
    }

    return this.prismaService.processOfCandidate.delete({
      where: { processId_candidateId: { processId, candidateId } },
    });
  }
}
