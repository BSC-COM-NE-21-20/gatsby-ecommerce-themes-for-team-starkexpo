import { Module } from '@nestjs/common';
import { ProduceService } from './produce.service';
import { ProduceController } from './produce.controller';

@Module({
  controllers: [ProduceController],
  providers: [ProduceService]
})
export class ProduceModule {}
