import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/app/components/games/model/game';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game-form-edit',
  templateUrl: './game-form-edit.component.html',
  styleUrls: ['./game-form-edit.component.css']
})
export class GameFormEditComponent implements OnInit {

  gameForm: FormGroup;
  _oldGm?: Game;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private gs: GameService,
    private router: Router) {

    this.gameForm = this.fb.group({
      id: [0],
      version: [0],
      title: ["", [Validators.required]],
      description: ["", [Validators.required]],
      vote: [0]
    })

    this.gs.getFromId(route.snapshot.params['id']).subscribe(gm => {

      this.oldGm= gm;

    }, error => {

      console.log(error);

    });
  }

  set oldGm(g: Game){
    this._oldGm= g;
    this.gameForm.get("id")?.setValue(g.id);
    this.gameForm.get("version")?.setValue(g.version);
    this.gameForm.get("title")?.setValue(g.title);
    this.gameForm.get("description")?.setValue(g.description);
    this.gameForm.get("vote")?.setValue(g.vote);
  }

  ngOnInit(): void {
  }

  editGame(){
    const newGm: Game= this.gameForm.value;

    this.gs.update(newGm).subscribe(gm => {

      console.log("EDIT COMPLETE!")
      this.gameForm.reset();
      this.router.navigate(['']);

    }, error => {

      console.log(error);

    });
  }

}
