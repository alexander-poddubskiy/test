import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { EstablishmentListComponent, EstablishmentDetailsComponent } from "./index";
import { EstablishmentRoutingModule } from "./establishment-routing.module";

import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { EstablishmentDataService, EventsDataService, MapService, CommonDataService } from './../services';
import { SliderModule } from 'primeng/slider';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CalendarModule } from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
import { MessageService } from "primeng/components/common/messageservice";
import {ButtonModule} from 'primeng/button';
import {GalleriaModule} from 'primeng/galleria';
import {CardModule} from 'primeng/card';
import { EventListComponent } from './event-list/event-list.component';
import { MapComponent } from './map/map.component';

@NgModule({
    imports: [
        CommonModule,
        EstablishmentRoutingModule,
        TableModule,
        MultiSelectModule,
        SliderModule,
        SelectButtonModule,
        InputSwitchModule,
        FormsModule,
        InputTextModule,
        ButtonModule,
        CalendarModule,
        CardModule,
        GalleriaModule
    ],
    declarations: [
        EstablishmentListComponent,
        EstablishmentDetailsComponent,
        EventListComponent,
        MapComponent
    ],
    providers: [EstablishmentDataService, EventsDataService, MapService, CommonDataService,MessageService]
})
export class EstablishmentModule { }