import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthRefreshPayload, AuthResponse } from './auth.interface';
import { SignInDto } from './dto/sign-in.dto';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(
    @Body()
    signUpDto: SignUpDto,
  ): Promise<AuthResponse> {
    return this.authService.signUp(signUpDto);
  }

  @Post('sign-in')
  async signIn(
    @Body()
    signInDto: SignInDto,
  ): Promise<AuthResponse> {
    return this.authService.signIn(signInDto);
  }

  @Post('refresh-token')
  async refreshToken(
    @Body()
    token: AuthRefreshPayload,
  ): Promise<AuthResponse> {
    return this.authService.refreshToken(token);
  }
}
