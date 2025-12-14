// File: src/modules/town-planning/estate-transaction/presentation/estate-transaction.controller.ts
import {
  Controller,
  Get,
  NotImplementedException,
  Query,
} from '@nestjs/common';

import { GetEstateTransactionQueryDto } from './dto/get-estate-transaction.query';

@Controller('townPlanning/estateTransaction')
export class EstateTransactionController {
  @Get('bar')
  getBar(@Query() query: GetEstateTransactionQueryDto): never {
    void query;
    throw new NotImplementedException('not_implemented');
  }
}
