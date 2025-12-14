// File: src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TownPlanningModule } from './modules/town-planning/town-planning.module';

@Module({
  imports: [TownPlanningModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
