  
import { Injectable } from '@nestjs/common';

interface Supplier {
  id: string;
  company: string;
  products: string;
  location: string;
  quantity: string;
  price: number;
 
}

@Injectable()
export class SupplierService {
  private suppliers: Supplier[] = [];

  insertSupplier(
    company: string,
    products: string,
    location: string,
    quantity: string,
    price: number,
    
  ): string {
    const id = Math.random().toString(4).substring(7);
    const newSupplier: Supplier = {
      id,
      company,
      products,
      location,
      quantity,
      price,
      
    };
    this.suppliers.push(newSupplier);
    return id;
  }

  getSupplier(): Supplier[] {
    return this.suppliers;
  }

  getSingleSupplier(id: string): Supplier | null {
    return this.suppliers.find(supplier => supplier.id === id) || null;
  }

  updateSupplier(
    id: string,
    company: string,
    location: string,
    products: string,
    quantity: string,
    price: number,
    
  ): Supplier | null {
    const supplierIndex = this.suppliers.findIndex(supplier => supplier.id === id);
    if (supplierIndex === -1) {
      return null;
    }

    const updateSupplier: Supplier = {
      id,
      company,
      products,
      location,
      quantity,
      price,
       
    };
    this.suppliers[supplierIndex] = updateSupplier;
    return updateSupplier;
  }

  deleteSupplier(id: string): void {
    this.suppliers = this.suppliers.filter(supplier => supplier.id !== id);
  }
}
