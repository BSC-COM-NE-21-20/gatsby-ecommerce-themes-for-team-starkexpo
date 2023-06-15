 
import { Injectable } from '@nestjs/common';
 
interface Customer {
  id: string;
  firstname: string;
  lastname: string;
  location: string;
 
}

@Injectable()
export class CustomerService {
  private customers: Customer[] = [];

  insertBuyer(
    firstname: string,
    lastname: string,
    location: string,
    
  ): string {
    const id = Math.random().toString(4).substring(7);
    const newCustomer: Customer = {
      id,
      firstname,
      lastname,
      location,
      
    };
    this.customers.push(newCustomer);
    return id;
  }

  getCustomer(): Customer[] {
    return this.customers;
  }

  getSingleCustomer(id: string): Customer | null {
    return this.customers.find(customer => customer.id === id) || null;
  }

  updateCustomer(
    id: string,
    firstname: string,
    lastname: string,
    location: string,
    
  ): Customer | null {
    const customerIndex = this.customers.findIndex(customer => customer.id === id);
    if (customerIndex === -1) {
      return null;
    }

    const updateCustomer: Customer = {
      id,
      firstname,
      lastname,
      location,
       
    };
    this.customers[customerIndex] = updateCustomer;
    return updateCustomer;
  }

  deleteCustomer(id: string): void {
    this.customers = this.customers.filter(customer => customer.id !== id);
  }
}
