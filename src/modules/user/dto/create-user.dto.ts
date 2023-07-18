import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  phone?: string;

  @IsEnum(['ADMIN', 'USER', 'LEADER'])
  role?: RoleUser;
}

enum RoleUser {
  ADMIN = 'ADMIN',
  USER = 'USER',
  LEADER = 'LEADER',
}
