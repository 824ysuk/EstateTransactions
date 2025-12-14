// File: src/modules/town-planning/town-planning.module.ts
import { Module } from '@nestjs/common';

import { EstateTransactionModule } from './estate-transaction/estate-transaction.module';

@Module({
  imports: [EstateTransactionModule],
})
export class TownPlanningModule {}
