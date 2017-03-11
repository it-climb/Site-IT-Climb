import React, {PropTypes, Component} from 'react';

export default class Address extends Component {

    static propTypes = {
        place: PropTypes.object.isRequired
    };

    render() {

        let {place} = this.props,
            address = null;

        if(place && place.tripAdviserData && place.tripAdviserData.address){
            let addressData = JSON.parse(place.tripAdviserData.address);
            address = addressData.address_string;
        }

        return (
            <address className="address regular-text">
                {address && <div>
                    {address}
                </div>}
            </address>
        )
    }
}