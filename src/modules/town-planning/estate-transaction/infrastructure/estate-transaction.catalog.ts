// File: src/modules/town-planning/estate-transaction/infrastructure/estate-transaction.catalog.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';

import {
  SPEC_ESTATE_TYPES,
  SPEC_PREFECTURE_CODES_KANTO,
  SPEC_YEAR_MAX,
  SPEC_YEAR_MIN,
} from '../domain/constraints';
import type { EstateType } from '../domain/estate-transaction.types';

type RawRecord = {
  year: number;
  prefectureCode: number;
  type: number;
  data: {
    result: {
      prefectureCode: string;
      prefectureName: string;
      type: string;
      years: Array<{ year: number; value: number }>;
    };
  };
};

export type EstateTransactionNormalized = {
  year: number;
  prefectureCode: number;
  prefectureName: string;
  type: EstateType;
  value: number;
};

@Injectable()
export class EstateTransactionCatalog implements OnModuleInit {
  private readonly jsonPathEnvKey = 'ESTATE_TRANSACTIONS_JSON_PATH' as const;

  private readonly years = new Set<number>();
  private readonly prefectureCodes = new Set<number>();
  private readonly types = new Set<EstateType>();
  private readonly index = new Map<string, EstateTransactionNormalized>();

  async onModuleInit(): Promise<void> {
    const filePath = this.resolveJsonPath();
    const json = await fs.readFile(filePath, 'utf-8');
    const parsed = JSON.parse(json) as unknown;
    if (!Array.isArray(parsed)) {
      throw new Error(`estate transactions json must be an array: ${filePath}`);
    }

    for (const item of parsed as RawRecord[]) {
      const normalized = this.normalize(item);
      const key = this.buildKey(
        normalized.prefectureCode,
        normalized.year,
        normalized.type,
      );
      if (this.index.has(key)) {
        throw new Error(`duplicate record: ${key}`);
      }
      this.index.set(key, normalized);

      this.years.add(normalized.year);
      this.prefectureCodes.add(normalized.prefectureCode);
      this.types.add(normalized.type);
    }
  }

  hasYear(year: number): boolean {
    return this.years.has(year);
  }

  hasPrefectureCode(prefectureCode: number): boolean {
    return this.prefectureCodes.has(prefectureCode);
  }

  hasType(type: number): boolean {
    if (!this.isSpecType(type)) return false;
    return this.types.has(type);
  }

  isSpecYearRange(year: number): boolean {
    return year >= SPEC_YEAR_MIN && year <= SPEC_YEAR_MAX;
  }

  isSpecType(type: number): type is EstateType {
    return (SPEC_ESTATE_TYPES as readonly number[]).includes(type);
  }

  isSpecKantoPrefecture(prefectureCode: number): boolean {
    return (SPEC_PREFECTURE_CODES_KANTO as readonly number[]).includes(
      prefectureCode,
    );
  }

  find(
    prefectureCode: number,
    year: number,
    type: number,
  ): EstateTransactionNormalized | null {
    const key = this.buildKey(prefectureCode, year, type);
    return this.index.get(key) ?? null;
  }

  private buildKey(prefectureCode: number, year: number, type: number): string {
    return `${prefectureCode}:${year}:${type}`;
  }

  private normalize(item: RawRecord): EstateTransactionNormalized {
    const year = item.year;
    const prefectureCode = item.prefectureCode;
    const type = item.type;

    const result = item.data?.result;
    const prefectureName = result?.prefectureName;
    const years = result?.years;
    const first = Array.isArray(years) ? years[0] : undefined;
    const value = first?.value;

    if (
      typeof year !== 'number' ||
      typeof prefectureCode !== 'number' ||
      typeof type !== 'number'
    ) {
      throw new Error(
        'invalid record: year/prefectureCode/type must be number',
      );
    }
    if (typeof prefectureName !== 'string' || prefectureName.length === 0) {
      throw new Error('invalid record: prefectureName is required');
    }
    if (typeof value !== 'number') {
      throw new Error('invalid record: value is required');
    }
    if (!this.isSpecType(type)) {
      throw new Error(
        `invalid record: type must be one of ${SPEC_ESTATE_TYPES.join(', ')}`,
      );
    }

    return {
      year,
      prefectureCode,
      prefectureName,
      type,
      value,
    };
  }

  private resolveJsonPath(): string {
    const configured = process.env[this.jsonPathEnvKey];
    if (configured && configured.trim().length > 0) {
      return path.resolve(process.cwd(), configured);
    }
    return path.resolve(process.cwd(), 'assets', 'estate_transactions.json');
  }
}
