import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsolesRoutingModule } from './consoles-routing.module';
import { ConsoleFormAddComponent } from './console-form-add/console-form-add.component';
import { ConsoleFormEditComponent } from './console-form-edit/console-form-edit.component';
import { AllConsolePageComponent } from './allConsole-page/allConsole-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConsolePageComponent } from './console-page/console-page.component';

@NgModule({
  declarations: [
    ConsoleFormAddComponent,
    ConsoleFormEditComponent,
    ConsolePageComponent,
    AllConsolePageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ConsolesRoutingModule
  ]
})
export class ConsolesModule { }
