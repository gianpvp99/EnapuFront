import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { TypeContractComponent } from './type-contract/type-contract.component';
import { UnitComponent } from './unit/unit.component';
import { PeriodComponent } from './period/period.component';
import { ContractComponent } from './contract/contract.component';
import { DailyReportsComponent } from './daily-reports/daily-reports.component';
import { MonthlyReportsComponent } from './monthly-reports/monthly-reports.component';
import { RoleComponent } from './role/role.component';
import { AuthGuard } from '../guards/auth.guard';

const routes:Routes =[
  {path:'dashboard', component:PagesComponent, canActivate:[AuthGuard],
    children:[
      {path:'dashboard', component:DashboardComponent, data:{titulo:"Dashboard"}},
      {path:'', component:DashboardComponent, data:{titulo:"Estadísticas"}},
      {path:'type-contract', component:TypeContractComponent, data:{titulo:"Tipo de Contrato"}},
      {path:'period', component:PeriodComponent, data:{titulo:"Periodo"}},
      {path:'unit', component:UnitComponent, data:{titulo:"Unidad"}},
      {path:'contract', component:ContractComponent, data:{titulo:"Contrato"}},
      {path:'daily-reports', component:DailyReportsComponent, data:{titulo:"Reportes diarios"}},
      {path:'monthly-reports', component:MonthlyReportsComponent, data:{titulo:"Reportes Mensuales"}},
      {path:'role', component:RoleComponent, data:{titulo:"Rol"}},
      {path:'users', component:UsersComponent, data:{titulo:"Usuarios"}},
    ]
}
]

@NgModule({

  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],

  exports:[RouterModule]
})
export class PagesRoutingModule { }
// export const routingPagesComponents = [DashboardComponent,TypeContractComponent,PeriodComponent,
//   UnitComponent,ContractComponent,DailyReportsComponent,MonthlyReportsComponent,RoleComponent,
//   UsersComponent]
