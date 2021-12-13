import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/components/games/model/game';
import { UserService } from '../../users/services/user.service';
import { GameService } from '../services/game.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-allGame-page',
  templateUrl: './allGame-page.component.html',
  styleUrls: ['./allGame-page.component.css']
})
export class AllGamePageComponent implements OnInit, OnDestroy{

  games?: Array<Game>;

  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private gameService: GameService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.dtOptions={};
    this.loadAll();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  loadAll() {
    this.gameService.getAll().subscribe(gm => {
      this.games = gm;
      this.dtTrigger.next(gm);
    }, error => {
      console.log(error);
    });
  }

  delete(gm: Game) {
    if (this.userService.isAuthenticated()) {
      this.gameService.remove(gm).subscribe(gm => {
        console.log('ELEMENTO ELIMINATO');
        this.loadAll();
      }, error => {
        console.log(error);
      });
    } else {
      this.router.navigate(['Users/Login']);
    }
  }
}
