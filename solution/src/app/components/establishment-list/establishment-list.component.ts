import { Component, OnInit } from '@angular/core';
import { EstablishmentDataService } from './../../services'
import { Establishment, Markers, MarkerImage } from '../../classes';
import { SelectItem } from 'primeng/components/common/selectitem';
import { MessageService } from "primeng/components/common/messageservice";
import { Message } from './../../classes/message';
import { Router } from "@angular/router";
import { Table } from 'primeng/table';

@Component({
  selector: 'establishment-list',
  templateUrl: './establishment-list.component.html',
  styleUrls: ['./establishment-list.component.scss']
})
export class EstablishmentListComponent implements OnInit {
  items: Establishment[];
  citiesDS: SelectItem[];
  yearsDS: SelectItem[];
  modes: SelectItem[];
  mapMode: boolean;
  markers: Markers[];

  constructor(
    private dataService: EstablishmentDataService,
    private router: Router,
    private msgService: MessageService) {
    this.modes = [{ label: 'Table', value: false }, { label: 'Map', value: true }];
    this.mapMode = false;
  }

  ngOnInit() {
    this.citiesDS = [];
    this.yearsDS = [];
    this.loadEstablishments();
  }

  private loadEstablishments() {
    this.dataService.getEstablishments().subscribe(
      est => {
        if (est && est.length) {
          this.items = est;
          this.loadYears();
          this.loadCities();
        }
      },
      error => this.msgService.add(Message.Error(error))
    );
  }

  private loadYears() {
    this.yearsDS = [];

    if (this.items && this.items.some(i => i.startYear != null)) {
      this.items.filter(s => s.startYear != null).sort((a, b) => a.startYear - b.startYear).forEach(i => {
        if (!this.yearsDS.some(c => c.value == i.startYear))
          this.yearsDS.push({ label: i.startYear.toString(), value: i.startYear })
      });
    }
  }

  private loadCities() {
    this.citiesDS = [];

    if (this.items) {
      this.items.forEach(i => {
        if (i.location && i.location.city && !this.citiesDS.some(c => c.value == i.location.city))
          this.citiesDS.push({ label: i.location.city, value: i.location.city })
      });
    }
  }

  onRowSelect(event: any) {
    let item = event.data as Establishment;
    this.router.navigate(['establishment', item.trcid]);
  }

  handleChangeMode(event: any, dt: Table) {
    if (this.mapMode) {
      //timeout as we need to wait when the map control becomes visible
      setTimeout(() => {
        var items = (dt.filteredValue ? dt.filteredValue : dt.value) as Array<Establishment>;
        var LatLong = null;
        if (items && items.length) {
          var itemsLocations = items.filter(i => i.location && i.location.latitude && i.location.longitude);
          if (itemsLocations.length) {
            LatLong = itemsLocations.map(x => [x.location.latitude, x.location.longitude]);
          }
        }
        if (LatLong && LatLong.length) {
          this.markers = [new Markers(LatLong, MarkerImage.Red)];
        }
      }, 500)
    }
    else {
      this.markers = [];
    }
  }
}
