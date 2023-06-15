  
import { Injectable } from '@nestjs/common';

interface Loan {
  id: string;
  amount: number;
  type: string;
  period: number;
  rate: number;
 
}

@Injectable()
export class LoanService {
  private Loans: Loan[] = [];

  insertLoan(
    amount: number,
    type: string,
    period: number,
    rate: number,
    
  ): string {
    const id = Math.random().toString(4).substring(7);
    const newLoan: Loan = {
      id,
      amount,
      type,
      period,
      rate,
      
    };
    this.Loans.push(newLoan);
    return id;
  }

  getLoan(): Loan[] {
    return this.Loans;
  }

  getSingleLoan(id: string): Loan | null {
    return this.Loans.find(Loan => Loan.id === id) || null;
  }

  updateLoan(
    id: string,
    amount: number,
    type: string,
    period: number,
    rate: number,
    
  ): Loan | null {
    const LoanIndex = this.Loans.findIndex(Loan => Loan.id === id);
    if (LoanIndex === -1) {
      return null;
    }

    const updateLoan: Loan = {
      id,
      amount,
      type,
      period,
      rate,
       
    };
    this.Loans[LoanIndex] = updateLoan;
    return updateLoan;
  }

  deleteLoan(id: string): void {
    this.Loans = this.Loans.filter(Loan => Loan.id !== id);
  }
}
