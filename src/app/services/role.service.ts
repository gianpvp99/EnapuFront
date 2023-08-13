import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { maintenanceTypeContractI } from '../interfaces/type-contract.interface';
import { maintenanceRoleI } from '../interfaces/role.interface';

@Injectable({
  providedIn: 'root'
})
export class roleService {
  private apiUrl = 'https://localhost:7269/api/role/';
  constructor(private http:HttpClient) { }

  listRole():Observable<any>{
    let address = this.apiUrl + "list";
    return this.http.get<any>(address); // 
  }
  listRoleActives():Observable<any>{
    let address = this.apiUrl + "list/active";
    return this.http.get<any>(address); // 
  }

  maintenanceRole(intfRole:maintenanceRoleI):Observable<any>{
    let address = this.apiUrl + "maintenance";
    return this.http.post<any>(address,intfRole); 
  }
}
