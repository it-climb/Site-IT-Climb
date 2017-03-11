'use strict';

import React, {PropTypes, Component} from 'react';
import {renderToString} from 'react-dom/server';
import * as Config from './config';
import markerMapper from './map-markers-reduce';
import MarkerPopup from './markerPopup';

const defaultCenter = {lat: 26.118409, lng: -80.144263};
const defaultZoom = 18;

class Map extends Component {

    static defaultProps = {
        markers: [],
        coordinates: [],
        centeredMarker: {}
    };

    constructor(props) {
        super(props);

        this.state = {
            zoom: defaultZoom,
            map: null,
            markers: []
        };

        this.initMap = () => {
            const map = new google.maps.Map(
                document.querySelector('#google_map'),
                {
                    zoom: this.state.zoom,
                    center: defaultCenter,
                    streetViewControl: false,
                    scrollwheel: false,
                    minZoom: 14,
                    maxZoom: 20
                }
            );

            map.set('styles', Config.mapStyles);

            this.setState({map}, ()=> {
                this.drawMarkers();
                this.drawCoordinates();
            });
        };

        this.drawMarkers = () => {
            this.state.markers.forEach(marker=>marker.setMap(null));
            const markers = markerMapper(this.props.routes);
            function toggleBounce(marker) {
                if (marker.getAnimation() !== null) {
                    marker.setAnimation(null);
                } else {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                }
            }
            this.setState({
                markers: markers.map((markerObj, index)=> {

                    const marker = new google.maps.Marker({
                        position: {lat: markerObj.location.lat, lng: markerObj.location.lng},
                        map: this.state.map,
                        draggable: false,
                        animation: google.maps.Animation.DROP,
                        icon: markerObj.icon,
                        zIndex: markerObj.isStop ? index + 100 : index
                    });
                    let infowindow = new google.maps.InfoWindow();
                    google.maps.event.addListener(marker, 'click', () => {
                        this.state.map.panTo(marker.getPosition());
                        this.state.markers.forEach(marker=> {
                            if (marker.getAnimation() !== null) {
                                marker.setAnimation(null);
                            }
                        });

                        toggleBounce(marker);
                        const contentInfo = renderToString(<MarkerPopup markerObj={markerObj}/>);
                        infowindow.setContent(contentInfo);
                        infowindow.open(this.state.map, marker);
                    });
                    google.maps.event.addListener(marker, 'closeInfo', () => {
                        if (infowindow) {
                            infowindow.close();
                        }
                        });

                    return marker;
                })
            });
        };

        this.drawCoordinates = () => {
            this.props.routes.filteredItems.forEach(route=> {
                const routeColor = route.color;
                const path = route.coordinates.items.map(coord=>new google.maps.LatLng(coord.lat, coord.lon));
                const line = new google.maps.Polyline({
                    path,
                    strokeColor: routeColor,
                    strokeOpacity: 1.0,
                    strokeWeight: 4

                });
                line.setMap(this.state.map);
            })
        }
    }

    componentDidUpdate(prevProps) {
        let entryMarker = this.props.centeredMarker,
            {markers} = this.state;

        if (this.props.routes != prevProps.routes) {
            this.drawMarkers();
            this.drawCoordinates();
        }
        if (this.props.centeredMarker != prevProps.centeredMarker){
            markers.forEach(marker=> {
                if (marker.getAnimation() !== null) {
                    marker.setAnimation(null);
                }
                google.maps.event.trigger(marker, 'closeInfo', {})
            });
            let viewMarker = markers.filter(marker => {return marker.getPosition().lat() == entryMarker.lat && marker.getPosition().lng() == entryMarker.lng});
            google.maps.event.trigger(viewMarker[0], 'click', {});
            this.props.isStop && google.maps.event.trigger(viewMarker[0], 'closeInfo', {});
        }
    }

    componentDidMount() {
        if (!window.google || !window.google.maps) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${Config.googleMap.API_KEY}&callback=${Config.googleMap.CALLBACK_NAME}`;
            script.async = true;
            script.onload = this.onload;

            window.initMap = this.initMap;

            document.head.appendChild(script);
        } else {
            this.initMap();
        }
    }

    render() {

        return (
            <div
                ref="map"
                id="google_map"
                style={{
                    height: '680px',
                    width: '100%'
                }}
            >
            </div>
        )
    }
}

export default Map

