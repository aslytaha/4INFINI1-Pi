import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/auth.models';
import { UserService } from 'src/app/core/services/user-service.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  listUsers : any; 
   user!: User;


   constructor(private userService : UserService) {}

  ngOnInit(): void {
    this.getAllUsers();
    }

  public getAllUsers(){
    this.userService.getAllUsers().subscribe(res => {
      this.listUsers = res
      console.log(this.listUsers)
    })
  }
  
}
