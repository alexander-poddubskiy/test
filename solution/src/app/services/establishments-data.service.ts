//import * as establishments from './assets/establishment-data.json' 
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";

import { Observable } from "rxjs";
import {map, catchError, filter} from 'rxjs/operators';
import { Establishment, Dates, Location } from '../classes';
import { CommonDataService} from './common-data.service';

@Injectable()
export class EstablishmentDataService{

    constructor(private http: Http, private commonDataService: CommonDataService){}
     
 
public getEstablishments(): Observable<Establishment[]>
{
    let est = this.http.get('./assets/establishment-data.json')
        .pipe(map((res) => this.extractEstablishments(res)),
            catchError(this.commonDataService.handleError));
    return est;
}

public getEstablishment(id: string): Observable<Establishment>
{
    
    if(id)
    {
        let itemObservable = new Observable<Establishment>((observer) => {

            this.getEstablishments().subscribe(r =>  
                {
                    observer.next(r.filter(x => x.trcid == id)[0]);
                    //observer.complete();
                }
            )
        })

        return itemObservable;
    }

      
    return new Observable();
}

private extractEstablishments(response: Response) {
    let res = response.json();
    let est: Establishment[] = [];
    for (let i = 0; i < res.length; i++) {
        let e = this.extractEstablishment(res[i]);
        est.push(e);
    }
    return est;
}

private extractEstablishment(item:any) {
        let e: Establishment = new Establishment();
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

