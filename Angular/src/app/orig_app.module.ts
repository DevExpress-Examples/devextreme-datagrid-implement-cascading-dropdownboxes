import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  DxDataGridModule
} from "devextreme-angular/ui/data-grid";
import {
  DxDropDownBoxModule
} from "devextreme-angular/ui/drop-down-box";
import {
  DxButtonModule
} from "devextreme-angular/ui/button";
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DxDataGridModule,
    DxDropDownBoxModule,
    DxButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
