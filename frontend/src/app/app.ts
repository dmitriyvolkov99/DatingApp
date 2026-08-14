import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccountService } from './_services/account.service';
import { PresenceService } from './_services/presence.service';
import { User } from './_models/user';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Nav } from './nav/nav';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NgxSpinnerModule,
    Nav,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  //protected readonly title = signal('frontend');
    title = 'client';
  users: any;

  constructor(private accountService: AccountService, private presence: PresenceService){

  }
  ngOnInit() {
    this.setCurrentUser();
  }
  
  setCurrentUser(){
    const userJson = localStorage.getItem('user');
    const user: User | null = userJson ? JSON.parse(userJson) : null;
    
    if(user){
      this.accountService.setCurrentUser(user);
      this.presence.createHubConnection(user);
    }

  }
}
