import { Inject, Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { Request } from 'express';
import GridFsStorage from 'multer-gridfs-storage';
import { DATABASE_CONNECTION } from '../database/constants/database.constant';
import { FileRequestType } from './@interfaces/file.request.interface';

Injectable();
export class GridFsMulterConfigService implements MulterOptionsFactory {
  gridFsStorage: GridFsStorage;
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: any) {
    this.gridFsStorage = new GridFsStorage({
      db: this.db,
      file: (_req: Request, file: FileRequestType) => {
        return file.originalname;
      },
    });
  }

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: this.gridFsStorage,
    };
  }
}
