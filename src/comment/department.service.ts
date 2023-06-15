  
import { Injectable } from '@nestjs/common';

interface Department {
  id: string;
  deptname: string;
  deptlocation: string;
 
}

@Injectable()
export class DepartmentService {
  private departments: Department[] = [];

  insertDepartment(
    deptname: string,
    deptlocation: string,
    
  ): string {
    const id = Math.random().toString(4).substring(7);
    const newDept: Department = {
      id,
      deptname,
      deptlocation,
      
    };
    this.departments.push(newDept);
    return id;
  }

  getDepartment(): Department[] {
    return this.departments;
  }

  getSingleDepartment(id: string): Department | null {
    return this.departments.find(department => department.id === id) || null;
  }

  updateDepartment(
    id: string,
    deptname: string,
    deptlocation: string,
    
  ): Department | null {
    const departmentIndex = this.departments.findIndex(department => department.id === id);
    if (departmentIndex === -1) {
      return null;
    }

    const updateDepartment: Department = {
      id,
      deptname,
      deptlocation,
       
    };
    this.departments[departmentIndex] = updateDepartment;
    return updateDepartment;
  }

  deleteDepartment(id: string): void {
    this.departments = this.departments.filter(department => department.id !== id);
  }
}
