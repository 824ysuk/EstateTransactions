// File: src/modules/town-planning/estate-transaction/infrastructure/estate-transaction.catalog.repository.ts

import { Injectable } from '@nestjs/common';

import type { EstateTransactionRepository } from '../domain/estate-transaction.repository';
import type {
  EstateTransactionQuery,
  EstateTransactionResult,
} from '../domain/estate-transaction.types';
import { EstateTransactionCatalog } from './estate-transaction.catalog';

@Injectable()
export class EstateTransactionCatalogRepository implements EstateTransactionRepository {
  constructor(private readonly catalog: EstateTransactionCatalog) {}

  findByKey(
    params: EstateTransactionQuery,
  ): Promise<EstateTransactionResult | null> {
    const found = this.catalog.find(
      params.prefectureCode,
      params.year,
      params.type,
    );
    if (found === null) return Promise.resolve(null);
    return Promise.resolve({
      year: found.year,
      prefectureCode: found.prefectureCode,
      prefectureName: found.prefectureName,
      type: found.type,
      value: found.value,
    });
  }
}
