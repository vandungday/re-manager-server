import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCandidateDto {
  @IsNumber()
  @IsNotEmpty()
  jobId: number;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  linkCV: string;

  @IsEnum(['WEB_FORM', 'TOP_CV', 'IT_VIEC', 'FACEBOOK', 'LINKEDIN', 'OTHER'])
  @IsNotEmpty()
  source: Source;

  @IsNumber()
  @IsOptional()
  yearOfExperience?: number;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  preferredOffer?: number;

  @IsString()
  @IsOptional()
  referrer?: string;
}
enum Source {
  WEB_FORM = 'WEB_FORM',
  TOP_CV = 'TOP_CV',
  IT_VIEC = 'IT_VIEC',
  FACEBOOK = 'FACEBOOK',
  LINKEDIN = 'LINKEDIN',
  OTHER = 'OTHER',
}
