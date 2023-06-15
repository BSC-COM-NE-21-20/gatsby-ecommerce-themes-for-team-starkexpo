import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Loan } from "./entities/loan.model";
import { LoanService } from "./loan.service";
 
@ApiTags('Loan Section')
@Controller('Loans')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  @ApiBody({
    description: 'User data',
    schema: {
      type: 'object',
      properties: {
        amount: { type: 'number', example: 5000, description: 'User regNo' },
        type: { type: 'string', example: 'Expo', description: 'User fname' },
        period: { type: 'number', example: 2, description: 'User fname' },
        rate: { type: 'number', example: 2500, description: 'User fname' },
 
      },
    },
  })
  addLoan(
    @Body() body: Loan
  ) {
    const generatedId = this.loanService.insertLoan(
      body.amount,
      body.type,
      body.period,
      body.rate,
      
    );

    return { id: generatedId};
  }

  @Get()
  getAllLoans(): Loan[] {
    return this.loanService.getLoan();
  }

  @Get(':id')
  getLoan(@Param('id') userId: string): Loan | null {
    return this.loanService.getSingleLoan(userId);
  }
  
  @Patch(':id')
  updateLoan(
    @Param('id') userId: string,
    @Param('amount') amount: number,
    @Param('type') type: string,
    @Param('period') period: number,
    @Param('rate') rate: number,
    
    @Body() body: Loan
  ): Loan | null {
    const updatedLoan = this.loanService.updateLoan(
      userId,
      amount,
      type,
      period,
      rate,
      
    );

    if (!updatedLoan) {
      return null;
    }

    return updatedLoan;
  }

  @Delete(':id')
  removeLoan(@Param('id') userId: string) {
    this.loanService.deleteLoan(userId);
    return null;
  }
}
