import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { TestComponent } from './test.component';
import {ResizeModule} from "./@module/rezize/resize.module";

@NgModule({
  imports:      [ BrowserModule, FormsModule, ResizeModule.forRoot(
      {
        medium: 600,
        large: 1000
      },
      25
  ) ],
  declarations: [ AppComponent, HelloComponent, TestComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
