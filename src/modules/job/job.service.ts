import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Job } from '@prisma/client';

@Injectable()
export class JobService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createJobDto: CreateJobDto): Promise<Job> {
    return this.prismaService.job.create({ data: createJobDto });
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const jobs = await this.prismaService.job.findMany({
      skip,
      take: limit,
    });

    const total = jobs.length;
    const pages = Math.ceil(total / limit) || 1;

    return { jobs, total, page, pages, limit };
  }

  async findOne(id: number) {
    const job = await this.prismaService.job.findUnique({ where: { id } });

    if (!job) throw new NotFoundException('Job not found');

    return job;
  }

  async update(id: number, updateJobDto: UpdateJobDto) {
    const job = await this.prismaService.job.findUnique({ where: { id } });

    if (!job) throw new NotFoundException('Job not found');

    return this.prismaService.job.update({ where: { id }, data: updateJobDto });
  }

  async remove(id: number) {
    const job = await this.prismaService.job.findUnique({ where: { id } });

    if (!job) throw new NotFoundException('Job not found');

    return this.prismaService.job.delete({ where: { id } });
  }
}
