import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Console } from '../model/console';
import { ConsoleService } from '../services/console.service';

@Component({
  selector: 'app-console-form-add',
  templateUrl: './console-form-add.component.html',
  styleUrls: ['./console-form-add.component.css']
})
export class ConsoleFormAddComponent implements OnInit {

  consoleForm: FormGroup;

  constructor(private fb: FormBuilder, 
    private cs: ConsoleService, 
    private router: Router) {

    this.consoleForm= this.fb.group({
      id: [0],
      version: [0],
      name: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  saveConsole(){
    const cns: Console= this.consoleForm.value;

    this.cs.add(cns).subscribe(cns => {
      
      console.log(`ADD COMPLETE!`)

      this.consoleForm.reset();

      this.router.navigate(['']);

    }, error => { 
      console.log(error);
    });

    
  }
}
