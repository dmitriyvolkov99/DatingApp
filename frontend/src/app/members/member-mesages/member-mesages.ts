import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from '../../_services/message.service';
import { Message } from '../../_models/message';
import { CommonModule } from '@angular/common';
import { TimeagoModule } from 'ngx-timeago';

@Component({
  selector: 'app-member-mesages',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TimeagoModule
  ],
  templateUrl: './member-mesages.html',
  styleUrls: ['./member-mesages.css']
})
export class MemberMesages implements OnInit {
  @ViewChild('messageForm') messageForm!: NgForm;
  @Input() username: string = "";
  @Input() messages: Message[] = [];
  messageContent: string = "";

  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
  }


  sendMessage(){
    this.messageService.sendMessage(this.username, this.messageContent).then(() => {
      this.messageForm.reset();
    });
  }
}
