// File: src/modules/town-planning/estate-transaction/domain/estate-transaction.repository.ts

import type {
  EstateTransactionQuery,
  EstateTransactionResult,
} from './estate-transaction.types';

export interface EstateTransactionRepository {
  findByKey(
    params: EstateTransactionQuery,
  ): Promise<EstateTransactionResult | null>;
}
