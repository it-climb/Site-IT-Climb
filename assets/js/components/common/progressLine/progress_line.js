import React, {Component, PropTypes} from 'react';

export default class ProgressLine extends Component {

    static propTypes = {
        goToAnchor: PropTypes.func,
        handleScroll: PropTypes.boolean
    };
    
    static defaultProps = {
        valueScroll: 0,
    };

    constructor(props) {
        super(props);
        this.state = {
            direction: 'discover'
        };
        this._handleBoat = this._handleBoat.bind(this)
    }

    _handleBoat() {
        let dirArray = ['discover', 'showing', 'save', 'go'],
            {direction} = this.state,
            currentDirectionPos = dirArray.indexOf(direction),
            nextDirection = (currentDirectionPos >= dirArray.length - 1) ? 0 : currentDirectionPos + 1;
        this._goToAnchor(dirArray[nextDirection]);
    }

    _goToAnchor(anchor) {
        this.props.goToAnchor && this.props.goToAnchor(anchor);
        this.setState({direction: anchor});
    }

    render() {
        let boatPoz = (985-70)*(Math.max(this.props.valueScroll-452, 0)/(2292-452))+70;

        boatPoz = Math.max(Math.min(boatPoz, 985), 70);

        let styled = this.props.handleScroll?{left: boatPoz}:{};
        return (<div className="progress-nav">
                <img src="/assets/images/MapIcons/icn_boat_pad.svg" alt="" className={`${this.state.direction} boat hvr-bob`}
                     style={styled}
                     onClick={this._handleBoat}/>
                <svg className={`${this.state.direction} progress-line`} viewBox="0 0 990 115">
                    <g>
                        <line style={{
                            fill: 'none',
                            stroke: '#2C228C',
                            strokeWidth: '3',
                            strokeMiterlimit: '10'
                        }} x1="70" y1="18" x2="973.4" y2="18"/>
                        <circle style={{fill: '#1760AA'}} cx="58" cy="18" r="16.6"
                                onClick={this._goToAnchor.bind(this, 'discover')}/>
                        <text className="secondary-headliner"
                              x="5" y="90" fill="white">Discover
                        </text>
                        <text className="secondary-headliner"
                              x="290" y="90" fill="white">Show
                        </text>
                        <text className="secondary-headliner"
                              x="615" y="90" fill="white">Save
                        </text>
                        <text className="secondary-headliner"
                              x="955" y="90" fill="white">Go
                        </text>
                        <circle style={{fill: '#1760AA'}} cx="972" cy="18" r="16.6"
                                onClick={this._goToAnchor.bind(this, 'go')}/>
                        <circle style={{fill: '#1760AA'}} cx="323.2" cy="18" r="16.6"
                                onClick={this._goToAnchor.bind(this, 'showing')}/>
                        <circle style={{fill: '#1760AA'}} cx="650.3" cy="18" r="16.6"
                                onClick={this._goToAnchor.bind(this, 'save')}/>
                    </g>
                </svg>
            </div>

        )
    };
}
