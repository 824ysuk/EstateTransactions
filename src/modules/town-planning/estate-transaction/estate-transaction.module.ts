// File: src/modules/town-planning/estate-transaction/estate-transaction.module.ts
import { Module } from '@nestjs/common';

import { EstateTransactionController } from './presentation/estate-transaction.controller';

@Module({
  controllers: [EstateTransactionController],
  providers: [],
})
export class EstateTransactionModule {}
