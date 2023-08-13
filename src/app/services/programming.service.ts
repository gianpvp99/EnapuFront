import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ResponseProgramming } from '../models/programming.model';
import { updateCantOfMetaProgramming } from '../interfaces/programming.interface';

@Injectable({
  providedIn: 'root'
})
export class ProgrammingService {
  
  private apiUrl = 'https://localhost:7269/api/ContractPrograming/';

  constructor(
    private http: HttpClient,
  ) { }

  listProgramming(id:number):Observable<ResponseProgramming>{
    let address=this.apiUrl+'list/detail?id='+id;
    return this.http.get<ResponseProgramming>(address);
  }

  updateCantOfMeta(intfProgramming:updateCantOfMetaProgramming):Observable<any>{
    let address=this.apiUrl+'UpdateCantofMeta?idContractPrograming='+intfProgramming.idContractPrograming + '&cantOfmeta=' + intfProgramming.cantOfmeta;
    return this.http.get<any>(address);
  }

}
