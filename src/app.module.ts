import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerPinoModule } from './modules/logger/logger.module';
import { JobModule } from './modules/job/job.module';
import appConfig from './common/config/app.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'production' ? '.env' : '.dev.env',
      load: [appConfig],
    }),
    LoggerPinoModule,
    JobModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
