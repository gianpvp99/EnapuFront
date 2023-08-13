import { Component, OnDestroy, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TypeContractService } from 'src/app/services/type-contract.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ResponseTypeContract } from 'src/app/models/type-contract.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { maintenanceTypeContractI } from 'src/app/interfaces/type-contract.interface';

declare var $: any;

@Component({
  selector: 'app-type-contract',
  templateUrl: './type-contract.component.html',
  styleUrls: ['./type-contract.component.scss']
})

export class TypeContractComponent implements OnInit,OnDestroy {
 

  dtOptions: DataTables.Settings = {};
  typeContract: ResponseTypeContract[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
  formSubmitted = false;
  
  constructor(private http:HttpClient, private apiTypeC:TypeContractService,private fb:FormBuilder) {
    
   }
   
   newForm = new FormGroup({
    typeContract: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    id: new FormControl(0),
    user: new FormControl(this.getUserNameFromlocalStorage()),
    option: new FormControl(0)
    
  })

  public editForm = this.fb.group({
    typeContract: ['', [Validators.required]],
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
    this.TypeContractList();

    this.dtOptions = {
      pageLength: 10,
      searching: true,
      responsive:true,
      info:true,
      language: {url:'//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'},
      destroy:true
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


  TypeContractList(): void {

    this.apiTypeC.listTypeContract().subscribe((res:any) =>{    
      this.typeContract =res;
      this.dtTrigger.next();
    });
  }

  newTypeContract(form:maintenanceTypeContractI){

    this.formSubmitted = true;
    if (this.newForm.invalid) {
      return;
    }
    this.apiTypeC.maintenanceTypeContract(form).subscribe(data =>{
      
      let dataResponse: any = data;
      console.log(dataResponse);
      this.dtTrigger.next();
      
        Swal.fire({
          icon:'success',
          title:'Exito',
          text:'Tipo de contrato creado correctamente',
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
    const typeContract = this.typeContract.find(item => item.id === id);
  
    if (typeContract) {
      this.editForm.patchValue({
        typeContract: typeContract.typeContract,
        description: typeContract.description,
        id: typeContract.id,
        user: this.getUserNameFromlocalStorage(),
        option: 1
      });
    }
  
    // Limpiar los errores de validación del formulario
    this.editForm.markAsPristine();
    this.editForm.markAsUntouched();
    this.editForm.updateValueAndValidity();
    
  }

  UpdateTypeContract(formValue:any){
    const id = formValue.id;
    const form: maintenanceTypeContractI = {
      typeContract: this.editForm.value.typeContract,
      description: this.editForm.value.description,
      id: id,
      user: this.getUserNameFromlocalStorage(),
      option: 1
    };

    this.apiTypeC.maintenanceTypeContract(form).subscribe(()=>{
            
      Swal.fire({
        icon:'success',
        title:'Tipo de Contrato editado correctamente',
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

  changeTypeContractState(id: number) {
    const form: maintenanceTypeContractI = {
      typeContract: '',
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

          this.apiTypeC.maintenanceTypeContract(form).subscribe(()=>{
            
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

  deleteTypeContract(id: number) {
    const form: maintenanceTypeContractI = {
      typeContract: '',
      description: '',
      id: id,
      user: this.getUserNameFromlocalStorage(),
      option: 3
    };

    Swal.fire({
      icon:'question',
      title:'¿ Estas seguro que desear eliminar el tipo de contrato seleccionado ?',
      showCancelButton:true,
      confirmButtonText:'Confirmar',
      cancelButtonText:'Cancelar'

    }).then((result)=>{
        if (result.isConfirmed) {

          this.apiTypeC.maintenanceTypeContract(form).subscribe(()=>{
            
            Swal.fire({
              icon:'success',
              title:'Tipo de Contrato eliminado correctamente',
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
