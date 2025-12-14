// File: src/modules/town-planning/estate-transaction/domain/constraints.ts

/**
 * 目的
 * - 仕様として固定される制約値の唯一出自
 */

// API仕様として受け付ける年の範囲（入力レンジ）
export const SPEC_YEAR_MIN = 2009 as const;
export const SPEC_YEAR_MAX = 2021 as const;

// 取引価格の種別（仕様固定）
export const SPEC_ESTATE_TYPES = [1, 2] as const;

// 取引価格の種別ラベル（仕様固定）
export const SPEC_ESTATE_TYPE_LABELS = {
  1: '住宅地',
  2: '商業地',
} as const;

// 要件上「関東のみ」を課す場合の許可コード（仕様固定）
export const SPEC_PREFECTURE_CODES_KANTO = [8, 9, 10, 11, 12, 13, 14] as const;
