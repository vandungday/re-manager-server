import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  DefaultValuePipe,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ProcessOfCandidateService } from './process-of-candidate.service';
import { CreateProcessOfCandidateDto } from './dto/create-process-of-candidate.dto';
import { ProcessOfCandidate } from '@prisma/client';
import { UpdateProcessOfCandidateDto } from './dto/update-process-of-candidate.dto';

@Controller('/api/v1/process-of-candidates')
export class ProcessOfCandidateController {
  constructor(
    private readonly processOfCandidateService: ProcessOfCandidateService,
  ) {}

  @Post()
  create(
    @Body() createProcessOfCandidateDto: CreateProcessOfCandidateDto,
  ): Promise<ProcessOfCandidate> {
    return this.processOfCandidateService.create(createProcessOfCandidateDto);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Query('limit', new DefaultValuePipe(10)) limit: number,
  ) {
    return this.processOfCandidateService.findAll(page, limit);
  }

  @Get(':processId/candidate/:candidateId')
  findOne(
    @Param('processId') processId: number,
    @Param('candidateId') candidateId: number,
  ) {
    return this.processOfCandidateService.findOne(processId, candidateId);
  }

  @Patch(':processId/candidate/:candidateId')
  update(
    @Param('processId') processId: number,
    @Param('candidateId') candidateId: number,
    @Body() updateProcessOfCandidateDto: UpdateProcessOfCandidateDto,
  ) {
    return this.processOfCandidateService.update(
      processId,
      candidateId,
      updateProcessOfCandidateDto,
    );
  }

  @Delete(':processId/candidate/:candidateId')
  @HttpCode(204)
  delete(
    @Param('processId') processId: number,
    @Param('candidateId') candidateId: number,
  ) {
    return this.processOfCandidateService.delete(processId, candidateId);
  }
}
