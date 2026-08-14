import { Component, OnInit } from '@angular/core';
import { PhotoManagement } from '../photo-management/photo-management';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { UserManagement } from '../user-management/user-management';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    UserManagement,
    PhotoManagement,
    TabsModule
  ],
  templateUrl: './admin-panel.html',
  styleUrls: ['./admin-panel.css']
})
export class AdminPanel implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
