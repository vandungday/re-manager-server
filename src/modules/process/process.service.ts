import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Process } from '@prisma/client';

@Injectable()
export class ProcessService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createProcessDto: CreateProcessDto): Promise<Process> {
    return this.prismaService.process.create({ data: createProcessDto });
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const processes = await this.prismaService.process.findMany({
      skip,
      take: limit,
    });

    const total = processes.length;
    const pages = Math.ceil(total / limit) || 1;

    return { processes, total, page, pages, limit };
  }

  async findOne(id: number) {
    const process = await this.prismaService.process.findUnique({
      where: { id },
    });

    if (!process) throw new NotFoundException('Process not found');

    return process;
  }

  async update(id: number, updateProcessDto: UpdateProcessDto) {
    const process = await this.prismaService.process.findUnique({
      where: { id },
    });

    if (!process) throw new NotFoundException('Process not found');

    return this.prismaService.process.update({
      where: { id },
      data: updateProcessDto,
    });
  }

  async remove(id: number) {
    const process = await this.prismaService.process.findUnique({
      where: { id },
    });

    if (!process) throw new NotFoundException('Process not found');

    return this.prismaService.process.delete({ where: { id } });
  }
}
