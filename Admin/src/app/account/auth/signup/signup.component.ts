import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';
import { first } from 'rxjs/operators';
import { UserProfileService } from '../../../core/services/user.service';
import { UserService } from 'src/app/core/services/user-service.service';
import { User } from 'src/app/core/models/auth.models';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  submitted = false;
  error = '';
  successmsg = false;
  user=new User();
  
  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
   private service:UserService) { }

    ngOnInit(){
      this.signupForm = this.formBuilder.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        address:[''],
        birthDate:[''],
        cin:[''],
        phone:[''],
      });
    }

    get f() { return this.signupForm.controls; }

  
    onSubmit() {
      this.submitted = true;
      this.user = new User()
      if (this.signupForm.invalid) {
        return;
      }else{
        if (environment.defaultauth === 'firebase') {
          {this.service.Inscription(this.f.value);
            this.successmsg = true;}
            if (this.successmsg) {
              this.router.navigate(['/dashboard']);
            }
          }
          else {
          this.service.Inscription(this.signupForm.value)
            .pipe(first())
            .subscribe(
              data => {
                this.successmsg = true;
                if (this.successmsg) {
                  this.router.navigate(['/account/login']);
                }
              },
              error => {
                this.error = error ? error : '';
              });
        }
      }
    }
  }