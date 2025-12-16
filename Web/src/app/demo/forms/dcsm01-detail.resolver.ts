import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Dcsm01DetailResolver implements Resolve<any> {
  
  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    const employeeId = route.paramMap.get('id');
    
    // TODO: เรียก service เพื่อดึงข้อมูล employee
    // return this.employeeService.getEmployee(employeeId);
    
    return { id: employeeId };
  }
}