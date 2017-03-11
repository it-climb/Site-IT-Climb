'use strict';
import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import {Divider} from '../../common/icons/icons';
import OrderTickets from '../../common/orderTickets/orderTickets';
import SignUp from '../../common/signUpForm/signUpForm';
import {Link} from 'react-router';
import {loadBoatsPageData} from '../../../actions/boats-actions';
import {loadRoutesPageData} from '../../../actions/routes-actions';
import {bindActionCreators} from 'redux';
import ScrollTop from '../../../utils/ScrollTop';
import {connect} from 'react-redux';
import dataUtils from '../../../utils/data_utils';
import LinkToDownload from '../../common/link-to-download/link-to-download';
import RouteItem from '../../entities/routes/route-item/route-item';

class GroupsAndChartersContainer extends Component {

    componentDidMount() {
        this.props.loadBoatsPageData();
        this.props.loadRoutesPageData();
    }

    render() {


        let boats = _.sortBy(dataUtils.getItemsArrayFromStore(_.get(this.props, 'boats', [])),['index']).map((boat)=> {
            return (
                <div className="group-table-row wrapper" key={`boat_id${boat.id}`}>
                    <div className="inner">
                        <h6 className="sixth-headliner">
                            {boat.name}
                        </h6>
                        <h6 className="sixth-headliner">
                            {boat.class}
                        </h6>
                        <h6 className="sixth-headliner">
                            {boat.passengerMax}
                        </h6>
                        <h6 className="sixth-headliner">
                            <LinkToDownload source={{url : _.get(boat, 'pdf.url', null), img: '/assets/images/charters/icn_boat_PDF.svg', alt: 'save', className: 'boat-pdf hvr-bob'}}/>
                        </h6>
                    </div>
                </div>
            )
        });

        let routeItemsElements = dataUtils.getItemsArrayFromStore(_.get(this.props, 'routes.items', []))
            .filter((routeItem)=>routeItem.groupTour)
            .map((routeItem, index, array)=>(<RouteItem routeItem={routeItem} showAll={false} last={dataUtils.isLast(index, array)}/>));

        return (
            <section className="charters">
                <div className="charters-banner wrapper">
                    <div className="inner">
                        <div className="container">
                            <h3 className="third-headliner white">
                                Groups & Charters
                            </h3>
                            <Divider fillColor="#ffffff" className="divider"/>
                            <p className="white regular-text">Charter IT Climb! IT Climb has vessels available for
                                private and corporate charter and group<br/>
                                charter. This is a very popular way to get your group from one waterfront location to
                                another, or to<br/>
                                create your perfect private event on the water.</p>
                        </div>
                    </div>
                </div>
                <div className="container group-events">
                    <h3 className="third-headliner sub">
                        Groups Events
                        <p className="regular-text">
                            Our Charter and Group Sales Team is looking forward to speaking with you by phone at
                            &nbsp;<a href="tel:954-467-6677" className="contact">(954) 467-6677</a>&nbsp;or by
                            e-mail<br/>
                            &nbsp;<a href="mailto: vips@ItClimb.com" className="contact">vips@ItClimb.com</a>&nbsp;
                            regarding the wide range of vessels we charter and entertainment services we offer.
                        </p>
                    </h3>
                </div>
                <div className="table-wrapper">
                    <div className="group-table container">
                        <div className="wrapper group-table-header">
                            <div className="inner">
                                <h2 className="fourth-headliner">
                                    Boat Name
                                </h2>
                                <h2 className="fourth-headliner">
                                    Class
                                </h2>
                                <h2 className="fourth-headliner">
                                    Passenger Max
                                </h2>
                                <h2 className="fourth-headliner">
                                    PDF
                                </h2>
                            </div>
                        </div>
                        {boats}
                    </div>
                </div>
                <div className="container group-events">
                    <h3 className="third-headliner sub">
                        Groups Events
                        <p className="regular-text">
                            A variety of IT Climbs can be exclusively chartered for private or corporate events,
                            weddings, transportation to restaurants, shopping, filming, or birthdays — you pick the
                            place on the water and we are there! All events can be narrated, and
                            if you would like entertainment we have you covered. All boats have MP3 and iPod hookups,
                            bring your favorite play list
                            and you are ready to go!
                        </p>
                        <p className="regular-text">Below Are Sample Itineraries to Help Envision Your Charter</p>
                    </h3>
                </div>
                <div className="perfect-picks group-routes">
                    <div className="container">
                        <div className="row">
                            {routeItemsElements}
                        </div>
                        <p className="regular-text">
                            Ready to get started? Call Jessica at
                            &nbsp;<a href="tel:954-467-6677" className="contact">(954) 467-6677</a>&nbsp;or email her at
                            &nbsp;<a href="mailto: vips@ItClimb.com" className="contact">vips@ItClimb.com</a>&nbsp;
                            and discover how easy booking your event with IT Climb can be!
                        </p>
                    </div>
                </div>
                <OrderTickets />
                <SignUp />
            </section>
        )
    }
}

const mapStateToProps = state => ({
    boats: state.boats,
    routes: state.routes
});

const mapDispatchToProps = dispatch => bindActionCreators({ loadBoatsPageData, loadRoutesPageData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ScrollTop(GroupsAndChartersContainer))