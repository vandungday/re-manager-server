import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import appConfig from './common/config/app.configuration';
import { LoggerPinoModule } from './modules/logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'production' ? '.env' : '.dev.env',
      load: [appConfig],
    }),
    LoggerPinoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
