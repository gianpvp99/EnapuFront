import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { LoginI } from 'src/app/interfaces/login.interface';
import { ResponseI } from 'src/app/models/login.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  formData: LoginI = { user: '', password: '' };
  user: any = {};

  constructor( private router:Router, private api:AuthService) { }

  ngOnInit(): void {
    this.fetchData();
    const userData = localStorage.getItem('currentUser');
    this.user = JSON.parse(userData ?? '{}');
  }
  
  fetchData(){ 
    this.api.login(this.formData).subscribe(data => {
      let dataResponse: ResponseI = data;
      console.log(dataResponse);
    });
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/login');
  }
}
