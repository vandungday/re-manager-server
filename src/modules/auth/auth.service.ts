import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { AuthResponse, SignTokenPayload } from './auth.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
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

    const payload = { userId: newUser.id };
    const accessToken = await this.generateAccessToken(payload);

    return {
      accessToken,
    };
  }

  async generateAccessToken(payload: SignTokenPayload): Promise<string> {
    const secret = this.configService.get<string>('jwt.secret');
    const expiresIn = this.configService.get<string>('jwt.expiresIn');

    const options = {
      secret,
      expiresIn,
    };

    return this.jwtService.signAsync(payload, options);
  }
}
