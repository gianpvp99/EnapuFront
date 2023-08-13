import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators ,FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { detailText, maintenanceAddContractI, maintenanceContractI,Detail ,responsible,responsibleText, responsibleAssign, idResponsible} from 'src/app/interfaces/contract.interface';
import { updateCantOfMetaProgramming } from 'src/app/interfaces/programming.interface';
import { ResponseContract, ResponseResponsible, responsePeriodPrograming } from 'src/app/models/contract.model';
import { ResponseDetailContract } from 'src/app/models/detail-contract.model';
import { PeriodList } from 'src/app/models/period.model';
import { ResponseProgramming } from 'src/app/models/programming.model';
import { Tarifa, TipoTarifa } from 'src/app/models/tarifa.model';
import { ResponseUnitMeasurement } from 'src/app/models/unit-measurement';
import { ListUnit } from 'src/app/models/unit.models';
import { UserList } from 'src/app/models/users.model';
import { ClientService } from 'src/app/services/client.service';
import { ContractService } from 'src/app/services/contract.service';
import { PeriodService } from 'src/app/services/period.service';
import { ProgrammingService } from 'src/app/services/programming.service';
import { TarifaService } from 'src/app/services/tarifa.service';
import { TypeContractService } from 'src/app/services/type-contract.service';
import { UnitMeasurementService } from 'src/app/services/unit-measurement.service';
import { UnitService } from 'src/app/services/unit.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';


