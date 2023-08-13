import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { PeriodList } from 'src/app/models/period.model';
import { PeriodService } from 'src/app/services/period.service';
import { maintenancePeriodI } from 'src/app/interfaces/period.interface';

declare var $: any;

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss']
})
export class PeriodComponent implements OnInit,OnDestroy {
  dtOptions: DataTables.Settings = {};
  periods: PeriodList[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
  formSubmitted = false;

  constructor(private apiPeriod:PeriodService,private http:HttpClient,private fb:FormBuilder) { }

  newForm = new FormGroup({
    description: new FormControl('',Validators.required),
    month: new FormControl('',Validators.required),
    id: new FormControl(0),
    user: new FormControl(this.getUserNameFromlocalStorage()),
    option: new FormControl(0)
    
  })

  public editForm = this.fb.group({
  
    description: ['', [Validators.required]],
    month: ['', [Validators.required,]],
    id: ['', [Validators.required]],
    user: ['', [Validators.required]],
    option: ['', [Validators.required]]
  });
  
  ngOnInit(): void {

    this.PeriodList();
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

  PeriodList(): void {

    this.apiPeriod.listPeriod().subscribe((res:any) =>{    
      this.periods =res;
      this.dtTrigger.next();
    });
  }
  newPeriod(form:maintenancePeriodI){

    this.formSubmitted = true;
    if (this.newForm.invalid) {
      return;
    }
    this.apiPeriod.maintenancePeriod(form).subscribe(data =>{
      
      let dataResponse: any = data;
      console.log(dataResponse);
      this.dtTrigger.next();
      
        Swal.fire({
          icon:'success',
          title:'Exito',
          text:'Periodo creado correctamente',
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
    const period = this.periods.find(item => item.id === id);
  
    if (period) {
      this.editForm.patchValue({
        description: period.description,
        month: period.month,
        id: period.id,
        user: this.getUserNameFromlocalStorage(),
        option: 1
      });
      
    }
  
    // Limpiar los errores de validación del formulario
    this.editForm.markAsPristine();
    this.editForm.markAsUntouched();
    this.editForm.updateValueAndValidity();
    
  }

  UpdatePeriod(formValue:any){

    const id = formValue.id;
    const form: maintenancePeriodI = {
      description: this.editForm.value.description,
      month: this.editForm.value.month,
      id: id,
      user: this.getUserNameFromlocalStorage(),
      option: 1
    };

    this.apiPeriod.maintenancePeriod(form).subscribe(()=>{
            
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
    const form: maintenancePeriodI = {
      description: '',
      month: 0, // solo porque la api lo requiere
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

          this.apiPeriod.maintenancePeriod(form).subscribe(()=>{
            
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

  deletePeriod(id: number) {
    const form: maintenancePeriodI = {
      description: '',
      month: 0,
      id: id,
      user: this.getUserNameFromlocalStorage(),
      option: 3
    };

    Swal.fire({
      icon:'question',
      title:'¿ Estas seguro que desear eliminar el Periodo seleccionado ?',
      showCancelButton:true,
      confirmButtonText:'Confirmar',
      cancelButtonText:'Cancelar'

    }).then((result)=>{
        if (result.isConfirmed) {

          this.apiPeriod.maintenancePeriod(form).subscribe(()=>{
            
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
