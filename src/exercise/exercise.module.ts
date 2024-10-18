import { Module } from '@nestjs/common';
import { ExerciseEntity } from './repository/entities/exercise.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';
import { ExerciseRepository } from './repository/repositories/exercise.repository';
import { FileEntity } from 'src/files/repository/entities/file.entity';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([ExerciseEntity]), FilesModule],
  controllers: [ExerciseController],
  providers: [ExerciseService,ExerciseRepository],
  exports: [ExerciseService, ExerciseRepository],
})
export class ExerciseModule {}
