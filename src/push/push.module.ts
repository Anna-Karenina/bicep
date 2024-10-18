import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PushService } from './push.service';
import { OneSignalModule } from 'onesignal-api-client-nest';

@Module({
  imports: [
    OneSignalModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          appId: configService.get('oneSignal.appId', { infer: true }),
          restApiKey: configService.get('oneSignal.secret', { infer: true }),
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [PushService],
  exports: [PushService],
})
export class PushModule {}
