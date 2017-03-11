'use strict';

import React, { Component, PropTypes } from "react";
import { get } from "lodash";
import { loadInteractiveMapFilters } from "../../../actions/interactive-maps";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import favouritePlacesUtils from '../../../utils/favourite_places_utils';
import { addVisibilityFilter, removeVisibilityFilter } from "../../../actions";
import {MY_FAVOURITES} from '../../../constants/index';


class Filters extends Component {

    componentDidMount() {
        this.props.loadInteractiveMapFilters();
    }

    render() {
        const favouritePlaces = Array.from(this.props.favouritePlaces.set);
        const allFilters = [MY_FAVOURITES, ...this.props.filters];
        const filters = allFilters.map((filter, index)=>

            <Filter
                placesCount={index == 0 ? favouritePlaces.length :this.props.allPlaces.filter(place=>place.type.includes(filter)).length}
                key={filter}
                filter={filter}
                addFilter={this.props.addVisibilityFilter}
                removeFilter={this.props.removeVisibilityFilter}
            />
        );

        return (
            <ul className="filter-list">
                {filters}
            </ul>
        )
    }
}

const mapStateToProps = state => ({
    routes: state.routes.items,
    allPlaces: state.routes.allPlaces,
    filters: state.interactiveMap.filtersList,
    favouritePlaces: state.favouritePlaces
});

const mapDispatchToProps = dispatch => bindActionCreators({loadInteractiveMapFilters, addVisibilityFilter, removeVisibilityFilter}, dispatch);


export default  connect(mapStateToProps, mapDispatchToProps)(Filters);

class Filter extends Component {

    constructor(props) {
        super(props);

        this.toggleFilter = e => {
            if (e.target.checked) {
                this.props.addFilter(this.props.filter);
            } else {
                this.props.removeFilter(this.props.filter); //remove
            }
        }
    }

    render() {
        return (
            <li className="filter-item">
                <label className="checkbox">
                    <input onClick={this.toggleFilter} type="checkbox"/>
                    <span>{this.props.filter} <i className="counter">({this.props.placesCount})</i></span>
                </label>
            </li>
        )
    }
}