import { Global, Module } from '@nestjs/common';

import { FilesService } from './files.service';
import fileConfig from './config/file.config';
import { FileConfig, FileDriver } from './config/file-config.type';

import { RelationalFilePersistenceModule } from './repository/relational-persistence.module';
import { FilesS3PresignedModule } from './repository/uploader/s3-presigned/files.module';
import { FilesLocalModule } from './repository/uploader/local/files.module';
import { FilesS3Module } from './repository/uploader/s3/files.module';

const infrastructureUploaderModule = () => {
  switch ((fileConfig() as FileConfig).driver) {
    case FileDriver.LOCAL:
      return FilesLocalModule;
    case FileDriver.S3:
      return FilesS3Module;
    case FileDriver.S3_PRESIGNED:
      return FilesS3PresignedModule;
  }
};
@Module({
  imports: [RelationalFilePersistenceModule, infrastructureUploaderModule()],
  providers: [FilesService],
  exports: [FilesService, RelationalFilePersistenceModule],
})
export class FilesModule {}
