import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthRefreshPayload, AuthResponse } from './auth.interface';
import { SignInDto } from './dto/sign-in.dto';
import { AuthType } from '@/common/enums/auth.enum';
import { Auth } from '@/common/decorator/auth.decorator';
import { AuthUser } from '@/common/decorator/user.decorator';
import { UserWithoutPassword } from '@/common/types';
import { User } from '@prisma/client';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @Auth(AuthType.Public)
  async signUp(
    @Body()
    signUpDto: SignUpDto,
  ): Promise<AuthResponse> {
    return this.authService.signUp(signUpDto);
  }

  @Post('sign-in')
  @Auth(AuthType.Public)
  async signIn(
    @Body()
    signInDto: SignInDto,
  ): Promise<AuthResponse> {
    return this.authService.signIn(signInDto);
  }

  @Post('refresh-token')
  @Auth(AuthType.Public)
  async refreshToken(
    @Body()
    token: AuthRefreshPayload,
  ): Promise<AuthResponse> {
    return this.authService.refreshToken(token);
  }

  @Get('me')
  getMe(@AuthUser() user: User): UserWithoutPassword {
    return this.authService.getMe(user);
  }
}
