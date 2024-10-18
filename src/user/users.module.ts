import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { FilesModule } from 'src/files/files.module';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './repository/entities/user.entity';
import { UsersRepository } from './repository/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), FilesModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
