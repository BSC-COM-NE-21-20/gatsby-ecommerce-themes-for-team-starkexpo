   
import { Injectable } from '@nestjs/common';

interface Location {
  id: string;
  name: string;
  district: string;
  country: string;
 
}

@Injectable()
export class LocationService {
  private locations: Location[] = [];

  insertLocation(
    name: string,
    district: string,
    country: string,
    
    
  ): string {
    const id = Math.random().toString(4).substring(7);
    const newLocation: Location = {
      id,
      name,
      district,
      country,
     
      
    };
    this.locations.push(newLocation);
    return id;
  }

  getLocation(): Location[] {
    return this.locations;
  }

  getSingleLocation(id: string): Location | null {
    return this.locations.find(location => location.id === id) || null;
  }

  updateLocation(
    id: string,
    name: string,
    district: string,
    country: string,
   
    
  ): Location | null {
    const locationIndex = this.locations.findIndex(location => location.id === id);
    if (locationIndex === -1) {
      return null;
    }

    const updateLocation: Location = {
      id,
      name,
      district,
      country,
     
       
    };
    this.locations[locationIndex] = updateLocation;
    return updateLocation;
  }

  deleteLocation(id: string): void {
    this.locations = this.locations.filter(location => location.id !== id);
  }
}
