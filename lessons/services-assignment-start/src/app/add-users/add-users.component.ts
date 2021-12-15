import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent {

  constructor(private usersService: UsersService) {}

  createUser(name: string, status: string) {
    if (name && status) {
      this.usersService.addUser(name, status);
    }
  }

}
