import Map from 'https://js.arcgis.com/4.19/@arcgis/core/Map.js'
import MapView from "https://js.arcgis.com/4.19/@arcgis/core/views/MapView.js";
import FeatureLayer from "https://js.arcgis.com/4.19/@arcgis/core/layers/FeatureLayer.js";
import Legend from "https://js.arcgis.com/4.19/@arcgis/core/widgets/Legend.js";
import Expand from "https://js.arcgis.com/4.19/@arcgis/core/widgets/Expand.js";
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

// const medalRenderer = {
//     type: 'simple',
//     symbol: {
//         type: 'simple-fill',
//         outline: {
//             color: 'white',
//             width: '1px'
//         }
//     },
//     visualVariables: [
//         {
//             type: 'color',
//             field: 'totalMedal',
//             stops: [
//                 {
//                     value: 0,
//                     color: '#3a4d6b'
//                 }, {
//                     value: 1,
//                     color: '#AD8A56'
//                 }, {
//                     value: 5,
//                     color: '#B4B4B4'
//                 }, {
//                     value: 25,
//                     color: '#AF9500'
//                 }
//             ]
//         }
//     ]
// };

const iconRenderer = {
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
                    color: '#AD8A56'
                }, {
                    value: 18,
                    color: '#B4B4B4'
                }, {
                    value: 35,
                    color: '#AF9500'
                }
            ]
        }
    ]
}

const medalLayer = new FeatureLayer({
    url: 'https://services5.arcgis.com/hZQQbQb2B2y1Wd2F/arcgis/rest/services/countries/FeatureServer/0',
    // renderer: medalRenderer,
    renderer: iconRenderer,
    popupTemplate: {
        title: 'Country: {ADMIN}',
        content: [
            {
                type: "fields",
                fieldInfos: [{
                    fieldName: "totalMedal",
                    label: '<b>🏅 Total</b>'
                }, {
                    fieldName: 'medal_gold',
                    label: '🥇 Gold'

                }, {
                    fieldName: 'medal_silver',
                    label: '🥈 Silver'

                }, {
                    fieldName: 'medal_bronze',
                    label: '🥉 Bronze'
                }]
            }, {
                type: 'text',
                text: '<a href="https://olympics.com/tokyo-2020/olympic-games/en/results/all-sports/medal-standings.htm" target="_blank">More info</a>'
            }
        ]
    }
});

map.addMany([medalLayer]);

const legendWidget = new Legend({
    view: view,
    layerInfos: [{
        layer: medalLayer,
        title: 'Countries'
    }],
    container: document.createElement('div')
});

var legendExpand = new Expand({
    view: view,
    content: legendWidget
});

view.ui.add(legendExpand, "bottom-right");


document.getElementById("infoIcon").addEventListener("click", () => document.getElementById('modalInfo').active = true);
