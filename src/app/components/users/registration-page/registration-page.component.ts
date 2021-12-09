import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  userForm: FormGroup;

  constructor(private fb: FormBuilder,
    private us: UserService,
    private router: Router) {

    this.userForm= this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: new FormControl('', {updateOn: 'blur', asyncValidators: this.us.checkUsername(), validators: Validators.required}),
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    
  }

  saveUser(){
    const usr: User= this.userForm.value;

    this.us.signUp(usr).subscribe(usr => {

      console.log("REGISTRATION COMPLETE!");
      this.userForm.reset();
      this.router.navigate(['']);

    }, error => {

      console.error(error);
      
    })
  }
}
