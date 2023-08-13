import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import { Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ResponseI } from 'src/app/models/login.model';
import Swal from 'sweetalert2';
import { LoginI } from 'src/app/interfaces/login.interface';


function saveSession(clave: string, valor: any) {
  localStorage.setItem(clave, valor);
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    user: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  })

  constructor(private api:AuthService, private router:Router  ) { 
    
  }

  ngOnInit(): void {
    this.checkLocalStorage();
  }

  checkLocalStorage(){
    if(localStorage.getItem("currentUser")){
      this.router.navigateByUrl('dashboard');

    }
  }

  onLogin(form: LoginI) {

    this.api.login(form).subscribe(data => {
      let dataResponse: ResponseI = data;
      const dataLS = JSON.stringify(dataResponse);
      
      if (dataResponse.messagge === "Acceso al sistema") {
        this.router.navigateByUrl('dashboard');
        saveSession("currentUser", dataLS);

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        });
  
        Toast.fire({
          icon: 'success',
          title: 'Bienvenido al Sistema '
        });
        

      } else if (dataResponse.messagge === "Contraseña incorrecta") {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        });
  
        Toast.fire({
          icon: 'error',
          title: 'La contraseña es incorrecta'
        });

      } else if(dataResponse.messagge === "Usuario no existe") {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        });
  
        Toast.fire({
          icon: 'error',
          title: 'El usuario no existe'
        });
      }
      // console.log(data);
    }, (error) => {

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });
  
      Toast.fire({
        icon: 'error',
        title: 'Error interno en el servidor, comunicarse con el administrador'
      });
  
    });

  }


}
