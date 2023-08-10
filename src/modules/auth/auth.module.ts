import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from '@app/redis';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './guard/jwt.guard';
import { AuthGuard } from './guard/auth.guard';

@Module({
  imports: [PrismaModule, ConfigModule, JwtModule, RedisModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtGuard,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
