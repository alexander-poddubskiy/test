import { Component, OnInit } from '@angular/core';
import { Establishment, Location, Markers, MarkerImage } from '../../classes';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { EstablishmentDataService } from '../../services';
import { SelectItem } from 'primeng/components/common/selectitem';
import { MessageService } from "primeng/components/common/messageservice";
import { Message } from './../../classes/message';

@Component({
  selector: 'establishment-details',
  templateUrl: './establishment-details.component.html',
  styleUrls: ['./establishment-details.component.scss']
})
export class EstablishmentDetailsComponent implements OnInit {

  item: Establishment;
  location: Location;
  images: Array<any>;
  markers: Array<Markers>;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: EstablishmentDataService,
    private msgService: MessageService) {
    this.item = new Establishment();
    this.images = [];
  }


  ngOnInit() {

    this.activatedRoute.params.forEach((params: Params) => {
      let id = params["id"];
      this.dataService
        .getEstablishment(id).subscribe(res => {
          if (res) {
            this.item = res;
            this.location = this.item.location;

            this.loadImages();
            this.loadMarkers();
          }
          else {
            this.msgService.add(Message.Warning('Establishment cannot be found'));
          }
        }
        );
    });
  }

  loadMarkers() {
    if(this.item && this.item.location && this.item.location.latitude && this.item.location.longitude)
    {
      this.markers = [new Markers([[this.item.location.latitude, this.item.location.longitude]], MarkerImage.Red)];
    }
    else
    {
      this.markers = [];
    }
  }

  loadImages() {
    this.images = [];
    if (this.item && this.item.media && this.item.media.length) {
      this.images = this.item.media.sort((a, b) => a.main ? 0 : 1).map(x => { return { source: x.url, title: this.item.title }; });
    }
  }

  onEventsChanged(LatLong: number[][]) {
    this.loadMarkers();
    
    if (LatLong && LatLong.length) {
      this.markers.push(new Markers(LatLong, MarkerImage.Yellow));
    }
  }

  backToAll() {
    this.router.navigate(['/establishments']);
  }
}
