import React from 'react';
import {desktop, tablet, mobile} from './constants/viewport';

function checkDimension() {
    if (typeof document === 'undefined') return 'desktop';
    let viewportWidth = document.body.offsetWidth,
        type;
    switch (true) {
        case (viewportWidth <= mobile):
            return type = 'mobile';
        case ((viewportWidth > mobile) && (viewportWidth < tablet)):
            return type = 'tablet';
        case ((viewportWidth >= tablet) && (viewportWidth < desktop)):
            return type = 'medium';
        default:
            return type = 'desktop';
    }
}


export const ScreenDimensionWatcher = ComposedComponent => class extends React.Component {

    constructor(props) {
        super(props);
        let width = 0;
        let deviceType = !props.params.deviceType ? checkDimension() : props.params.deviceType;

        if (deviceType === 'mobile') width = mobile;
        if (deviceType === 'tablet') width = tablet;
        if (deviceType === 'medium') width = tablet;
        if (deviceType === 'desktop') width = desktop;

        this.state = {
            width: width,
            height: 0,
            deviceType: deviceType
        };



        this.updateDimensions = () => {
            this.setState({deviceType: checkDimension(), height: document.body.offsetHeight, width: document.body.offsetWidth});
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    }

    render() {
        return <ComposedComponent {...this.props} {...this.state} />;
    }
};