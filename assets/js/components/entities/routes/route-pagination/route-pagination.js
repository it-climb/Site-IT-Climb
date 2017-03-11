'use strict';
import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class RoutePagination extends Component {

    static propTypes = {
        next: PropTypes.object.isRequired,
        previous: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this._getRoteClass = this._getRoteClass.bind(this);
        this._changeRoute = this._changeRoute.bind(this);
    }

    _getRoteClass(color) {
        let routeColor;
        switch (color) {
            case '#efa73c':
                routeColor = 'yellow';
                break;
            case '#c64028':
                routeColor = 'red';
                break;
            case '#0c8b48':
                routeColor = 'green';
                break;
            case '#233f92':
                routeColor = 'blue';
                break;
            default:
                routeColor = ' ';
        }
        return routeColor;
    }

    _changeRoute(route, ev) {
        ev.preventDefault();
        this.props.callback && this.props.callback(route);
    }

    render() {

        let {next, previous} = this.props;

        return (

            <div className="routes-buttons">
                {next &&
                <a href={`/route/${next.slug}`} onClick={this._changeRoute.bind(this, next)}>
                    <div className={this._getRoteClass(_.get(next, 'color', '')) + ' ' + 'route'}>
                        <h3 className="third-headliner">
                            {next.title}
                        </h3>
                        <span className="star-rate">{next.stars}</span>
                    </div>
                </a>}
                {previous &&
                <a href={`/route/${previous.slug}`} onClick={this._changeRoute.bind(this, previous)}>
                    <div className={this._getRoteClass(_.get(previous, 'color', '')) + ' ' + 'route'}>
                        <h3 className="third-headliner">
                            {previous.title}
                        </h3>
                        <span className="star-rate">{previous.stars}</span>
                    </div>
                </a>}
            </div>
        );
    }
}
