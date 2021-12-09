import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Game } from 'src/app/components/games/model/game';
import { Console } from '../../consoles/model/console';
import { ConsoleService } from '../../consoles/services/console.service';
import { GameService } from '../services/game.service';
@Component({
  selector: 'app-game-form-add',
  templateUrl: './game-form-add.component.html',
  styleUrls: ['./game-form-add.component.css']
})
export class GameFormAddComponent implements OnInit {

  gameForm: FormGroup
  consoles?: Array<Console>;

  constructor(private fb: FormBuilder,
    private gs: GameService,
    private router: Router,
    private consoleService: ConsoleService) {

    this.gameForm = this.fb.group({
      id: [0],
      version: [0],
      title: ["", [Validators.required]],
      description: ["", [Validators.required]],
      vote: [0],
      consoles: []
    })
  }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.consoleService.getAll().subscribe(cns => {
      this.consoles = cns;
    }, error => {
      console.log(error);
    });
  }

  saveGame() {
    const gm: Game = this.gameForm.value;

    this.gs.add(gm).subscribe(gm => {

      console.log('ADD COMPLETE!')

      this.gameForm.reset();

      this.router.navigate(['']);

    }, error => {
      console.log(error);
    });


  }

}
