import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/AppConstanse';
import { UserService } from '../../users/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }

  isLoggedIn(){
    return this.userService.isAuthenticated();
  }

  logout(): void{
    this.userService.logOut().subscribe( o => {
      
      console.log(JSON.stringify(o));

      localStorage.setItem(AppConstants.LOGIN_STORAGE, '');
      
      this.router.navigate(['Users/Login']);

    }, error => {
      console.error(JSON.stringify(error));
    })

  }

}
