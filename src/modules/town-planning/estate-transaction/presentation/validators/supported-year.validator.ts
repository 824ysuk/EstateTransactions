// File: src/modules/town-planning/estate-transaction/presentation/validators/supported-year.validator.ts

import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { EstateTransactionCatalog } from '../../infrastructure/estate-transaction.catalog';

@ValidatorConstraint({ name: 'SupportedYear', async: false })
@Injectable()
export class SupportedYearValidator implements ValidatorConstraintInterface {
  constructor(private readonly catalog: EstateTransactionCatalog) {}

  validate(value: unknown): boolean {
    if (typeof value !== 'number') return false;
    if (!this.catalog.isSpecYearRange(value)) return false;
    return this.catalog.hasYear(value);
  }

  defaultMessage(): string {
    return 'year is not supported by the current dataset';
  }
}
