import { PartialType } from '@nestjs/mapped-types';
import { CreateProcessOfCandidateDto } from './create-process-of-candidate.dto';

export class UpdateProcessOfCandidateDto extends PartialType(
  CreateProcessOfCandidateDto,
) {}
