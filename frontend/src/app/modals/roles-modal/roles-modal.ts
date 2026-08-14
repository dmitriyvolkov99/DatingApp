import { Component, EventEmitter, Input } from '@angular/core';
import { User, UserRoles } from '../../_models/user';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-roles-modal',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './roles-modal.html',
  styleUrl: './roles-modal.css',
})
export class RolesModal {
  @Input() updateSelectedRoles = new EventEmitter();
  user!: User;
  roles: UserRoles[] = [];

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  updateRoles(){
    this.updateSelectedRoles.emit(this.roles);
    this.bsModalRef.hide();
  }

}
