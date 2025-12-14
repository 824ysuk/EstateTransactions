// File: src/modules/town-planning/estate-transaction/usecase/get-estate-transaction.usecase.spec.ts

import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { ESTATE_TRANSACTION_REPOSITORY } from '../domain/tokens';
import type { EstateTransactionRepository } from '../domain/estate-transaction.repository';
import type {
  EstateTransactionQuery,
  EstateTransactionResult,
} from '../domain/estate-transaction.types';
import { GetEstateTransactionUseCase } from './get-estate-transaction.usecase';

describe('GetEstateTransactionUseCase', () => {
  it('該当があれば結果を返す', async () => {
    const query: EstateTransactionQuery = {
      year: 2015,
      prefectureCode: 13,
      type: 1,
    };
    const result: EstateTransactionResult = {
      year: 2015,
      prefectureCode: 13,
      prefectureName: '東京都',
      type: 1,
      value: 324740,
    };

    const repo: EstateTransactionRepository = {
      findByKey(): Promise<EstateTransactionResult | null> {
        return Promise.resolve(result);
      },
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        GetEstateTransactionUseCase,
        { provide: ESTATE_TRANSACTION_REPOSITORY, useValue: repo },
      ],
    }).compile();

    const usecase = moduleRef.get(GetEstateTransactionUseCase);
    await expect(usecase.execute(query)).resolves.toEqual(result);
  });

  it('該当がなければ404を投げる', async () => {
    const query: EstateTransactionQuery = {
      year: 2015,
      prefectureCode: 13,
      type: 1,
    };

    const repo: EstateTransactionRepository = {
      findByKey(): Promise<EstateTransactionResult | null> {
        return Promise.resolve(null);
      },
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        GetEstateTransactionUseCase,
        { provide: ESTATE_TRANSACTION_REPOSITORY, useValue: repo },
      ],
    }).compile();

    const usecase = moduleRef.get(GetEstateTransactionUseCase);
    await expect(usecase.execute(query)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
