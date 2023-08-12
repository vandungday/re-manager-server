import { Controller, Get, Post, Body, Patch, Param, Delete, DefaultValuePipe, Query, HttpCode } from '@nestjs/common';
import { ProcessService } from './process.service';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';
import { Process } from '@prisma/client';

@Controller('/api/v1/processes')
export class ProcessController {
  constructor(private readonly processService: ProcessService) {}

  @Post()
  create(@Body() createProcessDto: CreateProcessDto): Promise<Process> {
    return this.processService.create(createProcessDto);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Query('limit', new DefaultValuePipe(10)) limit: number,
  ) {
    return this.processService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Process> {
    return this.processService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProcessDto: UpdateProcessDto): Promise<Process> {
    return this.processService.update(id, updateProcessDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: number) {
    return this.processService.remove(id);
  }
}
