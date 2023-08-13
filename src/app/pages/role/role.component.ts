import { Component, OnDestroy, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { roleService } from 'src/app/services/role.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ResponseRole } from 'src/app/models/role';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { maintenanceRoleI } from 'src/app/interfaces/role.interface';

declare var $: any;

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})

export class RoleComponent implements OnInit,OnDestroy {

  dtOptions: DataTables.Settings = {};
  role: ResponseRole[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
  formSubmitted = false;

  constructor(private http:HttpClient, private apiTypeC:roleService,private fb:FormBuilder) { }

  newForm = new FormGroup({
    // role: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    id: new FormControl(0),
    user: new FormControl(this.getUserNameFromlocalStorage()),
    option: new FormControl(0)
    
  })

  public editForm = this.fb.group({
    description: ['', [Validators.required,]],
    id: ['', [Validators.required]],
    user: ['', [Validators.required]],
    option: ['', [Validators.required]]
  });

  private getUserNameFromlocalStorage(): string {
    const userValue = localStorage.getItem('currentUser');
    if (userValue) {
      try {
        const userObject = JSON.parse(userValue);
        if (userObject && userObject.nameUser) {
          return userObject.nameUser;
        }
      } catch (error) {
        console.error('Error al analizar los datos de usuario de localStorage:', error);
      }
    }
    return '';
  }
  ngOnInit(): void {
    this.roleList();
    this.dtOptions = {
      pageLength: 10,
      searching: true,
      responsive:true,
      info:true,
      destroy:true,
      language: {url:'//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'}
      // dom: 'Bfrtip',
      // buttons: [
      //   'columnsToggle',
      //   'colvis',
      //   'copy',
      //   'print',
      //   'excel',
      // ],
    };
  }

  roleList(): void {
      this.apiTypeC.listRole().subscribe((res:any) =>{    
      this.role =res;
      this.dtTrigger.next();
    });
  }

  newRole(form:maintenanceRoleI){

    this.formSubmitted = true;
    if (this.newForm.invalid) {
      return;
    }
    this.apiTypeC.maintenanceRole(form).subscribe(data =>{ 
      let dataResponse: any = data;
      console.log(dataResponse);
      this.dtTrigger.next();
      
        Swal.fire({
          icon:'success',
          title:'Exito',
          text:'Rol creado correctamente',
          showConfirmButton: true
        }).then((result)=>{

          location.reload();

        });

      }, (err)=>{
      
        const errorServer = JSON.parse(err.error);
  
        Swal.fire('Error', errorServer.message, 'error');
  
      });
  }

  openEditModal(id: number) {
    const role = this.role.find(item => item.id === id);
  
    if (role) {
      this.editForm.patchValue({
        description: role.description,
        id: role.id,
        user: this.getUserNameFromlocalStorage(),
        option: 1
      });
    }
  
    // Limpiar los errores de validación del formulario
    this.editForm.markAsPristine();
    this.editForm.markAsUntouched();
    this.editForm.updateValueAndValidity();
    
  }

  UpdateRole(formValue:any){
    const id = formValue.id;
    const form: maintenanceRoleI = {
      id: id,
      description: this.editForm.value.description,
      user: this.getUserNameFromlocalStorage(),
      option: 1
    };

    this.apiTypeC.maintenanceRole(form).subscribe(()=>{  
      Swal.fire({
        icon:'success',
        title:'Rol editado correctamente',
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

  changeRoleState(id: number) {
    const form: maintenanceRoleI = {
      description: '',
      id: id,
      user: this.getUserNameFromlocalStorage(),
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

          this.apiTypeC.maintenanceRole(form).subscribe(()=>{
            
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

  deleteRole(id: number) {
    const form: maintenanceRoleI = {
      description: '',
      id: id,
      user: this.getUserNameFromlocalStorage(),
      option: 3
    };

    Swal.fire({
      icon:'question',
      title:'¿ Estas seguro que desear eliminar el rol seleccionado ?',
      showCancelButton:true,
      confirmButtonText:'Confirmar',
      cancelButtonText:'Cancelar'

    }).then((result)=>{
        if (result.isConfirmed) {

          this.apiTypeC.maintenanceRole(form).subscribe(()=>{
            
            Swal.fire({
              icon:'success',
              title:'Rol eliminado correctamente',
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

  
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
