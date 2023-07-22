import * as bcrypt from 'bcrypt';
import ms from 'ms';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { AuthRefreshPayload, AuthResponse, SignTokenPayload } from './auth.interface';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';
import { RedisService } from '@app/redis';
@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<AuthResponse> {
    const { email, password, username } = signUpDto;

    const isExisted = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });

    if (isExisted) {
      throw new BadRequestException('Account is already existed');
    }
    const saltOrRounds = 7;
    const hashPassword = await bcrypt.hash(password, saltOrRounds);

    const newUser = await this.prismaService.user.create({
      data: {
        username,
        email,
        password: hashPassword,
      },
    });

    const userId = newUser.id;
    const payload = { userId };

    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken(payload),
      this.generateToken(payload, true),
    ]);

    const expiresInRefresh = this.configService.get<string>('jwt.expiresInRefresh');
    const expiresIn = Math.floor(ms(expiresInRefresh) / 1000);
    await this.redisService.set(`refresh_token:${userId}`, refreshToken, expiresIn);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signIn(signInDto: SignInDto): Promise<AuthResponse> {
    const { email, password } = signInDto;

    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Email or password is not correct');
    }

    const userId = user.id;
    const payload = { userId };

    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken(payload),
      this.generateToken(payload, true),
    ]);

    const expiresInRefresh = this.configService.get<string>('jwt.expiresInRefresh');
    const expiresIn = Math.floor(ms(expiresInRefresh) / 1000);
    await this.redisService.set(`refresh_token:${userId}`, refreshToken, expiresIn);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(token: AuthRefreshPayload): Promise<AuthResponse> {
    const { refreshToken } = token;
    const decoded = this.jwtService.decode(refreshToken);
    const { userId } = decoded as SignTokenPayload;

    const isExisted = await this.redisService.get(`refresh_token:${userId}`);

    if (!isExisted) {
      throw new UnauthorizedException('Refresh token is not valid');
    }

    const payload = { userId };
    const accessToken = await this.generateToken(payload);

    return {
      accessToken,
      refreshToken,
    };
  }

  async generateToken(payload: SignTokenPayload, isRefreshToken = false): Promise<string> {
    const secret = this.configService.get<string>('jwt.secret');
    const expiresIn = this.configService.get<string>('jwt.expiresIn');
    const secretRefresh = this.configService.get<string>('jwt.secretRefresh');
    const expiresInRefresh = this.configService.get<string>('jwt.expiresInRefresh');

    const options = {
      secret: isRefreshToken ? secretRefresh : secret,
      expiresIn: isRefreshToken ? expiresInRefresh : expiresIn,
    };

    return this.jwtService.signAsync(payload, options);
  }
}
