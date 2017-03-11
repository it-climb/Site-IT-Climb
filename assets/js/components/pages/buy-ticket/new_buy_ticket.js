'use strict';

import React, {PropTypes, Component} from 'react';
import ReactDOM from "react-dom";
import ScrollTop from '../../../utils/ScrollTop';

class BuyTicket extends Component {


    componentDidMount() {
            const script = document.createElement('script');
            script.src = `https://secure.rocket-rez.com/RocketWeb/scripts/webengine_load.js`;
            document.head.appendChild(script);

        let element = ReactDOM.findDOMNode(this.refs.child);
        element.setAttribute('eid', 'fa27737e56d1dc42');
    }

    render() {

        return (
            <div className="new-buy-ticket">
                <div className="container">
                    <div id="FlatlandWebEngine"  ref='child'></div>
                </div>
            </div>

        )
    }
}

export default ScrollTop(BuyTicket)
