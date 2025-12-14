// File: src/modules/town-planning/estate-transaction/presentation/validators/supported-prefecture.validator.ts

import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { EstateTransactionCatalog } from '../../infrastructure/estate-transaction.catalog';

@ValidatorConstraint({ name: 'SupportedPrefectureCode', async: false })
@Injectable()
export class SupportedPrefectureCodeValidator implements ValidatorConstraintInterface {
  constructor(private readonly catalog: EstateTransactionCatalog) {}

  validate(value: unknown): boolean {
    if (typeof value !== 'number') return false;
    if (!this.catalog.isSpecKantoPrefecture(value)) return false;
    return this.catalog.hasPrefectureCode(value);
  }

  defaultMessage(): string {
    return 'prefectureCode is not supported by the current dataset';
  }
}
