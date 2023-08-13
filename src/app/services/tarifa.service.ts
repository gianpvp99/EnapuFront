import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarifa, TipoTarifa } from '../models/tarifa.model';
import { listTipoTarifaI } from '../interfaces/contract.interface';

@Injectable({
  providedIn: 'root'
})
export class TarifaService {
  private apiUrl = 'https://localhost:7269/api/BdExterna/';
  constructor(private http:HttpClient) { }

  // listTarifa(intfTipoTarifa:listTipoTarifaI):Observable<any>{
  //   let address = this.apiUrl + "list/tarifa?idTerminal="+intfTipoTarifa;
  //   return this.http.get<any>(address); 
  // }
  listTarifa(intfTipoTarifa:listTipoTarifaI):Observable<any>{
    let address = this.apiUrl + "list/tarifa?idTerminal="+intfTipoTarifa.idTerminal+"&idServicio="+intfTipoTarifa.idServicio;
    return this.http.get<any>(address); 
  }

  listaTypeTarifa(idTerminal:String):Observable<TipoTarifa>{
    let address = this.apiUrl + "list/tipo/tarifa?idTerminal="+idTerminal;
    return this.http.get<TipoTarifa>(address); 
  }

  // maintenanceAddContract(intfAddContract:maintenanceAddContractI):Observable<any>{
  //   let address = this.apiUrl + "maintenance/add";
  //   return this.http.post<any>(address,intfAddContract); 
  // }
}