declare var $: any;
@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit,OnDestroy {
  
  addContract: maintenanceAddContractI  ={
    id: 0,
    idTerminalPortuario: '',
    descriptionLong: '',
    descriptionShort: '',
    idClient: '',
    idTypeContract: 0,
    dateContract: new Date,
    dateStart: new Date,
    dateEnd: new Date,
    directionContract: '',
    idUsuario: 0,
    user: '',
    option: 0,
    detail:[],
    responsible:[]
  };

  newFormDetailContract: Detail={
    id: 0,
    idContract: 0,
    idTarifa: '',
    idPeriod: 0,
    idUnitMeasurement: 0,
    periodoMeta: 0,
    user: '',
    option: 0
  }
  newFormResponsibleContract: responsible={
    id: 0,
    idContract: 0,
    idUser:0, 
    user: '',
    option: 0
  }

   prueba = [
    { id: 1, name: 'JavaScript', level: 'Intermediate' },
    // { id: 2, name: 'Python', level: 'Beginner' },
    // { id: 3, name: 'Java', level: 'Advanced' },
  ];

  cantOfMeta: number = 0;
  periodPrograming: any;
  totalCantOfMeta: number = 0;
  restCantOfMeta: number = 0;
  idUser: number = 0;

  idTerminalPortuario:string='';
  dtOptions: DataTables.Settings = {};
  contracts: ResponseContract[] = [];
  fileName = 'Seleccionar archivo PDF'; // Texto predeterminado para mostrar en el botón
  detailText :detailText[]=[];
  detail :Detail[]=[];

  detailPeriodMetaText:detailText[]=[];
  detailPeriodMeta:Detail[]=[];

  responsibleText :responsibleText[]=[];
  responsibleAssign :responsibleAssign[]=[];

  responsible: responsible[]=[];
  cliente: any;
  typeContract: any;

  selectedTypeTarifa: string= '';
  selectedTarifa: any;

  typeTarifa: TipoTarifa[]=[];
  tarifa: Tarifa[]=[];

  periodo: PeriodList[]=[];
  unit: ListUnit[]=[];
  unitMeasure: ResponseUnitMeasurement[]=[];
  DetailContract: ResponseDetailContract[]=[];
  Programming: ResponseProgramming[] =[];
  

  user: UserList[]=[];
  idContract: any;

  dtTrigger: Subject<any> = new Subject<any>();
  formSubmitted = false;
  // selectedOption: any;
  selectedUnit: number=0;
  selectedUnitMeasure: any;
  isButtonDisabled: boolean = true;

  constructor(private apiContractSvc:ContractService,private fb:FormBuilder,
      private apiClienteSvc:ClientService, private apiTypeContractSvc:TypeContractService,
      private apiTarifaSvc:TarifaService, private apiPeriodSvc:PeriodService,
      private apiUnitSvc:UnitService, private apiUserSvc:UsersService, 
      private apiUnitMeasurementSvc:UnitMeasurementService,
      private apiProgrammingSvc:ProgrammingService) { }


  public detailForm = this.fb.group({
    id: ['',[Validators.required]],
    idTarifa: ['',[Validators.required]],
    idPeriod:['',[Validators.required]],
    idUnitMeasurement:['',[Validators.required]],
    periodoMeta:['',[Validators.required]],
    user:['',[Validators.required]],
    option:['',[Validators.required]]
  });
  
  public ResponsibleForm = this.fb.group({
    id:['',[Validators.required]],
    idContract:['',[Validators.required]],
    idUser:[0],
    user:[this.getUserNameFromlocalStorage()],
    option:[0]
  });

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
    
    this.ContractList();
    this.listCliente();
    this.listTypeContract();
    this.listTypeTarifa();
    // this.listTarifa();
    this.listPeriod();
    this.listUnit();
    this.listUser();

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
  ContractList(): void {
    let idContract = this.getUserNameFromlocalStorage().idTerminalPortuario;

    this.apiContractSvc.listContract(idContract).subscribe((res:any) =>{    
      this.contracts=res;
      this.dtTrigger.next();
      // console.log(res);

    });
  }
  listCliente():void{
    this.apiClienteSvc.listCliente(this.getUserNameFromlocalStorage().idTerminalPortuario.toString()).subscribe((res:any) =>{
      this.cliente =res;
      //console.log(this.cliente);
    });
  }
  listTypeContract():void{
    this.apiTypeContractSvc.listTypeContractActives().subscribe((res:any) =>{
      this.typeContract =res;
      //console.log(this.typeContract);
    });
  }

  listTypeTarifa(): void{
    let idTerminal = this.getUserNameFromlocalStorage().idTerminalPortuario.toString();
    
    this.apiTarifaSvc.listaTypeTarifa(idTerminal).subscribe((res:any) =>{
      this.typeTarifa =res;
      // console.log(this.typeTarifa);
    });
  }
  listTarifa(id:string):void{
    let idTerminal = this.getUserNameFromlocalStorage().idTerminalPortuario.toString();

    this.apiTarifaSvc.listTarifa({
      idTerminal: idTerminal,
      idServicio: id,
    }
    ).subscribe((res:any) =>{
      this.tarifa =res;
      // console.log(this.tarifa);
    });
    
  }

  listPeriod():void{
    this.apiPeriodSvc.listPeriodActive().subscribe((res:any) =>{
      this.periodo =res;
      //console.log(this.periodo);
    });
  }
  listUnit():void{
    this.apiUnitSvc.listUnitActive().subscribe((res:any) =>{
      this.unit =res;
      //console.log(this.unit);
    });
  }
  listUser():void{
    const terminal= this.getUserNameFromlocalStorage().idTerminalPortuario;
    
    this.apiUserSvc.listUserActive(terminal).subscribe((res:any) =>{
      this.user =res;
      // console.log(this.user);
    });
  }
  listUnitMeasure(id:number):void{
    this.apiUnitMeasurementSvc.searchIdUnitMeasurement(id).subscribe((res:any) =>{
      this.unitMeasure =res;
      //console.log(this.unitMeasure);
    });
  }
  onUnitChange(): void {
    this.selectedUnitMeasure = null; // Reset the selected unit measure when the unit changes
    if (this.selectedUnit) {
      this.listUnitMeasure(this.selectedUnit);
    } else {
      this.unitMeasure = []; // Clear the unit measure list if no unit is selected
    }
  }

  onTypeTarifaChange(): void {
    this.selectedTarifa = null; // Reset the selected unit measure when the unit changes
    if (this.selectedTypeTarifa) {
      this.listTarifa(this.selectedTypeTarifa);
    } else {
      this.tarifa = []; // Clear the unit measure list if no unit is selected
    }
  }

  listDetailContract(idContract:number):void{
    this.apiContractSvc.listDetailContract(idContract).subscribe((res:any) =>{
      this.DetailContract =res;
      // console.log(this.DetailContract);
    });
  }

  cleanContract():void{
    // this.addContract.descriptionLong.
    // this.addContract.descriptionShort = '';
    // this.addContract.idClient = '';
    // this.addContract.idTypeContract = '';
  }

  newContract(){

    this.addContract.responsible=this.responsible;
    this.addContract.detail=this.detail;
    this.addContract.idTerminalPortuario=this.getUserNameFromlocalStorage().idTerminalPortuario;
    this.addContract.idUsuario=this.getUserNameFromlocalStorage().id;
    this.addContract.user=this.getUserNameFromlocalStorage().nameUser;
    
    //console.log(this.addContract);

    this.apiContractSvc.maintenanceAddContract(this.addContract).subscribe(data =>{
      
      let dataResponse: any = data;
      // console.log(dataResponse);
      this.dtTrigger.next();
      
        Swal.fire({
          icon:'success',
          title:'Exito',
          text:'Contrato creado correctamente',
          showConfirmButton: true
        }).then((result)=>{

          location.reload();

        });

      }, (err)=>{
      
        const errorServer = JSON.parse(err.error);
  
        Swal.fire('Error', errorServer.message, 'error');
  
      });
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      if (file.type === 'application/pdf') {
        // Mostrar el nombre del archivo en el botón personalizado
        this.fileName = file.name;
      } else {

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
            icon: 'warning',
            title: 'El archivo no es un PDF, intentelo de nuevo'
          });

        // Archivo no válido, puedes mostrar un mensaje de error al usuario
        fileInput.value = ''; // Limpia el valor del input
        this.fileName = 'Seleccionar archivo PDF'; // Restaura el texto predeterminado
      }
    } else {
      // No se seleccionó ningún archivo, restaurar el texto predeterminado
      this.fileName = 'Seleccionar archivo PDF';
    }

  }

  checkNegativeContract():void{

    if (this.newFormDetailContract.periodoMeta < 0) {
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
        icon: 'warning',
        title: 'No puedes ingresar un número negativo, intentelo de nuevo'
      });

      this.newFormDetailContract.periodoMeta = 0;
    } 
  }
  UpdateState(id:number){
    const form: maintenanceContractI = {
      id: id,
      idTerminalPortuario: '',
      descriptionLong: '',
      descriptionShort: '',
      idClient:'',
      idTypeContract: 0,
      dateContract: new Date(),
      dateStart: new Date(),
      dateEnd: new Date(),
      directionContract: '',
      idUsuario: 0,
      user: this.getUserNameFromlocalStorage().nameUser,
      option: 2,

    };
    Swal.fire({
      icon:'question',
      title:'¿ Estas seguro de cambiar el estado del contrato ?',
      showCancelButton:true,
      confirmButtonText:'Confirmar',
      cancelButtonText:'Cancelar'

    }).then((result)=>{
        if (result.isConfirmed) {

          this.apiContractSvc.maintenanceContract(form).subscribe(()=>{
            
            Swal.fire({
              icon:'success',
              title:'Se cambio el estado al contrato',
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
  DeleteContract(id: number){
    const form: maintenanceContractI = {
      id: id,
      idTerminalPortuario: '',
      descriptionLong: '',
      descriptionShort: '',
      idClient:'',
      idTypeContract: 0,
      dateContract: new Date(),
      dateStart: new Date(),
      dateEnd: new Date(),
      directionContract: '',
      idUsuario: 0,
      user: this.getUserNameFromlocalStorage().nameUser,
      option: 3

    };
    Swal.fire({
      icon:'question',
      title:'¿ Estas seguro de eliminar el Contrato ?',
      showCancelButton:true,
      confirmButtonText:'Confirmar',
      cancelButtonText:'Cancelar'

    }).then((result)=>{
        if (result.isConfirmed) {

          this.apiContractSvc.maintenanceContract(form).subscribe(()=>{
            
            Swal.fire({
              icon:'success',
              title:'Se Elimino el contrato',
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
 
  editContract(id: number): void{

  }

  listResponsible(id: number): void {
    this.idContract = id;
    // console.log(this.idContract);
    this.apiContractSvc.listResponsible(id).subscribe((res:any) =>{
      this.responsibleAssign =res;
      // console.log(this.responsibleAssign);
    });
  }

  addDetailContract(){

    const DetallecontractUnit:Detail={
      id: 0,
      idContract: 0,
      idTarifa: this.newFormDetailContract.idTarifa,
      idPeriod: this.newFormDetailContract.idPeriod,
      idUnitMeasurement: this.newFormDetailContract.idUnitMeasurement,
      periodoMeta: this.newFormDetailContract.periodoMeta,
      user: this.getUserNameFromlocalStorage().nameUser,
      option: 0
    }
    this.detail.push(DetallecontractUnit);

    const detalleContractTextUni:detailText={
      tarifa: '',
      Period: '',
      Unit:'',
      unitMeasurement: '',
      periodoMeta: 0
    }

    this.periodo.find(item=>{ 
      if(item.id===Number(this.newFormDetailContract.idPeriod)){
        detalleContractTextUni.Period = item.description;
      }
    });

   this.tarifa.find(item=>{ 
      if(item.id===this.newFormDetailContract.idTarifa.toString()){
        detalleContractTextUni.tarifa = item.description;
      }
    });

    this.unitMeasure.find(item=>{ 
      if(item.id===Number(this.newFormDetailContract.idUnitMeasurement)){
        detalleContractTextUni.unitMeasurement = item.description;
        detalleContractTextUni.Unit=item.unitDescription;
      }
    });

    detalleContractTextUni.periodoMeta=this.newFormDetailContract.periodoMeta;
    this.detailText.push(detalleContractTextUni)
    // console.log(this.detail);
    // Limpiar Detalle de Contrato
    this.selectedTypeTarifa = '';
    this.newFormDetailContract.idTarifa = '';
    this.newFormDetailContract.idPeriod = 0;
    this.selectedUnit = 0;
    this.newFormDetailContract.idUnitMeasurement = 0 ;
    this.newFormDetailContract.periodoMeta = 0 ;
  }
 
  addResponsibleContract(){
    const responsibleContractUni:responsible={
      id: 0,
      idContract: 0,
      idUser: this.newFormResponsibleContract.idUser,
      user: this.getUserNameFromlocalStorage().nameUser,
      option: 0   
    }
    this.responsible.push(responsibleContractUni);

    const responsibleContractTextUni:responsibleText={
      responsible: '',
      email: '',
    }
    this.user.find(item=>{ 
      if(item.id===Number(this.newFormResponsibleContract.idUser)){
        responsibleContractTextUni.responsible = item.name+" "+item.lastName+" "+item.lastMotherName;
        responsibleContractTextUni.email=item.email;
        this.responsibleText.push(responsibleContractTextUni);
      }
    });

    //Limpiar responsable
    this.newFormResponsibleContract.idUser = 0;
    //console.log(responsibleContractTextUni)
  }
  addResponsibleAssign(){

    const responsibleAssign:responsible={
      id: 0,
      idContract: this.idContract,
      idUser: Number(this.idUser),
      user: this.getUserNameFromlocalStorage().nameUser,
      option: 0   
    }

    this.apiContractSvc.maintenanceResponsible(responsibleAssign).subscribe((res:any) =>{
      
      this.listResponsible(this.idContract);

      if(res == 1){

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
          title: 'Responsable agregado correctamente'
        });

      }else if( res == 2){

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
          icon: 'warning',
          title: 'El responsable ya existe'
        });
      }
    });

  }


  deleteDetailContract(id:number){
    this.detailText.splice(id,1);
    this.detail.splice(id,1);

  }

  deleteResponsibleAssign(id:number){

    const responsibleAssign:responsible={
      id: id,
      idContract: 0,
      idUser: 0,
      user: this.getUserNameFromlocalStorage().nameUser,
      option: 3   
    }

    this.apiContractSvc.maintenanceResponsible(responsibleAssign).subscribe((res:any) => {
    //ACTUALIZAR TABLA
    this.listResponsible(this.idContract);
    
  });


  }

  deleteResponsibleText(id:number){
    this.responsibleText.splice(id,1)
  }
  
  // FUNCTIONS PROGRAMMING

  openProgrammingModal(id:number): void{
    this.apiProgrammingSvc.listProgramming(id).subscribe((res:any) =>{
      this.Programming =res;
      this.Programming.forEach((atributo) =>{
        atributo.action = false;
      })
      // console.log(this.Programming);

      //Sumar la cantidad de meta 
      this.sumCantOfMeta();
      //Mostrar el objeto Periodo Meta segun su ID
      this.ObservablePrograming(id);
    });
    
  }

  sumCantOfMeta(): void{
      this.totalCantOfMeta = this.Programming.reduce((total, item) => total + item.cantOfMeta, 0);
  }

  ObservablePrograming(id:number):void {
    this.periodPrograming = this.DetailContract.find(item => item.id == id)
    console.log(this.periodPrograming);
  }

  checkNegativePrograming(): void{

    if (this.cantOfMeta < 0) {
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
        icon: 'warning',
        title: 'No puedes ingresar un número negativo, intentelo de nuevo'
      });

      this.cantOfMeta = 0; // Opcionalmente, puedes reiniciar el valor del input a null o a otro valor permitido
    } 
    
  }

  editCantMeta(item:any){
    if(this.Programming.filter(x => x.action).length > 0){
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
        icon: 'warning',
        title: 'Primero debes finalizar la edición de la cantidad actual'
      });
      return;
    }
    item.action = true;
  }

  cancelCantMeta(item:any){
    item.action = false;
    //LIMPIAR CANT META
    this.cantOfMeta = 0;
  }

  saveCantMeta(item:any){

    const saveCantMeta:updateCantOfMetaProgramming = {
      idContractPrograming: item.id,
      cantOfmeta: this.cantOfMeta,
    }

    this.apiProgrammingSvc.updateCantOfMeta(saveCantMeta).subscribe((res:any) => {
      if(res == 1){
        
        this.openProgrammingModal(item.idDetailContract);
        item.action = false;

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
          title: 'Cantidad de meta actualizado correctamente'
        });
      } else if(res == 2){

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
          icon: 'warning',
          title: 'No puedes superar la cantidad periodo meta'
        });

      }
      // LIMPIAR CANT META
      this.cantOfMeta = 0;

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

  DeleteDetailPeriodMeta(id:number):void{

    const deleteDetail:Detail={
      id:id,
      idContract: 0,
      idTarifa: '',
      idPeriod: 0,
      idUnitMeasurement: 0,
      periodoMeta: 0,
      user: '',
      option: 3
    }

    Swal.fire({
      icon:'question',
      title:'¿ Estas seguro que desear eliminar ?',
      showCancelButton:true,
      confirmButtonText:'Confirmar',
      cancelButtonText:'Cancelar'

    }).then((result)=>{
        if (result.isConfirmed) {

          this.apiContractSvc.maintenanceDetail(deleteDetail).subscribe(()=>{
            
            this.DetailContract =this.DetailContract.filter((item) => item.id !== id);
            
            Swal.fire({
              icon:'success',
              title:'Tipo de Contrato eliminado correctamente',
              confirmButtonText:'Ok'            
            })
  
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
