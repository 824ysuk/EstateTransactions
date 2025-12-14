// File: src/modules/town-planning/estate-transaction/estate-transaction.module.ts
import { Module } from '@nestjs/common';

import { EstateTransactionCatalog } from './infrastructure/estate-transaction.catalog';
import { EstateTransactionController } from './presentation/estate-transaction.controller';
import { SupportedPrefectureCodeValidator } from './presentation/validators/supported-prefecture.validator';
import { SupportedEstateTypeValidator } from './presentation/validators/supported-type.validator';
import { SupportedYearValidator } from './presentation/validators/supported-year.validator';

@Module({
  controllers: [EstateTransactionController],
  providers: [
    EstateTransactionCatalog,
    SupportedYearValidator,
    SupportedPrefectureCodeValidator,
    SupportedEstateTypeValidator,
  ],
})
export class EstateTransactionModule {}
