import Map from 'https://js.arcgis.com/4.19/@arcgis/core/Map.js'
import MapView from "https://js.arcgis.com/4.19/@arcgis/core/views/MapView.js";
import FeatureLayer from "https://js.arcgis.com/4.19/@arcgis/core/layers/FeatureLayer.js";
import Legend from "https://js.arcgis.com/4.19/@arcgis/core/widgets/Legend.js";
import esriConfig from "https://js.arcgis.com/4.19/@arcgis/core/config.js";

esriConfig.apiKey = "AAPK910bc52162d04535b4b2e399d655b842-B8-L-B-bSHMrLN2KVLmjffN-wrL_S3hXWvzpGoUceNidwHU5YxKxYF9dcKDp9xH";


const map = new Map({
    basemap: "arcgis-dark-gray"
});

const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-8.710888, 42.317804], // long y lat
    zoom: 3
});

const medalRenderer = {
    type: 'simple',
    symbol: {
        type: 'simple-fill',
        outline: {
            color: 'white',
            width: '1px'
        }
    },
    visualVariables: [
        {
            type: 'color',
            field: 'totalMedal',
            stops: [
                {
                    value: 0,
                    color: '#3a4d6b'
                }, {
                    value: 1,
                    color: '#CD7F32'
                },{
                    value: 4,
                    color: '#D3D3D3'
                }, {
                    value: 22,
                    color: '#FFD700'
                }
            ]
        }
    ]
};

const medalLayer = new FeatureLayer({
    url: 'https://services5.arcgis.com/hZQQbQb2B2y1Wd2F/arcgis/rest/services/countries/FeatureServer/0',
    renderer: medalRenderer,
    popupTemplate: {
        title: 'Country: {ADMIN}',
        content: [{
            type: 'fields',
            fieldInfos: [{
                fieldName: "totalMedal",
                label: '🏅 Total'
            },{
                fieldName: 'medal_gold',
                label: '🥇 Gold'
            
            },{
                fieldName: 'medal_silver',
                label: '🥈 Silver'
           
            },{
                fieldName: 'medal_bronze',
                label: '🥉 Bronze'
            }]
        }]
    }
});


map.addMany([medalLayer]);

const legendWidget = new Legend({
    view: view,
    layerInfos: [{
        layer: medalLayer,
        title: 'Countries'
    }]
});

view.ui.add(legendWidget, 'bottom-right');
