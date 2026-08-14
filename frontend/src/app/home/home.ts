import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Register } from '../register/register';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    Register
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  registerMode = false;

  constructor() { }

  ngOnInit(): void {
  }
  
  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean){
    this.registerMode = event;
  }

}
