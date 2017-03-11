import React, {PropTypes, Component} from 'react';
import Place from '../all-it-climb-stops/place';
import Address from '../../common/address/address';
import OpenHours from '../../common/open-hours/open-hours';
import PhotoSlider from '../../common/photos-slider/photo-slider';

class Lightbox extends Component {

    componentDidMount(){
        let body =  document.getElementsByTagName('body');
        body[0].setAttribute("style", "overflow: hidden");
    }

    componentWillUnmount(){
        let body =  document.getElementsByTagName('body');
        body[0].setAttribute("style", "overflow: auto");
    }

    render(){
        let {onClick, place} = this.props;

        return(
            <div className='lightbox'>
                <span className="close" onClick={onClick}> &#120;</span>
                <div className="wrapper">
                    <div className="inner">
                        <div className="container">
                            <Place place={place}/>
                            <PhotoSlider place={place}/>
                            <Address place={place}/>
                            <OpenHours place={place}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Lightbox.propTypes = {
    onClick: PropTypes.func.isRequired,
    place: PropTypes.object.isRequired,
};

export default Lightbox

