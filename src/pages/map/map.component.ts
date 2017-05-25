import { MapService } from './../../services/mapservice.service';

import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  public map: any;
  public seedsData: any = [];
  public mapboxAccessToken: string = 'pk.eyJ1IjoiYW5pbHBhdGh1cmkiLCJhIjoiY2oybDhmcWF0MDAwMDJxcWtzMDgwZWI3cyJ9.hzryXsu_ec_AafR-QzzVUQ';
  public mapData: any = {}

  constructor(public mapService: MapService) { }

  ngOnInit() {
    this.map = L.map('map')
      .setView([37.8, -96], 4);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + this.mapboxAccessToken, {
      id: 'mapbox.light',
      attribution: '<a href="http://openstreetmap.org">Open Street Map</a>'
    }).addTo(this.map);
    this.getSeedsData();
  }



  getMapData() {
    this.mapService.getMapData()
      .subscribe(
      data => {
        this.mapData.type = "FeatureCollection";
        this.mapData.features = [];
        for (let i = 0; i < data.features.length; i++) {
          let features: any = data.features || [];
          let feature: any = features[i] || {};
          let properties = feature.properties || {};
          let geoId = properties.GEO_ID || "";
          let res = geoId.split("US");
          if (res[1]) {
            if (this.seedsData[res[1]]) {
              feature.change = this.seedsData[res[1]].change
              this.mapData.features.push(feature);
            }
          }
        }
        L.geoJSON(this.mapData, { style: this.countiestyle }).addTo(this.map);
      },
      error => {
        console.log(error)
      }
      );
  }

  countiestyle(feature) {
    return {
      fillColor: feature.change > 0 ? '#ff0000' : '#008000',
      weight: 0,
      fillOpacity: 0.7
    };
  }

  getSeedsData() {
    this.mapService.getSeedsData()
      .subscribe(
      data => {
        this.seedsData = data;
        this.getMapData();
      },
      error => {
        console.log(error)
      }
      );
  }



}
