import { HttpModule, Module } from '@nestjs/common';
import { FileModule } from 'src/file/file.module';
import { HttpConfigService } from './http.config.service';
import { InsightWorkerService } from './insight-worker.service';
import { InsightController } from './insight.controller';
import { InsightService } from './insight.service';

@Module({
  imports: [
    FileModule,
    HttpModule.registerAsync({ useClass: HttpConfigService }),
  ],
  providers: [InsightService, InsightWorkerService],
  controllers: [InsightController],
})
export class InsightModule {}