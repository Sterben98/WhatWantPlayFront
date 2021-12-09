import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';

const routes: Routes = [
  {path: '', component:HomePageComponent},
  { path: 'Games', loadChildren: () => import('./components/games/games.module').then(m => m.GamesModule) },
  { path: 'Consoles', loadChildren: () => import('./components/consoles/consoles.module').then(m => m.ConsolesModule) },
  { path: 'Users', loadChildren: () => import('./components/users/users.module').then(m => m.UsersModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
