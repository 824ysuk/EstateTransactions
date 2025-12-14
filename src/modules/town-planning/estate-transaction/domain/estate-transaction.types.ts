// File: src/modules/town-planning/estate-transaction/domain/estate-transaction.types.ts

import { SPEC_ESTATE_TYPES } from './constraints';

export type EstateType = (typeof SPEC_ESTATE_TYPES)[number];

export type EstateTransactionQuery = {
  year: number;
  prefectureCode: number;
  type: EstateType;
};

export type EstateTransactionResult = {
  year: number;
  prefectureCode: number;
  prefectureName: string;
  type: EstateType;
  value: number;
};
