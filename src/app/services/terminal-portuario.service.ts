import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class terminalService {
  private apiUrl = 'https://localhost:7269/api/BdExterna/';
  constructor(private http:HttpClient) { }

  listTerminal():Observable<any>{
    let address = this.apiUrl + "list/terminal";
    return this.http.get<any>(address); // 
  }

}
