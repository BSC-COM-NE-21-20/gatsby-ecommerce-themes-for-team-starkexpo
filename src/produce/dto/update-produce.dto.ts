import { PartialType } from '@nestjs/swagger';
import { CreateProduceDto } from './create-produce.dto';

export class UpdateProduceDto extends PartialType(CreateProduceDto) {}
