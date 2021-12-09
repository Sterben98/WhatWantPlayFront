import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { Console } from '../model/console';
import { ConsoleService } from '../services/console.service';

@Component({
  selector: 'app-console-form-edit',
  templateUrl: './console-form-edit.component.html',
  styleUrls: ['./console-form-edit.component.css']
})
export class ConsoleFormEditComponent implements OnInit {

  consoleForm: FormGroup;
  _oldCns?: Console;
  
  constructor(private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private cs: ConsoleService, 
    private router: Router) {

    this.consoleForm= this.fb.group({
      id: [0],
      name: ["", [Validators.required]]
    })

    this.cs.getFromId(this.route.snapshot.params['id']).subscribe(cns => {
      this.oldCns= cns;
    }, error => {
      console.log(error);
    }); 
  }

  set oldCns(c: Console){
    this._oldCns= c;
    this.consoleForm.get("id")?.setValue(c.id);
    this.consoleForm.get("name")?.setValue(c.name);
  }

  ngOnInit(): void {
    
  }

  editConsole(){
    const newCns: Console= this.consoleForm.value;
    this.cs.update(newCns).subscribe(cns => {
      console.log("EDIT COMPLETE!")

      this.consoleForm.reset();

      this.router.navigate(['']);
    }, error => {
      console.log(error);
    });

    
  }
}
