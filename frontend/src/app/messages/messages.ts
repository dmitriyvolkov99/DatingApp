import { Component } from '@angular/core';
import { Message } from '../_models/message';
import { Pagination } from '../_models/paginations';
import { MessageService } from '../_services/message.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { RouterModule } from '@angular/router';
import { TimeagoModule } from 'ngx-timeago';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    RouterModule,
    TimeagoModule,
    ButtonsModule
  ],
  templateUrl: './messages.html',
  styleUrl: './messages.css',
})
export class Messages {
  messages: Message[] = [];
  pagination!: Pagination;
  container = 'Unread';
  pageNumber = 1;
  pageSize = 5;
  loading = false;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  deleteMessage(id: number){
    this.messageService.deleteMessage(id).subscribe(() => {
      this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
    })
  }

  loadMessages(){
    this.loading = true;
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe(response => {
      this.messages = response.result;
      this.pagination = response.pagination;
      this.loading = false;
    });
  }

  pageChanged(event: any){
    this.pageNumber = event.page;
    this.loadMessages();
  }

}
