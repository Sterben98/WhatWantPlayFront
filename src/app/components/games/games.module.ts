import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { AllGamePageComponent } from './allGame-page/allGame-page.component';
import { GameFormAddComponent } from './game-form-add/game-form-add.component';
import { GameFormEditComponent } from './game-form-edit/game-form-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    AllGamePageComponent,
    GameFormAddComponent,
    GameFormEditComponent,
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    ReactiveFormsModule,
    GamesRoutingModule
  ]
})
export class GamesModule { }
