import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import {FormsModule} from '@angular/forms';
import {GrowlModule} from 'primeng/growl';

import {EstablishmentModule} from './components/establishment.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    GrowlModule,
    EstablishmentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
