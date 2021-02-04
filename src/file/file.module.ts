import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from './../config/config.module';
import { DatabaseModule } from './../database/database.module';
import { databaseProviders } from './../database/database.provider';
import { FileStoreService } from './file-store.service';
import { GridFsMulterConfigService } from './file.config';
import { FileController } from './file.controller';
import { fileProviders } from './file.providers';
import { FileResolver } from './file.resolver';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    MulterModule.registerAsync({
      imports: [DatabaseModule],
      useClass: GridFsMulterConfigService,
      inject: [...databaseProviders],
    }),
  ],
  controllers: [FileController],
  providers: [
    FileStoreService,
    FileResolver,
    ...databaseProviders,
    ...fileProviders,
  ],
})
export class FileModule {}
