import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { maintenancePeriodI } from '../interfaces/period.interface';
import { PeriodList } from '../models/period.model';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

  private apiUrl = 'https://localhost:7269/api/Period/';

  constructor(private http:HttpClient) { }

  listPeriod():Observable<any>{
    let address = this.apiUrl + "list";
    return this.http.get<any>(address); // 
  }

  maintenancePeriod(intfPeriod:maintenancePeriodI):Observable<any>{
    let address = this.apiUrl + "maintenance";
    return this.http.post<any>(address,intfPeriod); 
  }

  listPeriodActive():Observable<PeriodList>{
    let address = this.apiUrl + "list/active";
    return this.http.get<any>(address); // 
  }

}
