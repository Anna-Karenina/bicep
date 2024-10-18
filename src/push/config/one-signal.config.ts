import { registerAs } from '@nestjs/config';
import { IsString } from 'class-validator';
import validateConfig from 'src/_utils/validate-config';
import { OneSignalConfig } from './one-signal-config.type';

class EnvironmentVariablesValidator {
  @IsString()
  ONE_SIGNAL_APP_ID: string;
  @IsString()
  ONE_SIGNAL_SECRET: string;
  @IsString()
  ONE_SIGNAL_ENDPOINT: string;
}

export default registerAs<OneSignalConfig>('oneSignal', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);
  return {
    appId: process.env.ONE_SIGNAL_APP_ID,
    secret: process.env.ONE_SIGNAL_SECRET,
    endPoint: process.env.ONE_SIGNAL_ENDPOINT,
  };
});
