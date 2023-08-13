import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { maintenanceUnitMeasurementI } from '../interfaces/unit-measurement.interface';
import { Observable } from 'rxjs';
import { ResponseUnitMeasurement } from '../models/unit-measurement';

@Injectable({
  providedIn: 'root'
})
export class UnitMeasurementService {
  private apiUrl = 'https://localhost:7269/api/UnitMeasurement/';
  constructor(private http:HttpClient) { }

  searchIdUnitMeasurement(id:number):Observable<ResponseUnitMeasurement>{
    let address = this.apiUrl + "search/id?id=" + id;
    return this.http.get<ResponseUnitMeasurement>(address); 
  }

  maintenanceUnitMeasurement(intfUnitMeasurement:maintenanceUnitMeasurementI):Observable<any>{
    let address = this.apiUrl + "maintenance";
    return this.http.post<any>(address,intfUnitMeasurement); 
  }

}
