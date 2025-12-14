// File: src/modules/town-planning/estate-transaction/presentation/dto/get-estate-transaction.query.ts
import { Type } from 'class-transformer';
import { IsInt, Validate } from 'class-validator';

import type { EstateType } from '../../domain/estate-transaction.types';
import { SupportedPrefectureCodeValidator } from '../validators/supported-prefecture.validator';
import { SupportedEstateTypeValidator } from '../validators/supported-type.validator';
import { SupportedYearValidator } from '../validators/supported-year.validator';

export class GetEstateTransactionQueryDto {
  @Type(() => Number)
  @IsInt()
  @Validate(SupportedYearValidator)
  year!: number;

  @Type(() => Number)
  @IsInt()
  @Validate(SupportedPrefectureCodeValidator)
  prefectureCode!: number;

  @Type(() => Number)
  @IsInt()
  @Validate(SupportedEstateTypeValidator)
  type!: EstateType;
}
