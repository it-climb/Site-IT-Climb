'use strict';

export const mapStyles = [
    {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [
            {color: '#d3d3d3'},
            {weight: 2}
        ]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
            {visibility: 'off'}
        ]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
            {color: '#d3d3d3'}
        ]
    },
    {
        featureType: 'road.arterial',
        elementType: 'geometry.fill',
        stylers: [
            {color: '#ffffff'}
        ]
    },
    {
        featureType: 'road.arterial',
        elementType: 'geometry.stroke',
        stylers: [
            {color: '#d3d3d3'}
        ]
    },
    {
        featureType: "road.local",
        elementType: "geometry.stroke",
        stylers: [
            {color: '#d3d3d3'},
            {weight: 1}
        ]
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [
            {visibility: "off"}
        ]
    },
    {
        featureType: "poi",
        elementType: "geometry.stroke",
        stylers: [
            {color: '#f6f6f6'},
            {weight: 2}
        ]
    },
    {
        featureType: "poi",
        elementType: "geometry.fill",
        stylers: [
            {color: '#f6f6f6'}
        ]
    },
    {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [
            {"color": "#ffffff"} //should be #f6f6f6
        ]
    },
    {
        featureType: "poi.park",
        elementType: "geometry.stroke",
        stylers: [
            {color: '#00ff00'},
            {weight: 1},
            {saturation: 100}
        ]
    },
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [
            {visibility: "off"}
        ]
    },
    {
        featureType: 'water',
        stylers: [
            {color: '#7bceee'}
        ]
    },
    {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [
            {color: '#f6f6f6'}
        ]
    },
    {
        featureType: 'poi.school',
        elementType: 'geometry',
        stylers: [
            {color: '#f6f6f6'}
        ]
    },
];

export const googleMap = {
    API_KEY: 'AIzaSyAfeXq4gKm6D9NSQ2aFC4wEVC8_f_Vk8Io',
    CALLBACK_NAME: 'initMap'
};