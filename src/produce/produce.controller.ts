import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ProduceService } from "./produce.service";
import { Produce } from "./entities/produce.model";
 
@ApiTags('Produce Section')
@Controller('Produces')
export class ProduceController {
  constructor(private readonly produceService: ProduceService) {}

  @Post()
  @ApiBody({
    description: 'User data',
    schema: {
      type: 'object',
      properties: {
        producename: { type: 'string', example: 'bed-com', description: 'User regNo' },
        quantity: { type: 'number', example: 25, description: 'User regNo' },
        price: { type: 'string', example: 5500, description: 'User regNo' },
        owner: { type: 'string', example: 'Wilious Kayira', description: 'User regNo' },
        location: { type: 'string', example: 'Rumphi', description: 'User fname' },
      
      },
    },
  })
  addProduce(
    @Body() body: Produce
  ) {
    const generatedId = this.produceService.insertProduce(
      body.producename,
      body.quantity, 
      body.price,
      body.owner,
      body.location,
      
    );

    return { id: generatedId};
  }

  @Get()
  getAllBuyers(): Produce[] {
    return this.produceService.getProduce();
  }

  @Get(':id')
  getProduce(@Param('id') userId: string): Produce | null {
    return this.produceService.getSingleProduce(userId);
  }
  
  @Patch(':id')
  updateProduce(
    @Param('id') userId: string,
    @Param('producename') producename: string,
    @Param('quantity') quantity: number,
    @Param('price') price: number,
    @Param('owner') owner: string,
    @Param('location') location: string,
    
    @Body() body: Produce
  ): Produce | null {
    const updateProduce = this.produceService.updateProduce(
      userId,
      producename,
      quantity,
      price,
      owner,
      location,
      
    );

    if (!updateProduce) {
      return null;
    }

    return updateProduce;
  }

  @Delete(':id')
  removeProduce(@Param('id') userId: string) {
    this.produceService.deleteProduce(userId);
    return null;
  }
}
