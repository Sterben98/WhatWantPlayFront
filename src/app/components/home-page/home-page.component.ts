import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/components/games/model/game';
import { Console } from '../consoles/model/console';
import { ConsoleService } from '../consoles/services/console.service';
import { GameService } from '../games/services/game.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  consoles?: Array<Console>;
  games: Array<Game>
  bestGames: Array<Game>
  showGames: Array<Game>

  constructor(private consoleService: ConsoleService, private gameService: GameService) {
    this.bestGames= new Array<Game>();
    this.games= new Array<Game>();
    this.showGames= new Array<Game>();
  }

  ngOnInit(): void {
    this.loadAllConsole();
    this.loadAllGame();
  }

  loadAllConsole() {
    this.consoleService.getAll().subscribe(cns => {
      this.consoles = cns;
    }, error => { 
      console.log(error);
    });
  }

  loadAllGame() {
    this.gameService.getAll().subscribe(gm => {
      this.games = gm;
      this.findToShow();
      this.findTheBest();
    }, error => { 
      console.log(error);
    });
  }

  findToShow(){
    for(let i: number=0; i<10 && i<this.games.length; i++){
      this.showGames.push(this.games[i]);
    }
  }

  findTheBest(){
    this.games.sort((a, b) => b.vote-a.vote);

    for(let i: number=0; i<6; i++){
      this.bestGames.push(this.games[i]);
    }
  }
}
