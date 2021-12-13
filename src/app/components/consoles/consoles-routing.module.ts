import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuardService } from '../users/services/user-guard.service';
import { AllConsolePageComponent } from './allConsole-page/allConsole-page.component';
import { ConsoleFormAddComponent } from './console-form-add/console-form-add.component';
import { ConsoleFormEditComponent } from './console-form-edit/console-form-edit.component';
import { ConsolePageComponent } from './console-page/console-page.component';

const routes: Routes = [
  {path:'Add', component:ConsoleFormAddComponent, canActivate: [UserGuardService], data: { roles: ["ROLE_ROOT"] }},
  {path:'Show/:id', component:ConsolePageComponent},
  {path:'Edit/:id', component:ConsoleFormEditComponent, canActivate: [UserGuardService], data: { roles: ["ROLE_ROOT"] }},
  {path:'All', component:AllConsolePageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsolesRoutingModule { }
