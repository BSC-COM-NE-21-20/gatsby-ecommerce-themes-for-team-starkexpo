import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Supplier } from "./entities/supplier.model";
import { SupplierService } from "./supplier.service";
   
@ApiTags('Suppilers Section')
@Controller('Suppliers')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  @ApiBody({
    description: 'User data',
    schema: {
      type: 'object',
      properties: {
        company: { type: 'string', example: 'Stark Exposition', description: 'User regNo' },
        products: { type: 'string', example: 'Sweet Potatoes', description: 'User fname' },
        location: { type: 'string', example: 'Lilongwe', description: 'User fname' },
        quantity: { type: 'string', example: '25kgs', description: 'User fname' },
        price: { type: 'number', example: 2500, description: 'User fname' },
      },
    },
  })
  addSupplier(
    @Body() body: Supplier
  ) {
    const generatedId = this.supplierService.insertSupplier(
      body.company,
      body.products,
      body.location,
      body.quantity,
      body.price,
      
    );

    return { id: generatedId};
  }

  @Get()
  getAllSuppliers(): Supplier[] {
    return this.supplierService.getSupplier();
  }

  @Get(':id')
  getSupplier(@Param('id') userId: string): Supplier | null {
    return this.supplierService.getSingleSupplier(userId);
  }
  
  @Patch(':id')
  updateSupplier(
    @Param('id') userId: string,
    @Param('company') company: string,
    @Param('location') location: string,
    @Param('products') products: string,
    @Param('quantity') quantity: string,
    @Param('price') price: number,
    
    @Body() body: Supplier
  ): Supplier | null {
    const updatedSupplier = this.supplierService.updateSupplier(
      userId,
      company,
      location,
      products,
      quantity,
      price,
      
    );

    if (!updatedSupplier) {
      return null;
    }

    return updatedSupplier;
  }

  @Delete(':id')
  removeSupplier(@Param('id') userId: string) {
    this.supplierService.deleteSupplier(userId);
    return null;
  }
}
