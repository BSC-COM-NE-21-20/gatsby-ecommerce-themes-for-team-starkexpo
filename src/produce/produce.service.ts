  
import { Injectable } from '@nestjs/common';

interface Produce {
  id: string;
  producename: string;
  quantity: number;
  price: number;
  owner: string;
  location: string;
 
}

@Injectable()
export class ProduceService {
  private produces: Produce[] = [];

  insertProduce(
    producename: string,
    quantity: number,
    price: number,
    owner: string,
    location: string,
    
  ): string {
    const id = Math.random().toString(4).substring(7);
    const newProduce: Produce = {
      id,
      producename,
      quantity,
      price,
      owner,
      location,
      
    };
    this.produces.push(newProduce);
    return id;
  }

  getProduce(): Produce[] {
    return this.produces;
  }

  getSingleProduce(id: string): Produce | null {
    return this.produces.find(produce => produce.id === id) || null;
  }

  updateProduce(
    id: string,
    producename: string,
    quantity: number,
    price: number,
    owner: string,
    location: string,
    
  ): Produce | null {
    const produceIndex = this.produces.findIndex(produce => produce.id === id);
    if (produceIndex === -1) {
      return null;
    }

    const updateProduce: Produce = {
      id,
      producename,
      quantity,
      price,
      owner,
      location,
       
    };
    this.produces[produceIndex] = updateProduce;
    return updateProduce;
  }

  deleteProduce(id: string): void {
    this.produces = this.produces.filter(produce => produce.id !== id);
  }
}
