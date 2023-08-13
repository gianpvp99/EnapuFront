import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from 'src/app/services/sidebar.service';

declare var $:any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menuItems?:any[];

  constructor(private SidebarService: SidebarService, private router:Router, private authSvc:AuthService) {
    this.menuItems=this.SidebarService.menu;
    // console.log(this.menuItems)
  }

  ngOnInit(): void {
    $('[data-widget="treeview"]').Treeview('init');
  }
  
  logout(){
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/login');
  }
}
