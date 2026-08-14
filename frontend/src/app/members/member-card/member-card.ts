import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { PresenceService } from '../../_services/presence.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  templateUrl: './member-card.html',
  styleUrls: ['./member-card.css']
})
export class MemberCard implements OnInit {
  @Input() member!: Member;
  
  faHeart = faHeart;
  faUser = faUser;
  faEnvelope = faEnvelope;

  constructor(private memberService: MembersService, private toaster: ToastrService, public presence: PresenceService) { }

  ngOnInit(): void {
  }

  addLike(member: Member){
    this.memberService.addLike(member.username).subscribe(() =>{
      this.toaster.success("You have liked " + member.knownAs);
    })
  }

}
