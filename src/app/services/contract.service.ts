import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Detail, listContract, maintenanceAddContractI, maintenanceContractI, maintenanceResponsibleI } from '../interfaces/contract.interface';
import { ResponseDetailContract } from '../models/detail-contract.model';
import { ResponseContract, ResponseResponsible } from '../models/contract.model';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private apiUrl = 'https://localhost:7269/api/Contract/';
  private apiUrlDetail = 'https://localhost:7269/api/ContractDetail/';
  private apiUrlResponsible = 'https://localhost:7269/api/Responsible/';
  constructor(private http:HttpClient) { }

  listContract(idContract:string):Observable<ResponseContract>{
    let address = this.apiUrl + "list?idContract="+idContract;
    return this.http.get<ResponseContract>(address); // 
  }
  
  maintenanceAddContract(intfAddContract:maintenanceAddContractI):Observable<any>{
    let address = this.apiUrl + "maintenance/add";
    return this.http.post<any>(address,intfAddContract); 
  }
  maintenanceContract(intfAddContract:maintenanceContractI):Observable<any>{
    let address = this.apiUrl + "maintenance";
    return this.http.post<any>(address,intfAddContract); 
  }

  listDetailContract(idcontract:number):Observable<ResponseDetailContract>{
    let address=this.apiUrlDetail+'list/idcontract?id='+idcontract;
    return this.http.get<ResponseDetailContract>(address);
  }

  maintenanceDetail(intfResponsible:Detail):Observable<any>{
    let address = this.apiUrlDetail + "maintenance";
    return this.http.post<any>(address,intfResponsible); 
  }

  listResponsible(idContract:number):Observable<ResponseResponsible>{
    let address=this.apiUrlResponsible+'list_idContract?idContract='+idContract;
    return this.http.get<ResponseResponsible>(address);
  }

  maintenanceResponsible(intfResponsible:maintenanceResponsibleI):Observable<any>{
    let address = this.apiUrlResponsible + "maintenance";
    return this.http.post<any>(address,intfResponsible); 
  }
}
