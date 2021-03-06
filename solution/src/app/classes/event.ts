import {Details, Type, Location, Dates, Picture} from './'

export class Event
{
    trcid: string;
    title: string;
    details:Array<{[lang: string]: Details}>;
    types: Array<Type>;
    location: Location;
    lastupdated: Date;
    dates: Dates;
    urls: Array<string>;
    media: Array<Picture>
    startYear: number;
    distance: number;
}