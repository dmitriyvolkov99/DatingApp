import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from '../../_models/member';
import { User } from '../../_models/user';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TimeagoModule } from 'ngx-timeago';
import { PhotoEditor } from '../photo-editor/photo-editor';
import { TabsModule } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    TimeagoModule,
    PhotoEditor,
    TabsModule 
  ],
  templateUrl: './member-edit.html',
  styles: [
  ]
})
export class MemberEdit implements OnInit {
  @ViewChild('editForm') editForm!: NgForm;
  member!: Member;
  user: User | null = null;

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any){
    if(this.editForm.dirty){
      $event.returnValue = true;
    }
  }

  constructor(
    private accountService: AccountService,
    private memberService: MembersService,
    private toaster: ToastrService
  ) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    const username = this.user?.username;
    if (!username) return;

    this.memberService.getMember(username).subscribe(member => {
      this.member = member;
      //console.log(this.member)
    });
    // this.memberService.getMember(this.user!.username).subscribe(member => {
    //   this.member = member;
    // })
  }

  updateMember(){
    this.memberService.updateMember(this.member).subscribe(() => {
      this.toaster.success("Profile updated succesfully")
      this.editForm.reset(this.member);
    });
  }
}
