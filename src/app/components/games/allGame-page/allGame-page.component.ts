import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/components/games/model/game';
import { UserService } from '../../users/services/user.service';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-allGame-page',
  templateUrl: './allGame-page.component.html',
  styleUrls: ['./allGame-page.component.css']
})
export class AllGamePageComponent implements OnInit {

games?: Array<Game>;

  constructor(private gameService: GameService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.gameService.getAll().subscribe(gm => {
      this.games = gm;
    }, error => { 
      console.log(error);
    });
  }

  delete(gm: Game){
    if (this.userService.isAuthenticated()) {
    this.gameService.remove(gm).subscribe(gm =>{
      console.log('ELEMENTO ELIMINATO');
      this.loadAll();
    }, error =>{
      console.log(error);
    });
  }else{
    this.router.navigate(['Users/Login']);
  }
  }
}
