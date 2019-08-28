To implement the task I used Visual Studio Code. To run the solution you may use it and 'ng serve --open' command in its terminal

This requirement from 'Bonus goal 2' was not clear:
- 'Show nearby (< 1km) events on the map for the selected restaurant. Events should be ordered by the distance from the restaurant/cafe/bar.'
as we cannot show markers on the map in some specific order. As solution I show events on the map and sort them in table by distance from the
establishment. An extra column for showing distance was added for that.
About that part - 'Show nearby (< 1km) events on the map for the selected restaurant' - as many establishments don't have events in radius of 1km
I added this value as parameter for events-list component. Current value is 10 km.:
<event-list [fromLocation]="location" [distance]="10" (onEventsChanged)="onEventsChanged($event)"></event-list>
        

There were no requirements how the app should work in mobile browsers so I didn't apply any specific styles for that. 
If that need to be implemented also I can add some fixes then.

There were no specific requirements about maps I should use in the app so I chose free solution based on Open Street Maps. 
I didn't work with them earlier but with Google Maps and BING Maps only - I decided to use OSM as they are free.
Also I show markers on the map just as dots without any text as there were no requirements about that.

Kind Regards,
Alexander