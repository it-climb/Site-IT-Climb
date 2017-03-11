import React, { PropTypes, PureComponent } from 'react';
import _ from 'lodash';
import TripAdvisor from '../../common/trip-advisor/trip-advisor';

class MarkerPopup extends PureComponent {
    
    static propTypes = {
        markerObj: PropTypes.object.isRequired
    };
    
    render() {
        const {markerObj} = this.props;
        
        return (
            <div className="popup-info">
                <img src={markerObj.isStop ?_.get(markerObj, 'thumbnail.url', ''):_.get(markerObj, 'icon')} alt="icon" className="map-icon"/>
                    {
                        !_.isNull(_.get(markerObj, 'tripAdvisorId', null))&& <TripAdvisor data={markerObj.tripAdviserData}/>
                    }
                <h6 className="sixth-headliner">{markerObj.isStop ?_.get(markerObj ,'locationName', 'Stop Name'): _.get(markerObj, 'title', '')}</h6>
                {!_.isEmpty(_.get(markerObj, 'discount', '')) && <div className="wealth">
                    <img src="/assets/images/cruise/box.svg" alt="box" className="box"/>
                    <h5 className="fifth-headliner">
                        Cruise & Save
                    </h5>
                    <h6 className="discount">
                        {_.get(markerObj, 'discount', 'no discount')}
                    </h6>
                </div>}
            </div>
        );
        
    }
}

export default MarkerPopup;

