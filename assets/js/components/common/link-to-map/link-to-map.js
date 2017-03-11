import React, {PropTypes, Component} from 'react';
import Button from '../../common/button/customButton';

const googleMapUrl = `https://www.google.com/maps`,
    zoom = `16.25z`;

export default class LinkToMap extends Component {

    static propTypes = {
        location: PropTypes.object.isRequired
    };

    render() {

        let {location} = this.props,
            mapIcon = (<img src="/assets/images/icn_map.svg" alt="star" className="map"/>),
            component;

        if(location){
            let latitude = location.lat,
                longitude = location.lng;
            component = (
            <Button className="btn btn-main btn-activity" firstColor="#F9F9F9" secondColor='#EFEFEF' corner={156}
                    onClick={()=>window.location.href = `${location ? `${googleMapUrl}/@${latitude},${longitude},${zoom}` : '#'}`}>
                {mapIcon} Map
            </Button>
            )
        }else{
            component = (<div></div>);
        }

        return component
    }
}