import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'https://localhost:7269/api/BdExterna/';
  constructor(private http:HttpClient) { }

  listCliente(idContract:string):Observable<any>{
    let address = this.apiUrl + "list/cliente?idTerminal="+idContract;
    return this.http.get<any>(address);
  }
}
