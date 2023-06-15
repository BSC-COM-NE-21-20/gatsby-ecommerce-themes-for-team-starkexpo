import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
 import { CustomerService } from "./customer.service";
import { Customer } from "./customer.model";
 
@ApiTags('Customer Section')
@Controller('Customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiBody({
    description: 'User data',
    schema: {
      type: 'object',
      properties: {
        firstname: { type: 'string', example: 'Your first name', description: 'User regNo' },
        lastname: { type: 'string', example: 'lastname', description: 'User regNo' },
        location: { type: 'string', example: 'where do you stay?', description: 'User fname' },
      
      },
    },
  })
  addBuyer(
    @Body() body: Customer
  ) {
    const generatedId = this.customerService.insertBuyer(
      body.firstname,
      body.lastname,
      body.location,
      
    );

    return { id: generatedId};
  }

  @Get()
  getAllCustomer(): Customer[] {
    return this.customerService.getCustomer();
  }

  @Get(':id')
  getCustomer(@Param('id') userId: string): Customer | null {
    return this.customerService.getSingleCustomer(userId);
  }
  
  @Patch(':id')
  updateCustomer(
    @Param('id') userId: string,
    @Param('firstname') firstname: string,
    @Param('lastname') lastname: string,
    @Param('location') location: string,
    
    @Body() body: Customer
  ): Customer | null {
    const updateCustomer = this.customerService.updateCustomer(
      userId,
      firstname,
      lastname,
      location,
      
    );

    if (!updateCustomer) {
      return null;
    }

    return updateCustomer;
  }

  @Delete(':id')
  removeCustomer(@Param('id') userId: string) {
    this.customerService.deleteCustomer(userId);
    return null;
  }
}
