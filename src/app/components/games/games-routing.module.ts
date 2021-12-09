import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuardService } from '../users/services/user-guard.service';
import { AllGamePageComponent } from './allGame-page/allGame-page.component';
import { GameFormAddComponent } from './game-form-add/game-form-add.component';
import { GameFormEditComponent } from './game-form-edit/game-form-edit.component';

const routes: Routes = [
  {path:'All', component:AllGamePageComponent},
  {path:'Add', component:GameFormAddComponent, canActivate: [UserGuardService]},
  {path:'Edit/:id', component:GameFormEditComponent, canActivate: [UserGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
