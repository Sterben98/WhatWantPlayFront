import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../users/services/user.service';
import { Console } from '../model/console';
import { ConsoleService } from '../services/console.service';


@Component({
  selector: 'app-allConsole-page',
  templateUrl: './allConsole-page.component.html',
  styleUrls: ['./allConsole-page.component.css']
})
export class AllConsolePageComponent implements OnInit {

  consoles?: Array<Console>;

  constructor(private consoleService: ConsoleService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.consoleService.getAll().subscribe(cns => {
      this.consoles = cns;
      console.log(JSON.stringify(this.consoles));
    }, error => {
      console.log(error);
    });
  }

  delete(cns: Console) {
    if (this.userService.isAuthenticated()) {
      this.consoleService.remove(cns).subscribe(cns => {
        console.log(`ELEMENTO ELIMINATO`);
        this.loadAll();
      }, error => {
        console.log(error);
      });
    } else {
      this.router.navigate(['Users/Login']);
    }
  }

}
