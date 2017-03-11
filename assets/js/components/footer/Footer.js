'use strict';

import React, { PropTypes, Component } from "react";
import {Link} from 'react-router';

class Footer extends React.Component {
    
    render() {
        return (
           this.props.location.pathname !== '/interactive-map' && <footer className="footer">
                <div className="inner-footer">
                    <div className="container">
                        <h4 className="fourth-headliner">
                            LEARN MORE
                        </h4>
                        <ul className="footer-items-list ">
                            <li className="item">
                                <Link to="/all-it-climb-stops">
                                    Driving Directions
                                </Link>
                            </li>
                            <li className="item">
                                <Link to="/cruise-and-save">
                                    Cruise & Save Partners
                                </Link>
                            </li>
                            <li className="item">
                                <Link to="/buy-ticket">
                                    IT Climb Fares
                                </Link>
                            </li>
                            <li className="item mobile-only">
                                <Link to="/schedule">
                                    IT Climb Schedules
                                </Link>
                            </li>


                        </ul>

                        <ul className="footer-items-list hidden-xs">
                            <li className="item">
                                <Link to="/schedule">
                                    IT Climb Schedules
                                </Link>
                            </li>

                            <li className="item">
                                <Link to="/blog">
                                    Captain’s Log
                                </Link>
                            </li>
                        </ul>

                        <ul className="footer-items-list">
                            <li className="item mobile-only">
                                <Link to="/blog">
                                    Captain’s Log
                                </Link>
                            </li>
                            <li className="item">
                                <Link to="/faq">
                                    FAQs
                                </Link>
                            </li>
                            <li className="item">
                                <Link to="/groups-and-charters">
                                    Groups & Charters
                                </Link>
                            </li>
                            <li className="item">
                                <Link to="/buy-ticket">
                                    Buy Tickets Here
                                </Link>
                            </li>
                            <li className="item">
                                <a href="/assets/stock/WT_Web_Brochure_6.26.15.pdf" download>Brochure</a>
                            </li>
                        </ul>
                        <div className="address-info">
                            <img src="/assets/images/icn_map_footer.svg" alt="map" className="map-view"/>
                            <ul className="footer-items-list">
                                <li className="item">
                                    <h4 className="fourth-headliner">
                                        CONTACT IT Climb
                                    </h4>
                                </li>
                                <li><br/></li>
                                <li className="item">
                                   <address>Ft. Lauderdale, FL</address>
                                </li>
                                <li><br/></li>
                                <li className="item">
                                    <a href="tel:9544676677" className="tel">Tel:&nbsp;(954)&nbsp;467-6677</a>
                                </li>
                                <li className="item">
                                    <a href="tel:9547288417" className="tel">Fax:&nbsp;(954)&nbsp;728-8417</a>
                                </li>
                                <li className="item">
                                    <a href="mailto:info@ItClimb.com"  className="email">Email: info@ItClimb.com</a>
                                </li>
                            </ul>
                        </div>
                        <ul className="social-links">
                            <li className="social-item">
                                <a href="https://www.facebook.com/pages/Fort-Lauderdale-it-climb/48973533746" target="_blank" className="social-link facebook"/>
                            </li>
                            <li className="social-item">
                                <a href="https://twitter.com/FtLaudItClimb" target="_blank" className="social-link twitter"/>
                            </li>
                            <li className="social-item">
                                <a href="https://www.youtube.com/results?search_query=ft+lauderdale+it+climb" target="_blank" className="social-link youtube"/>
                            </li>
                            <li className="social-item">
                                <a href="https://www.yelp.com/biz/it-climb-fort-lauderdale?osq=it+climb" target="_blank" className="social-link yelp"/>
                            </li>
                        </ul>
                        <small className="copyright">
                            &copy; Created with LOVE by <a href="http://maddev.com/" target="_blank" className="maddevs">MAD.</a> All Rights Reserved
                        </small>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer