import { AppConfig } from './app-config.type';
import { DatabaseConfig } from 'src/database/config/database-config.type';
import { AuthConfig } from 'src/auth/config/auth-config.type';
import { FileConfig } from 'src/files/config/file-config.type';
// import { AppleConfig } from '../auth-apple/config/apple-config.type';
import { GoogleConfig } from '../auth-google/config/google-config.type';
import { MailConfig } from '../mail/config/mail-config.type';

export type AllConfigType = {
  app: AppConfig;
  database: DatabaseConfig;
  auth: AuthConfig;
  file: FileConfig;
  google: GoogleConfig;
  mail: MailConfig;
  // apple: AppleConfig;
};
