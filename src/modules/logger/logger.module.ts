import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: process.env.NODE_ENV !== 'production',
            levelFirst: true,
            translateTime: 'SYS:dd/mm/yyyy HH:MM:ss',
            singleLine: true,
            ignore: 'pid,hostname',
            customColors: 'err:red,info:green,warn:yellow',
          },
        },
      },
      forRoutes: [],
      renameContext: 'context',
    }),
  ],
})
export class LoggerPinoModule {}
