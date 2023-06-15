import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { LocationService } from "./location.service";
import { Location } from "./entities/location.model";

@ApiTags('Location Section')
@Controller('Locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @ApiBody({
    description: 'User data',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: '', description: 'User regNo' },
        district: { type: 'string', example: '', description: 'User regNo' },
        country: { type: 'string', example: '', description: 'User regNo' },
       
      },
    },
  })
  addLocation(
    @Body() body: Location
  ) {
    const generatedId = this.locationService.insertLocation(
      body.name,
      body.district, 
      body.country,
     
      
    );

    return { id: generatedId};
  }

  @Get()
  getAllLocation(): Location[] {
    return this.locationService.getLocation();
  }

  @Get(':id')
  getLocation(@Param('id') userId: string): Location | null {
    return this.locationService.getSingleLocation(userId);
  }
  
  @Patch(':id')
  updateLocation(
    @Param('id') userId: string,
    @Param('name') name: string,
    @Param('district') district: string,
    @Param('country') country: string,
   
    @Body() body: Location
  ): Location | null {
    const updateLocation = this.locationService.updateLocation(
      userId,
      name,
      district,
      country,
   
      
    );

    if (!updateLocation) {
      return null;
    }

    return updateLocation;
  }

  @Delete(':id')
  removeLocation(@Param('id') userId: string) {
    this.locationService.deleteLocation(userId);
    return null;
  }
}
