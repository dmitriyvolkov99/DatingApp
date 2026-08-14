import { Component } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HasRoleDirective } from '../_directives/has-role.directive';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BsDropdownModule,
    HasRoleDirective,
    RouterModule
  ],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  model: any = {};

  constructor(
    public accountService: AccountService, 
    private router: Router, 
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
  }

  login(){
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/members');
    }, error => {
      this.toaster.error(error.error);
    });
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
