import { Module } from '@nestjs/common';
import { CustomerModule } from './users/customer.module';
import { DepartmentModule } from './comment/department.module';
      
@Module({
  imports: [CustomerModule, DepartmentModule],
  controllers: [],
  providers: [],
})

export class AppModule {}
