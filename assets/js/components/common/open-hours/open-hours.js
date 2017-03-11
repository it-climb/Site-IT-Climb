import React, {PropTypes, Component} from 'react';
import dataUtils from '../../../utils/data_utils';
import _ from 'lodash';

export default class OpenHours extends Component {

    static propTypes = {
        place: PropTypes.object.isRequired
    };

    render() {

        let {place} = this.props,
            openHours = [];

        if(place && place.tripAdviserData && place.tripAdviserData.openHours){
            let openHoursData = JSON.parse(place.tripAdviserData.openHours);
            openHours = dataUtils.getTodayOpenHours(openHoursData);
        }

        return (
            <div className="hours regular-text">
                {!_.isEmpty(openHours) &&
                <div>
                    <span className="text">Hours:&nbsp;Today</span>&nbsp;{openHours.map((hours, index)=>(<span className="hour" key={index}>{hours}</span>))}
                </div>}
            </div>
        )
    }
}