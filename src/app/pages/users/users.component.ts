import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserList } from 'src/app/models/users.model';
import { ImportsJSService } from 'src/app/services/imports-js.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { roleService } from 'src/app/services/role.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import{terminalService} from 'src/app/services/terminal-portuario.service';
import { maintenanceUserI } from 'src/app/interfaces/user.interface';

declare var $: any;

@Component({
  selector: 'app-users',
  templateUrl:'./users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit,OnDestroy {
  dtOptions: DataTables.Settings = {};
  users: UserList[] = [];
  roles: any;
  terminal:any;
  dtTrigger: Subject<any> = new Subject<any>();
  formSubmitted = false;

  constructor(private apiUsers:UsersService, private apiRole:roleService ,private apiTerminal:terminalService ,_CargaScripts:ImportsJSService, private http:HttpClient,private fb:FormBuilder) {
    // _CargaScripts.Carga(["template"]);
   }

  public editForm = this.fb.group({
    id: 0,
    idRol: ['', [Validators.required,]],
    idTerminalPortuario: ['', [Validators.required,]],
    lastName: ['', [Validators.required,]],
    lastNameMother:['', [Validators.required,]],
    name: ['', [Validators.required,]],
    department: ['', [Validators.required,]],
    province: ['', [Validators.required,]],
    district: ['', [Validators.required,]],
    address: ['', [Validators.required,]],
    numberPhone: ['', [Validators.required,]],
    email: ['', [Validators.required,]],
    nameUser: ['', [Validators.required,]],
    password:"",
    user: ['', [Validators.required,]],
    option:['', [Validators.required,]]
  });


  newForm = new FormGroup({ 
    id: new FormControl(0),
    idRol: new FormControl('',Validators.required), 
    idTerminalPortuario:new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    lastNameMother:new FormControl('',Validators.required),
    name: new FormControl('',Validators.required),
    department: new FormControl('',Validators.required),
    province: new FormControl('',Validators.required),
    district: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
    numberPhone: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    nameUser: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    user: new FormControl(this.getUserNameFromlocalStorage().nameUser),
    option:new FormControl(0)
    
  })

   public getUserNameFromlocalStorage(): any {
    const userValue = localStorage.getItem('currentUser');
    if (userValue) {
      try {
        const userObject = JSON.parse(userValue);
        if (userObject && userObject.nameUser) {
          return userObject;
        }
      } catch (error) {
        console.error('Error al analizar los datos de usuario de localStorage:', error);
      }
    }
    return '';
  }
  ngOnInit(): void {
    this.listTerminal();
    this.UsersList();
    console.log(this.users);
    this.listRole();
    this.dtOptions = {
      pageLength: 10,
      searching: true,
      responsive:true,
      info:true,
      language: {url:'//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'},
      destroy:true
    };

  }

  UsersList(): void {
    // this.apiUsers.listUser().subscribe(
    //   (response: UserList[]) => {
    //     this.users = response;
    //     console.log(response);
    //   },
    //   (error: UserList[]) => {
    //     console.error(error);
    //   }
    // );
    this.apiUsers.listUser().subscribe((res:any) =>{
      this.users =res;
      this.dtTrigger.next();

      console.log(this.users);
    });
  }

  listTerminal():void{
    this.apiTerminal.listTerminal().subscribe((res:any) =>{
      this.terminal =res;
      console.log(this.terminal);
    });
  }

  listRole():void{
    this.apiRole.listRoleActives().subscribe((res:any) =>{
      this.roles =res;
      //console.log(this.roles);
    });
  }

  newUser(form:maintenanceUserI){
    this.formSubmitted = true;
    if (this.newForm.invalid) {
      return;
    }
    this.apiUsers.maintenanceUser(form).subscribe(data =>{ 

      let dataResponse: any = data;

      if(dataResponse==1){
        this.dtTrigger.next();
        Swal.fire({
          icon:'success',
          title:'Exito',
          text:'Usuario creado correctamente',
          showConfirmButton: true
        }).then(()=>{
          
          location.reload();

        });
      }else if(dataResponse==2){
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
          title: 'usuario ya existe'
        });
        
      }else{
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
          title: 'El correo ya existe'
        });
      }
      }, (err)=>{
      
        const errorServer = JSON.parse(err.error);
        Swal.fire('Error', errorServer.message, 'error');
  
      });
  }

  UpdateUser(form:maintenanceUserI){
    this.formSubmitted = true;
    if (this.editForm.invalid) {
      return;
    }
    this.apiUsers.maintenanceUser(form).subscribe(data =>{ 

      let dataResponse: any = data;

      if(dataResponse==1){
        this.dtTrigger.next();
        Swal.fire({
          icon:'success',
          title:'Exito',
          text:'Usuario modificado correctamente',
          showConfirmButton: true
        }).then(()=>{
          
          location.reload();

        });
      }else if(dataResponse==2){
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
          title: 'usuario ya existe'
        });
        
      }else{
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
          title: 'El correo ya existe'
        });
      }
      }, (err)=>{
      
        const errorServer = JSON.parse(err.error);
        Swal.fire('Error', errorServer.message, 'error');
  
      });
  }

  DeleteUser(id: number){
    const form: maintenanceUserI = {
      id: id,
      idRol: 0,
      idTerminalPortuario:'' ,
      lastName:'' ,
      lastNameMother:'',
      name:'' ,
      department: '',
      province: '',
      district: '',
      address: '',
      numberPhone:'' ,
      email: '',
      nameUser: '',
      password: '',
      user: this.getUserNameFromlocalStorage().nameUser,
      option: 3

    };
    Swal.fire({
      icon:'question',
      title:'¿ Estas seguro que desear Eliminar el usuario ?',
      showCancelButton:true,
      confirmButtonText:'Confirmar',
      cancelButtonText:'Cancelar'

    }).then((result)=>{
        if (result.isConfirmed) {

          this.apiUsers.maintenanceUser(form).subscribe(()=>{
            
            Swal.fire({
              icon:'success',
              title:'Eliminado correctamente',
              confirmButtonText:'Ok'            
            }).then((result)=>{
                
              if (result) {
                location.reload();
              }

            });
          }, (err)=>{
            Swal.fire('Error', err.error.message, 'error')
          })
          
        }      
    });
  }

  changeUserState(id: number) {
    const form: maintenanceUserI = {
      id: id,
      idRol: 0,
      idTerminalPortuario:'' ,
      lastName:'' ,
      lastNameMother:'',
      name:'' ,
      department: '',
      province: '',
      district: '',
      address: '',
      numberPhone:'' ,
      email: '',
      nameUser: '',
      password: '',
      user: '',
      option: 2

    };
    Swal.fire({
      icon:'question',
      title:'¿ Estas seguro que desear cambiar el estado ?',
      showCancelButton:true,
      confirmButtonText:'Confirmar',
      cancelButtonText:'Cancelar'

    }).then((result)=>{
        if (result.isConfirmed) {

          this.apiUsers.maintenanceUser(form).subscribe(()=>{
            
            Swal.fire({
              icon:'success',
              title:'Estado cambiado correctamente',
              confirmButtonText:'Ok'            
            }).then((result)=>{
                
              if (result) {
                location.reload();
              }

            });
          }, (err)=>{
            Swal.fire('Error', err.error.message, 'error')
          })
          
        }      
    });
  }

  openEditModal(id: number) {
    const user = this.users.find(item => item.id === id);
    console.log(user)
    if (user) {
      this.editForm.patchValue({
        id:user.id,
        idRol: user.idRol,
        idTerminalPortuario: user.idTerminalPortuario,
        lastName: user.lastName,
        lastNameMother: user.lastMotherName,
        name: user.name,
        department: user.department,
        province: user.province,
        district: user.disctrict,
        address: user.address,
        numberPhone: user.numberPhone,
        email: user.email,
        nameUser: user.nameUser,
        user: this.getUserNameFromlocalStorage().nameUser,
        option: 1
      });
      
    }

    // Limpiar los errores de validación del formulario
    this.editForm.markAsPristine();
    this.editForm.markAsUntouched();
    this.editForm.updateValueAndValidity();

  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
