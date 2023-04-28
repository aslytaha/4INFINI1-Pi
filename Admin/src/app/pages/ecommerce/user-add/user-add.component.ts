import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/auth.models';
import { UserService } from 'src/app/core/services/user-service.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  user: User =new User();
  submitted = false;
 
  constructor( private service:UserService, private router: Router) { }

  ngOnInit(){
  }

  newAdmin(): void {
    this.submitted = false;
    this.user = new User()
   
  }

  
  save() {
    this.service.addUser(this.user).subscribe(data => {
      console.log(data)
      this.user = new User();
      this.gotoList();
    }, 
    error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/userslist']);
  }
}
