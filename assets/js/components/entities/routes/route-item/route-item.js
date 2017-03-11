'use strict';
import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class RouteItem extends Component {

    static propTypes = {
        routeItem: PropTypes.object.isRequired,
        showAll: PropTypes.bool,
        last: PropTypes.bool
    };

    constructor(props){
        super(props);
        this.state = {
            showAllText : false
        }
    }

    static _readMore(id, ev){

    }

    componentDidMount(){
        this.props.showAll && this.setState({ showAllText : true})
    }

    render() {

        let routeItem = _.get(this.props, 'routeItem', null),
            last = this.props.last || false,
            linkToRoute = routeItem && `/route/${routeItem.slug}` || null,
            wrapperClassName = `col-md-6 ${last ? 'col-md-offset-3' : ''} route`,
            element = routeItem ? (
                <div key={routeItem.id} className={wrapperClassName}>
                    {routeItem.thumbnail && <Link to={linkToRoute}><img src={routeItem.thumbnail.url} alt="" className="inner-img hvr-bob"/></Link>}
                    <Link className="black-link" to={linkToRoute}><h3 className="third-headliner">{routeItem.title}</h3></Link>
                    <p className="regular-text">
                        {routeItem.shortDescription}
                    </p>
                    {!this.props.showAll &&
                    <Link className="see-route" to={linkToRoute}>see route</Link>}
                </div>
            ) : (<div></div>);

        return element;
    }
}
