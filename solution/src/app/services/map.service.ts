import { Injectable } from "@angular/core";
import { Markers } from "../classes";
declare var ol: any;
@Injectable()
export class MapService {
    map: any;

    constructor() { }

    initMap(target: string) {
        this.initMapWithCenter(target, null, null);
    }

    initMapWithCenter(target, lat: number, long: number) {
        this.destroyMap(target);
        this.map = new ol.Map({
            target: target,
            controls: ol.control.defaults({
                attributionOptions: {
                    collapsible: false
                }
            }),//.extend([mousePositionControl]),
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([long, lat]),
                zoom: 8
            })
        });
    }

    setCenterForMarkers(LatLong) {
        var center = this.getLatLngCenter(LatLong);
        if (center.length) {
            var view = this.map.getView();
            view.setCenter(ol.proj.fromLonLat([center[1], center[0]]));
            view.setZoom(11);
        }
    }

    private rad2degr(rad) { return rad * 180 / Math.PI; }
    private degr2rad(degr) { return degr * Math.PI / 180; }

    /**
     * @param latLngInDeg array of arrays with latitude and longtitude
     *   pairs in degrees. e.g. [[latitude1, longtitude1], [latitude2
     *   [longtitude2] ...]
     *
     * @return array with the center latitude longtitude pairs in 
     *   degrees.
     */
    private getLatLngCenter(latLngInDegr) {
        var LATIDX = 0;
        var LNGIDX = 1;
        var sumX = 0;
        var sumY = 0;
        var sumZ = 0;

        for (var i = 0; i < latLngInDegr.length; i++) {
            var lat = this.degr2rad(latLngInDegr[i][LATIDX]);
            var lng = this.degr2rad(latLngInDegr[i][LNGIDX]);
            // sum of cartesian coordinates
            sumX += Math.cos(lat) * Math.cos(lng);
            sumY += Math.cos(lat) * Math.sin(lng);
            sumZ += Math.sin(lat);
        }

        var avgX = sumX / latLngInDegr.length;
        var avgY = sumY / latLngInDegr.length;
        var avgZ = sumZ / latLngInDegr.length;

        // convert average x, y, z coordinate to latitude and longtitude
        var lng = Math.atan2(avgY, avgX);
        var hyp = Math.sqrt(avgX * avgX + avgY * avgY);
        var lat = Math.atan2(avgZ, hyp);

        return ([this.rad2degr(lat), this.rad2degr(lng)]);
    }


    addMapMarkers(markers: Markers, isEvent: boolean = false) {
        var vectorLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: markers.Points.map(g => new ol.Feature({
                    geometry: new ol.geom.Point(ol.proj.transform([g[1], g[0]], 'EPSG:4326', 'EPSG:3857')),
                }))
            }),
            style: new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 0.5],
                    anchorXUnits: "fraction",
                    anchorYUnits: "fraction",
                    src: markers.Image
                })
            })
        });
        this.map.addLayer(vectorLayer);

        this.setCenterForMarkers(markers.Points);
    }

    destroyMap(target) {
        if (document.getElementById(target)) {
            document.getElementById(target).innerHTML = '';
        }
    }

    getDistance(lat1, lon1, lat2, lon2, unit): number {
        var radlat1 = Math.PI * lat1 / 180
        var radlat2 = Math.PI * lat2 / 180
        var theta = lon1 - lon2
        var radtheta = Math.PI * theta / 180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist)
        dist = dist * 180 / Math.PI
        dist = dist * 60 * 1.1515
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        return dist
    }
}