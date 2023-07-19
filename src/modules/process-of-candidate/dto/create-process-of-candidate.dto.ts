import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProcessOfCandidateDto {
  @IsNumber()
  @IsNotEmpty()
  processId: number;

  @IsNumber()
  @IsNotEmpty()
  candidateId: number;

  @IsNumber()
  @IsOptional()
  userId?: number;

  @IsString()
  @IsOptional()
  note?: string;

  @IsString()
  @IsOptional()
  exam?: string;

  @IsNumber()
  @IsOptional()
  score?: number;
}
