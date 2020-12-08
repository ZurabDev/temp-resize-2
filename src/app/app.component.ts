import {Component, OnInit} from '@angular/core';
import { ResizeService } from './@module/rezize/@sub/@service/resize/resize.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular 5';

  constructor(
      private resizeService: ResizeService
  ) {
  }

  ngOnInit(): void {
  }


}
