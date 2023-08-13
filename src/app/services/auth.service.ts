import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Router } from '@angular/router';
import { first, take } from 'rxjs/operators';
import { map } from 'jquery';
import { LoginI } from '../interfaces/login.interface';
import { ResponseI } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private apiUrl = 'https://localhost:7269/api/User/'; // Reemplaza con la URL base de tu API

  constructor(private http: HttpClient, private router:Router) { }
    
  login(intfLogin:LoginI):Observable<ResponseI>{
      let address = this.apiUrl + "login";
      return this.http.post<ResponseI>(address,intfLogin); // aqui se realiza la solicitud de inicio sesión
  }
 
  async logout(){
    try {
      
      this.router.navigateByUrl('/login');

    } catch (error) {
      console.error(error);
    }
  }

}