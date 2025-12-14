// File: src/modules/town-planning/estate-transaction/presentation/estate-transaction.controller.ts
import { Controller, Get, Query } from '@nestjs/common';

import { GetEstateTransactionQueryDto } from './dto/get-estate-transaction.query';
import { GetEstateTransactionUseCase } from '../usecase/get-estate-transaction.usecase';
import type { EstateTransactionResult } from '../domain/estate-transaction.types';

@Controller('townPlanning/estateTransaction')
export class EstateTransactionController {
  constructor(
    private readonly getEstateTransactionUseCase: GetEstateTransactionUseCase,
  ) {}

  @Get('bar')
  async getBar(
    @Query() query: GetEstateTransactionQueryDto,
  ): Promise<EstateTransactionResult> {
    return await this.getEstateTransactionUseCase.execute({
      year: query.year,
      prefectureCode: query.prefectureCode,
      type: query.type,
    });
  }
}
