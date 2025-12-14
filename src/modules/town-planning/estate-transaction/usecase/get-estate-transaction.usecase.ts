// File: src/modules/town-planning/estate-transaction/usecase/get-estate-transaction.usecase.ts

import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import type { EstateTransactionRepository } from '../domain/estate-transaction.repository';
import type {
  EstateTransactionQuery,
  EstateTransactionResult,
} from '../domain/estate-transaction.types';
import { ESTATE_TRANSACTION_REPOSITORY } from '../domain/tokens';

@Injectable()
export class GetEstateTransactionUseCase {
  constructor(
    @Inject(ESTATE_TRANSACTION_REPOSITORY)
    private readonly repository: EstateTransactionRepository,
  ) {}

  async execute(
    params: EstateTransactionQuery,
  ): Promise<EstateTransactionResult> {
    const result = await this.repository.findByKey(params);
    if (result === null) {
      throw new NotFoundException('not_found');
    }
    return result;
  }
}
