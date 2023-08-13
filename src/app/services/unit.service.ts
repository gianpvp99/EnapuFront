import { Injectable } from '@angular/core';
import { maintenanceUnitI } from '../interfaces/unit.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  private apiUrl = 'https://localhost:7269/api/Unit/';
  constructor(private http:HttpClient) { }

  listUnit():Observable<any>{
    let address = this.apiUrl + "list";
    return this.http.get<any>(address); // 
  }

  maintenanceUnit(intfUnit:maintenanceUnitI):Observable<any>{
    let address = this.apiUrl + "maintenance";
    return this.http.post<any>(address,intfUnit); 
  }

  listUnitActive():Observable<any>{
    let address = this.apiUrl + "list/active";
    return this.http.get<any>(address); // 
  }
}
