import { Component, OnInit } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { defaults as defaultControls, ScaleLine, FullScreen, Control } from "ol/control.js";
import {Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import {drawTools} from '../MapControls/MapControls';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map:Map 
  view:View
  source:VectorSource
  constructor() { }


  

  ngOnInit() {
    const source = new VectorSource({
      wrapX: false
    });
    
    const  vector = new VectorLayer({
      source: source,
    });

    this.map = new Map({
      controls: defaultControls().extend([new ScaleLine(), new FullScreen(), new drawTools({layer:vector,drawTypes:['Polygon','Circle','Line','Point'],top:5.5,left:.5})]),
      layers: [
        
        new TileLayer({
          source: new OSM()
        }),
        vector
      ],
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    })
  }

}

