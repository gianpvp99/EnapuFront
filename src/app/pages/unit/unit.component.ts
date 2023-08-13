import { Component, OnInit, ViewChild  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { maintenancePeriodI } from 'src/app/interfaces/period.interface';
import { maintenanceUnitMeasurementI } from 'src/app/interfaces/unit-measurement.interface';
import { maintenanceUnitI } from 'src/app/interfaces/unit.interface';
import { ResponseUnitMeasurement } from 'src/app/models/unit-measurement';
import { ListUnit } from 'src/app/models/unit.models';
import { UnitMeasurementService } from 'src/app/services/unit-measurement.service';
import { UnitService } from 'src/app/services/unit.service';
import Swal from 'sweetalert2';

declare var $: any;
@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss'],
})
export class UnitComponent implements OnInit {  
  dtOptions: DataTables.Settings = {};
  units: ListUnit[] = [];
  unitMeasurement: ResponseUnitMeasurement[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
  dtTriggerUnitMeasurement: Subject<any> = new Subject<any>();
  formSubmitted = false;
  selectedUnitId: number | null = null;
  selectedIdFormId: number | null = null;
  searchUnitMeasure: number = 0;
  

  constructor(private fb:FormBuilder, private apiUnit:UnitService, private apiUnitMeasurement:UnitMeasurementService) {}
  
  newForm = new FormGroup({
    description: new FormControl('',Validators.required),
    id: new FormControl(0),
    user: new FormControl(this.getUserNameFromlocalStorage()),
    option: new FormControl(0)
    
  });

  public editForm = this.fb.group({
  
    description: ['', [Validators.required]],
    id: ['', [Validators.required]],
    user: ['', [Validators.required]],
    option: ['', [Validators.required]]
  });

  public idForm = this.fb.group({
    description: ['', [Validators.required]],
    id: ['', [Validators.required]],
    user: ['', [Validators.required]],
    option: ['', [Validators.required]]
  });

  public newUnitMeasure = this.fb.group({
    description: ['', [Validators.required]],
    id: [0],
    idUnit: ['', [Validators.required]],
    user: [this.getUserNameFromlocalStorage()],
    option: [0]
  });

  updateSelectedIdFormId() {
    this.selectedIdFormId = this.idForm.get('id')?.value;
  }

  ngOnInit(): void {

    this.UnitList();
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

  UnitList(): void {

    this.apiUnit.listUnit().subscribe((res:any) =>{    
      this.units =res;
      this.dtTrigger.next();
    });
  }


  newUnit(form:maintenanceUnitI){

    this.formSubmitted = true;
    if (this.newForm.invalid) {
      return;
    }
    this.apiUnit.maintenanceUnit(form).subscribe(data =>{
      
      let dataResponse: any = data;
      console.log(dataResponse);
      this.dtTrigger.next();
      
        Swal.fire({
          icon:'success',
          title:'Exito',
          text:'Unidad creado correctamente',
          showConfirmButton: true
        }).then((result)=>{

          location.reload();

        });

      }, (err)=>{
      
        const errorServer = JSON.parse(err.error);
  
        Swal.fire('Error', errorServer.message, 'error');
  
      });
  }
  newUnitMeasurement(form: maintenanceUnitMeasurementI) {
    this.formSubmitted = true;
    if (this.newUnitMeasure.invalid) {
      return;
    }

    this.apiUnitMeasurement.maintenanceUnitMeasurement(form).subscribe(() => {
      //Actualizar tabla, enviando el id de la unidad de medida
      this.openEditModal2(form.idUnit);
    });
  }
  openEditModal(id: number) {
    const unit = this.units.find(item => item.id === id);
  
    if (unit) {
      this.editForm.patchValue({
        description: unit.description,
        id: unit.id,
        user: this.getUserNameFromlocalStorage(),
        option: 1
      });
      
    }
  
    // Limpiar los errores de validación del formulario
    this.editForm.markAsPristine();
    this.editForm.markAsUntouched();
    this.editForm.updateValueAndValidity();
    
  }
  openEditModal2(id: number) {
    this.selectedUnitId = id;
    const unitMeasurement = this.units.find(item => item.id === id);
  
    if (unitMeasurement) {
      this.idForm.patchValue({
        description: unitMeasurement.description,
        id: unitMeasurement.id,
        user: this.getUserNameFromlocalStorage(),
        option: 1
      });
    }
  
    // Actualiza el valor del campo idUnit en newUnitMeasure
    this.newUnitMeasure.patchValue({
      idUnit: this.idForm.get('id')?.value
    });
  
    this.apiUnitMeasurement.searchIdUnitMeasurement(id).subscribe((res: any) => {
      this.unitMeasurement = res;
      this.dtTriggerUnitMeasurement.next(); // Activa el evento para actualizar la tabla
    });
  
    // Limpiar los errores de validación del formulario
    this.editForm.markAsPristine();
    this.editForm.markAsUntouched();
    this.editForm.updateValueAndValidity();
  }
  

  UpdateUnit(formValue:any){

    const id = formValue.id;
    const form: maintenanceUnitI = {
      description: this.editForm.value.description,
      id: id,
      user: this.getUserNameFromlocalStorage(),
      option: 1
    };

    this.apiUnit.maintenanceUnit(form).subscribe(()=>{
            
      Swal.fire({
        icon:'success',
        title:'Unidad editado correctamente',
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
    const form: maintenanceUnitI = {
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

          this.apiUnit.maintenanceUnit(form).subscribe(()=>{
            
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

  deleteUnit(id: number) {
    const form: maintenanceUnitI = {
      description: '',
      id: id,
      user: this.getUserNameFromlocalStorage(),
      option: 3
    };

    Swal.fire({
      icon:'question',
      title:'¿ Estas seguro que desear eliminar la Unidad seleccionada ?',
      showCancelButton:true,
      confirmButtonText:'Confirmar',
      cancelButtonText:'Cancelar'

    }).then((result)=>{
        if (result.isConfirmed) {

          this.apiUnit.maintenanceUnit(form).subscribe(()=>{
            
            Swal.fire({
              icon:'success',
              title:'Unidad eliminada correctamente',
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
  deleteUnitMeasure(id:number){
    const form: maintenanceUnitMeasurementI = {
      id: id,
      idUnit: Number(this.selectedUnitId),
      description: '',
      user: this.getUserNameFromlocalStorage(),
      option: 3
    };

    Swal.fire({
      icon:'question',
      title:'¿ Estas seguro que desear eliminar la unidad de medida seleccionada ?',
      showCancelButton:true,
      confirmButtonText:'Confirmar',
      cancelButtonText:'Cancelar'

    }).then((result)=>{
        if (result.isConfirmed) {

          this.apiUnitMeasurement.maintenanceUnitMeasurement(form).subscribe(()=>{
            this.openEditModal2(form.idUnit);
            Swal.fire({
              icon:'success',
              title:'Unidad de medida eliminada correctamente',
              confirmButtonText:'Ok'            
            })
          }, (err)=>{
            Swal.fire('Error', err.error.message, 'error')
          })
          
        }      

    });
  }
}
