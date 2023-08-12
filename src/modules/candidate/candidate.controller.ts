import { Controller, Get, Post, Body, Patch, Param, Delete, DefaultValuePipe, Query, HttpCode } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { Candidate } from '@prisma/client';

@Controller('api/v1/candidates')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Post()
  create(@Body() createCandidateDto: CreateCandidateDto): Promise<Candidate> {
    return this.candidateService.create(createCandidateDto);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Query('limit', new DefaultValuePipe(10)) limit: number,
  ) {
    return this.candidateService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Candidate> {
    return this.candidateService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCandidateDto: UpdateCandidateDto): Promise<Candidate> {
    return this.candidateService.update(id, updateCandidateDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: number) {
    return this.candidateService.remove(id);
  }
}
