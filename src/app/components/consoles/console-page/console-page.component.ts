import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Console } from '../model/console';
import { ConsoleService } from '../services/console.service';


@Component({
  selector: 'app-console-page',
  templateUrl: './console-page.component.html',
  styleUrls: ['./console-page.component.css']
})
export class ConsolePageComponent implements OnInit {

  consoleToShow?: Console;

  constructor(private route: ActivatedRoute,
    private cs: ConsoleService) {

    cs.getFromId(this.route.snapshot.params['id']).subscribe(
      cns => {
        this.consoleToShow = cns;
      },
      error => { console.log(error) }
    );
  }

  ngOnInit(): void {

  }

}
