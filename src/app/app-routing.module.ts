import { NgModule } from '@angular/core'; // Importar NgModule para definir los módulos en Angular
import { Routes, RouterModule } from '@angular/router'; // Importar Routes y RouterModule para definir y configurar las rutas de la app
import { NopageFoundComponent } from './nopage-found/nopage-found.component'; // Importar CommonModule componente para mostrar una página no encontrada, cuando ninguna ruta existe 
import { CommonModule } from '@angular/common'; // Importar CommonModule para proporcionar directivas comones como ngIf y ngFor
import { PagesRoutingModule } from './pages/pages-routing.module'; // Importar PagesRoutingModule desde el archivo /pages-routing.module rutas especìficas de la carpeta 'pages'
import { AuthRoutingModule } from './auth/auth-routing.module'; // Importar AuthRoutingModule desde el archivo /auth-routing.module  rutas especìficas de la carpeta 'auth'

const routes: Routes = [
  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path:'**', component:NopageFoundComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],

  exports:[RouterModule]
  
})
export class AppRoutingModule { }
