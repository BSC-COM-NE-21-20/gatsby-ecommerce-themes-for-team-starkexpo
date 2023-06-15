import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { DepartmentService } from "./department.service";
import { Department} from './entities/department.model'

@ApiTags('Department Section')
@Controller('Departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  @ApiBody({
    description: 'User data',
    schema: {
      type: 'object',
      properties: {
        deptname: { type: 'string', example: 'Type something', description: 'User deptname' },
        deptlocation: { type: 'string', example: 'Lilongwe', description: 'User deptlocation' },
      
      },
    },
  })
  addDepartment(
    @Body() body: Department
  ) {
    const generatedId = this.departmentService.insertDepartment(
      body.deptname,
      body.deptlocation,
      
    );

    return { id: generatedId};
  }

  @Get('Get all Departments')
  getAllDepartment(): Department[] {
    return this.departmentService.getDepartment();
  }

  @Get(':id')
  getDepartment(@Param('id') userId: string): Department | null {
    return this.departmentService.getSingleDepartment(userId);
  }
  
  @Patch(':id')
  updateDepartment(
    @Param('id') userId: string,
    @Param('deptname') deptname: string,
    @Param('deptlocation') deptlocation: string,
    
    @Body() body: Department
  ): Department | null {
    const updatedDepartment = this.departmentService.updateDepartment(
      userId,
      deptname,
      deptlocation,
      
    );

    if (!updatedDepartment) {
      return null;
    }

    return updatedDepartment;
  }

  @Delete(':id')
  removeDepartment(@Param('id') userId: string) {
    this.departmentService.deleteDepartment(userId);
    return null;
  }
}
