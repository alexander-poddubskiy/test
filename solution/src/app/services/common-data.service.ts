import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";

import { Observable } from "rxjs";
import { map, catchError, filter } from 'rxjs/operators';
import { Dates, Location } from '../classes';

@Injectable()
export class CommonDataService {

    constructor(private http: Http) { }

    extractLocation(location: any): Location {
        if (location) {
            let loc = location as Location;
            if (location.latitude && location.longitude) {
                loc.latitude = parseFloat(location.latitude.replace(',', '.'));
                loc.longitude = parseFloat(location.longitude.replace(',', '.'));
            }
            return loc;
        }
        return null;
    }

    formDate(dayMonthYear: string): Date
    {
        var partsStart = dayMonthYear ? dayMonthYear.split('-') : null;
        if (partsStart)
            return new Date(+partsStart[2],  +partsStart[1] - 1,+partsStart[0]);
        return null;
    }

    extractDates(dates: any): Dates {
        if (dates) {
            let singles: Array<Date> = [];

            var dStart = this.formDate(dates.startdate);
            
            var dEnd = this.formDate(dates.enddate);

            var dSingles = null;
            if (dates.singles) {
                dates.singles.forEach(s => {
                    var date = this.formDate(s);
                    if (date)
                        singles.push(date);
                })
            };


            if (dStart || dEnd || singles.length) {
                let estDates = new Dates();
                estDates.startdate = dStart;
                estDates.enddate = dEnd;
                estDates.singles = singles;

                return estDates;
            }
        }
        return null;
    }

    handleError(error: any, cought: Observable<any>): any {
        let message = "";

        if (error instanceof Response) {
            let errorData = error.json().error || JSON.stringify(error.json());
            message = `${error.status} - ${error.statusText || ''} ${errorData}`
        } else {
            message = error.message ? error.message : error.toString();
        }

        console.error(message);

        return Observable.throw(message);
    }

}

