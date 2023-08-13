import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { maintenanceTypeContractI } from '../interfaces/type-contract.interface';

@Injectable({
  providedIn: 'root'
})
export class TypeContractService {
  private apiUrl = 'https://localhost:7269/api/TypeContract/';
  constructor(private http:HttpClient) { }

  listTypeContract():Observable<any>{
    let address = this.apiUrl + "list";
    return this.http.get<any>(address); // 
  }

  maintenanceTypeContract(intfTypeContract:maintenanceTypeContractI):Observable<any>{
    let address = this.apiUrl + "maintenance";
    return this.http.post<any>(address,intfTypeContract); 
  }

  listTypeContractActives():Observable<any>{
    let address = this.apiUrl + "list/active";
    return this.http.get<any>(address); // 
  }
}
