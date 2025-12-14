// File: src/modules/town-planning/estate-transaction/presentation/validators/supported-type.validator.ts

import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { EstateTransactionCatalog } from '../../infrastructure/estate-transaction.catalog';

@ValidatorConstraint({ name: 'SupportedEstateType', async: false })
@Injectable()
export class SupportedEstateTypeValidator implements ValidatorConstraintInterface {
  constructor(private readonly catalog: EstateTransactionCatalog) {}

  validate(value: unknown): boolean {
    if (typeof value !== 'number') return false;
    if (!this.catalog.isSpecType(value)) return false;
    return this.catalog.hasType(value);
  }

  defaultMessage(): string {
    return 'type is not supported by the current dataset';
  }
}
