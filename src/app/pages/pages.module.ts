import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { TypeContractComponent } from './type-contract/type-contract.component';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { UnitComponent } from './unit/unit.component';
import { PeriodComponent } from './period/period.component';
import { ContractComponent } from './contract/contract.component';
import { DailyReportsComponent } from './daily-reports/daily-reports.component';
import { MonthlyReportsComponent } from './monthly-reports/monthly-reports.component';
import { RoleComponent } from './role/role.component';
import { ImportsJSService } from '../services/imports-js.service';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DashboardComponent,
    TypeContractComponent,
    PeriodComponent,
    UnitComponent,
    ContractComponent,
    DailyReportsComponent,
    MonthlyReportsComponent,
    RoleComponent,
    UsersComponent,
    PagesComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    DataTablesModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports:[
    DashboardComponent,
    TypeContractComponent,
    PeriodComponent,
    UnitComponent,
    ContractComponent,
    DailyReportsComponent,
    MonthlyReportsComponent,
    RoleComponent,
    UsersComponent,

  ],
  providers: [
    ImportsJSService
  ]
})
export class PagesModule { }
