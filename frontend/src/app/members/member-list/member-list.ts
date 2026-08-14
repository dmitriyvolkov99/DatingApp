import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Member } from '../../_models/member';
import { Pagination } from '../../_models/paginations';
import { UserParams } from '../../_models/userParams';
import { User } from '../../_models/user';
import { MembersService } from '../../_services/members.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { MemberCard } from '../member-card/member-card';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    MemberCard,
    ButtonsModule,
    RouterModule
  ],
  templateUrl: './member-list.html',
  styleUrls: ['./member-list.css']
})
export class MemberList implements OnInit {
  members!: Member[];
  pagination!: Pagination;
  userParams: UserParams;
  user!: User;
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}]

  pageNumber = 1;
  pageSize = 5;

  constructor(private memberService: MembersService) { 
    this.userParams = this.memberService.getUserParams();
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(){
    this.memberService.setUserParams(this.userParams);

    this.memberService.getMembers(this.userParams).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
      //console.log("MEMBERS-LIST RESULT", this.pagination)
    })
  }

  resetFilters(){
    this.userParams = this.memberService.resetUserParams();
    this.loadMembers();
  }

  pageChanged(event: any){
    this.userParams.pageNumber = event.page;
    this.memberService.setUserParams(this.userParams);
    this.loadMembers();
  }
}
