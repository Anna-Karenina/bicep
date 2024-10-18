import { Module } from '@nestjs/common';
import { TrainerModule } from './trainer/trainer.module';
import databaseConfig from './database/config/database.config';
import appConfig from './config/app.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import authConfig from './auth/config/auth.config';
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import fileConfig from './files/config/file.config';
import { FilesModule } from './files/files.module';
import { StudentModule } from './student/student.module';
import { GymModule } from './gym/gym.module';
import { WorkoutModule } from './workout/workout.module';
import { ExerciseModule } from './exercise/exercise.module';
import { ExerciseStepModule } from './exercise-step/exercise-step.module';
import mailConfig from './mail/config/mail.config';
import { AuthGoogleModule } from './auth-google/auth-google.module';
import googleConfig from './auth-google/config/google.config';
import { PushModule } from './push/push.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        appConfig,
        authConfig,
        fileConfig,
        mailConfig,
        googleConfig,
        // appleConfig,
      ],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    AuthModule,
    UsersModule,
    FilesModule,
    TrainerModule,
    StudentModule,
    GymModule,
    WorkoutModule,
    ExerciseModule,
    ExerciseStepModule,
    AuthGoogleModule,
    PushModule,
  ],
})
export class AppModule {}
