import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserList } from '../models/users.model';
import { maintenanceUserI } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'https://localhost:7269/api/User/';
  constructor(private http:HttpClient) { }

  listUser():Observable<any>{
    let address = this.apiUrl + "list";
    return this.http.get<any>(address); // 
  }

  maintenanceUser(intfUser:maintenanceUserI):Observable<any>{
    let address = this.apiUrl + "maintenance";
    return this.http.post<any>(address,intfUser); 
  }

  listUserActive(id:string):Observable<UserList>{
    let address = this.apiUrl + "search/responsible/active?terminal="+id;
    return this.http.get<any>(address); // 
  }

}
