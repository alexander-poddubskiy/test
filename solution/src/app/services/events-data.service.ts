//import * as establishments from './assets/establishment-data.json' 
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";

import { Observable } from "rxjs";
import { map, catchError, filter } from 'rxjs/operators';
import { Event, Dates, Location } from '../classes';
import { MapService } from './map.service';
import { CommonDataService } from './common-data.service';

@Injectable()
export class EventsDataService {

    constructor(private http: Http, private commonDataService: CommonDataService, private mapService: MapService) { }

    public getEvents(): Observable<Event[]> {
        let est = this.http.get('./assets/events-data.json')
            .pipe(map((res) => this.extractEvents(res)), catchError(this.commonDataService.handleError));
        return est;
    }

    getDistance(x: Event, location): Event {
        x.distance = this.mapService.getDistance(location.latitude, location.longitude, x.location.latitude, x.location.longitude, 'K');
        return x;
    }

    public getEventsInRadius(location: Location, radius: number): Observable<Event[]> {
        if (radius) {
            let itemObservable = new Observable<Event[]>((observer) => {

                this.getEvents().subscribe(r => {
                    observer.next(r
                        .filter(x => x.location && x.location.latitude && x.location.longitude)
                        .map(x => this.getDistance(x, location))
                        .filter(e => e.distance <= radius).sort((a,b) => a.distance-b.distance));
                    observer.complete();
                }
                )
            })

            return itemObservable;
        }
        return new Observable();
    }


    public getEvent(id: string): Observable<Event> {
        if (id) {
            let itemObservable = new Observable<Event>((observer) => {

                this.getEvents().subscribe(r => {
                    observer.next(r.filter(x => x.trcid == id)[0]);
                    observer.complete();
                }
                )
            })
            return itemObservable;
        }
        return new Observable();
    }

    private extractEvents(response: Response) {
        let res = response.json();
        let est: Event[] = [];
        for (let i = 0; i < res.length; i++) {
            let e = this.extractEvent(res[i]);
            est.push(e);
        }
        return est;
    }

    private extractEvent(item: any) {
        let e: Event = new Event();
        e.trcid = item.trcid;
        e.title = item.title;
        e.types = item.types;
        e.location = this.commonDataService.extractLocation(item.location);
        e.lastupdated = item.lastupdated;
        e.details = item.details;
        e.dates = this.commonDataService.extractDates(item.dates);
        e.urls = item.urls;
        e.media = item.media;
        e.startYear = e.dates && e.dates.startdate ? e.dates.startdate.getFullYear() : null;
        return e;
    }

}

