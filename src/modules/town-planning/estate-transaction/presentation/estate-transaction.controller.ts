// File: src/modules/town-planning/estate-transaction/presentation/estate-transaction.controller.ts
import { Controller, Get, NotImplementedException } from '@nestjs/common';

@Controller('townPlanning/estateTransaction')
export class EstateTransactionController {
  @Get('bar')
  getBar(): never {
    throw new NotImplementedException('not_implemented');
  }
}
