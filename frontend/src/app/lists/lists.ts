import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/member';
import { Pagination } from '../_models/paginations';
import { MembersService } from '../_services/members.service';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MemberCard } from '../members/member-card/member-card';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    MemberCard,
    ButtonsModule
  ],
  templateUrl: './lists.html',
  styleUrls: ['./lists.css']
})
export class Lists implements OnInit {
  members!: Member[]
  predicate = "liked";
  pageNumber = 1;
  pageSize = 5;
  pagination!: Pagination;

  constructor(private memberService: MembersService) { }

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes(){
    this.memberService.getLikes(this.predicate,this.pageNumber, this.pageSize).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
    })
  }

  pageChanged(event: any){
    this.pageNumber = event.page;
    this.loadLikes();
  }

}
