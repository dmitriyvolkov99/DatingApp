import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabDirective, TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs';
import { take } from 'rxjs/operators';
import { Member } from '../../_models/member';
import { Message } from '../../_models/message';
import { User } from '../../_models/user';
import { MessageService } from '../../_services/message.service';
import { AccountService } from '../../_services/account.service';
import { PresenceService } from '../../_services/presence.service';
import { CommonModule } from '@angular/common';
import { MemberMesages } from '../member-mesages/member-mesages';
import { TimeagoModule } from 'ngx-timeago';


@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [
  CommonModule,
  MemberMesages,
  TimeagoModule,
  TabsModule 
  ],
  templateUrl: './member-detail.html',
  styleUrls: ['./member-detail.css']
})
export class MemberDetail implements OnInit, OnDestroy {
  @ViewChild('memberTabs', {static: false}) memberTabs!: TabsetComponent;
  
  user: User | null = null;
  member!: Member;
  images!: string[];
  messages: Message[] = [];

  activeTab!: TabDirective;
  selectedTab = 0;

  constructor(
    public presence: PresenceService, 
    private route: ActivatedRoute, 
    private messageService: MessageService, 
    private accountService: AccountService,
    private router: Router
  ) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.member = data['member'];
    })
   
    this.route.queryParams.subscribe(params => {
      this.selectedTab = params['tab'] ? +params['tab'] : 0;
    });

    this.images = this.getImages();
  }

  getImages(){
    const imageUrls = [];

    for(const photo of this.member.photos){
      imageUrls.push(photo?.url)
    }

    return imageUrls;
  }

  loadMessages(){
    this.messageService.getMessageThread(this.member.username).subscribe(messages => {
      this.messages = messages;
    })
  }

  onTabActivated(data: TabDirective){
    this.activeTab = data;
    if(this.activeTab.heading === "Messages" && this.messages.length === 0){
      this.messageService.createHubConnection(this.user!, this.member.username);
    }else{
      this.messageService.stopHubConnection();
    }
  }

  selectTab(tabId: number){
    const tabs = this.memberTabs?.tabs;

    if (tabs && tabs[tabId]) {
      tabs[tabId].active = true;
    }
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }
}
