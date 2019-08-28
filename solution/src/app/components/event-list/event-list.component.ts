import { Component, OnInit, Input, SimpleChanges, OnChanges, ViewChild, Output, EventEmitter } from '@angular/core';
import { EventsDataService } from '../../services';
import { Table } from 'primeng/components/table/table';
import { Location, Event, Dates } from '../../classes';
import * as moment from "moment";

@Component({
  selector: 'event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnChanges {

  @Input() fromLocation: Location;
  @Input() distance: number;
  @Output() onEventsChanged = new EventEmitter<number[][]>();
  @ViewChild('dt') private _table: Table;

  events: Array<Event>;
  yearsRange: string = '2010:' + (new Date().getFullYear() + 2);

  constructor(
    private eventsDataService: EventsDataService) { }

  ngOnInit() {
    this.registerDateFilter();
    this.distance = this.distance ? this.distance : 1;
  }

  ngOnChanges(changes: SimpleChanges) {
    let chng = changes["fromLocation"];
    let cur = chng.currentValue;
    if (cur) {
      this.getEvents();
    }
  }

  getEvents() {
    if (this.fromLocation) {
      this.eventsDataService.getEventsInRadius(this.fromLocation, this.distance).subscribe(evs => {
        if (evs && evs.length) {
          this.events = evs;
          var LatLong = this.events.map(x => [x.location.latitude, x.location.longitude]);
          if (LatLong.length) {
            this.onEventsChanged.emit(LatLong);
          }
        }
      });
    }
  }


  showDates(dates: Dates) {
    if (dates) {
      let res = "";
      if (dates.startdate && dates.enddate) {
        res = `${moment(dates.startdate).format('DD-MM-YYYY')} - ${moment(dates.enddate).format('DD-MM-YYYY')}`;
      }
      if (dates.singles) {
        dates.singles.forEach(d => res = `${res ? res + ', ' : ''} ${moment(d).format('DD-MM-YYYY')}`);
      }
      return res;
    }
    return "";
  }

  registerDateFilter() {
    if (this._table) {
      this._table.filterConstraints['byMonthYear'] = (value: Dates, filter: Date): boolean => {
        return value.singles && value.singles.length ?
          value.singles.some(d => d.getFullYear() == filter.getFullYear() && d.getMonth() == filter.getMonth()) :
          (value.startdate && value.enddate ? (
            value.startdate.getFullYear() <= filter.getFullYear() && value.startdate.getMonth() <= filter.getMonth() &&
            value.enddate.getFullYear() >= filter.getFullYear() && value.enddate.getMonth() >= filter.getMonth()) : null);
      }
    }
  }

  handleEventsFilter($event, dt: Table) {
    var events = (dt.filteredValue ? dt.filteredValue : dt.value) as Array<Event>;
    if (events && events.length) {
      var itemsLocations = events.filter(i => i.location && i.location.latitude && i.location.longitude);
      if (itemsLocations.length) {
        var LatLong = itemsLocations.map(x => [x.location.latitude, x.location.longitude]);
        this.onEventsChanged.emit(LatLong);
        return;
      }
    }
    this.onEventsChanged.emit(null);
  }
}
