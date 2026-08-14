import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User, UserRoles } from '../../_models/user';
import { AdminService } from '../../_services/admin.service';
import { RolesModal } from '../../modals/roles-modal/roles-modal';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './user-management.html',
  styleUrls: ['./user-management.css']
})
export class UserManagement implements OnInit {
  users!: User[]
  bsModalRef!: BsModalRef;

  constructor(private adminService: AdminService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles(){
    this.adminService.getUsersWithRoles().subscribe(users => {
      this.users = users;
    })
  }

  openRolesModal(user: User){
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        user,
        roles: this.getRolesArray(user)
      }
    }

    this.bsModalRef = this.modalService.show(RolesModal, config);
    this.bsModalRef.content.updateSelectedRoles.subscribe((values: UserRoles[]) => {
      const rolesToUpdate = {
        roles: [...values.filter(el => el.checked === true).map(el => el.name)]
      }

      if(rolesToUpdate){
        this.adminService.updateUserRoles(user.username, rolesToUpdate.roles).subscribe(() => {
          user.roles = [...rolesToUpdate.roles];
        })
      }
    });
  }

  getRolesArray(user: User){
    const roles: UserRoles[] = [];
    const userRoles = user.roles;
    const availableRoles: any[] = [
      {name: 'Admin', value: 'Admin'},
      {name: 'Moderator', value: 'Moderator'},
      {name: 'Member', value: 'Member'},
    ]

    availableRoles.forEach(role =>{
      let isMatch = false;
      for(const userRole of userRoles){
        if(role.name === userRole){
          isMatch = true;
          role.checked = true;
          roles.push(role);
          break;
        }
      }

      if(!isMatch){
        role.checked = false;
        roles.push(role);
      }
    })

    return roles;
  }
}
