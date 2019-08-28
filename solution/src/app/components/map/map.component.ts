import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { MapService } from './../../services'
import { Markers } from '../../classes';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {

  @Input() markers: Array<Markers>;

  constructor(private mapService: MapService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    let chng = changes["markers"];
    let cur = chng.currentValue;
    if (cur) {
      if (cur.length) {
        this.redrawMap(cur);
      }
      else {
        this.mapService.destroyMap('map');
      }
    }
  }

  redrawMap(markers) {
    this.mapService.initMap('map');
    this.markers.forEach(m => this.mapService.addMapMarkers(m));
  }

}
