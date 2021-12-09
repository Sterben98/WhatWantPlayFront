import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/AppConstanse';
import { LoginData } from 'src/app/components/users/model/LoginData';
import { FeedbackEvent } from 'src/app/model/FeedbackEvent';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginData: LoginData;

  feedback?: FeedbackEvent

  constructor(private userService: UserService, private router: Router) {
    this.loginData={username: "", password: ""};
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.userService.signIn(this.loginData).subscribe(res => {
      
      console.log(JSON.stringify(res));
      localStorage.setItem(AppConstants.LOGIN_STORAGE, JSON.stringify(res));
      this.router.navigate(['']);

    }, error =>{

      this.feedback={message: "Username e Password errati!", success:false};
      this.router.navigate(['Login']);
      console.error(JSON.stringify(error));
      
    });
  }
}
