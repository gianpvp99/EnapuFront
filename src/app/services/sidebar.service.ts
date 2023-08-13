import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu:any[]=[{

    dashboard:'Dashboard',
    subdashboard: [
      {dashboard:'Dashboard', url:'dashboard', icono:'nav-icon fas fa-tachometer-alt'},
    ],
    
    catalogo:'Catálogo',
    icono:'nav-icon fas fa-book',
    submenu:[
    
      {catalogo:'Tipo de Contrato', url:'type-contract', icono:'fas fa-file-signature'},
      {catalogo:'Periodo', url:'period', icono:'fas fa-clock'},
      {catalogo:'Unidad', url:'unit', icono:'fas fa-weight-hanging'},

    ],

    gestion:'Gestión',
    icono2:'nav-icon fas fa-cogs',
    submenu2:[
      
      {gestion:'Contrato', url:'contract', icono:'fas fa-copy'}
      
    ],

    reportes:'Reportes',
    icono3:'nav-icon fas fa-file-contract',
    submenu3:[
      
      {reportes:'Reportes Diarios', url:'daily-reports', icono:'far fa-circle'},
      {reportes:'Reportes Mensuales', url:'monthly-reports', icono:'far fa-circle'},
      
    ],

    seguridad:'Seguridad',
    icono4:'nav-icon fas fa-key',
    submenu4:[
      {seguridad:'Rol', url:'role', icono:'fas fa-user-tag'},
      {seguridad:'Usuario', url:'users', icono:'fas fa-users-cog'},
    ]
    
  }
  ]

}
