import { Injectable } from '@nestjs/common';
import { EntityCondition } from 'src/_utils/types/entity-condition.type';
import { NullableType } from 'src/_utils/types/nullable.type';
import { FileRepository } from './repository/file.repository';
import { FileType } from './domain/file';

@Injectable()
export class FilesService {
  constructor(private readonly fileRepository: FileRepository) {}

  findOne(fields: EntityCondition<FileType>): Promise<NullableType<FileType>> {
    return this.fileRepository.findOne(fields);
  }
}
