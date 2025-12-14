// File: src/modules/town-planning/estate-transaction/estate-transaction.module.ts
import { Module } from '@nestjs/common';

import { ESTATE_TRANSACTION_REPOSITORY } from './domain/tokens';
import { EstateTransactionCatalog } from './infrastructure/estate-transaction.catalog';
import { EstateTransactionCatalogRepository } from './infrastructure/estate-transaction.catalog.repository';
import { EstateTransactionController } from './presentation/estate-transaction.controller';
import { SupportedPrefectureCodeValidator } from './presentation/validators/supported-prefecture.validator';
import { SupportedEstateTypeValidator } from './presentation/validators/supported-type.validator';
import { SupportedYearValidator } from './presentation/validators/supported-year.validator';
import { GetEstateTransactionUseCase } from './usecase/get-estate-transaction.usecase';

@Module({
  controllers: [EstateTransactionController],
  providers: [
    EstateTransactionCatalog,
    GetEstateTransactionUseCase,
    {
      provide: ESTATE_TRANSACTION_REPOSITORY,
      useClass: EstateTransactionCatalogRepository,
    },
    SupportedYearValidator,
    SupportedPrefectureCodeValidator,
    SupportedEstateTypeValidator,
  ],
})
export class EstateTransactionModule {}
