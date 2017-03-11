'use strict';

import React, { PropTypes, Component } from "react";
import _ from 'lodash';
class Button extends React.Component {
    
    static propTypes = {
        firstColor: PropTypes.string.isRequired,
        secondColor: PropTypes.string.isRequired,
        corner: PropTypes.number
    };
    
    static defaultProps = {
        corner: 165
    };
    

    render() {
        let {firstColor, secondColor, corner} = this.props;
        const styles = {
            background: `linear-gradient(${corner}deg, ${firstColor} 0%, ${firstColor} 49%, ${secondColor} 50%, ${secondColor} 100%)`,
            filter: `progid:DXImageTransform.Microsoft.gradient( startColorstr= ${firstColor}, endColorstr= ${secondColor},GradientType=1 )`,
            color: '#fff'
        };
        //try to get name of props from 'propTypes'
        let customProps = _.omit(this.props, ['firstColor', 'secondColor', 'corner']);
        return (
            <button
                style={styles}
                {...customProps}
            >
                {this.props.children}
            </button>
        )
    }
}

export default Button
