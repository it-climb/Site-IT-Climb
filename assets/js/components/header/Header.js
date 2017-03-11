'use strict';

import React, {PropTypes, Component} from "react";
import {Link, IndexLink, browserHistory} from 'react-router';
import Radium from 'radium';
import {Navbar, Nav, NavDropdown, MenuItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import Button from '../common/button/customButton';


class Header extends React.Component {

    static propTypes = {
        radiumConfig: PropTypes.shape({
            userAgent: PropTypes.string.isRequired
        }).isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            showMobileMenu: false,
            headerClass : 'header'
        };
        this._handleShowMobileMenu = this._handleShowMobileMenu.bind(this);
        this.handleHeaderScroll =this.handleHeaderScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleHeaderScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleHeaderScroll);
    }

    componentWillReceiveProps(nextProps){
        nextProps.location.pathname === '/interactive-map' &&
        this.setState({ headerClass : 'fixed header'})
    }

    handleHeaderScroll(ev){
        let headerClass = ev.srcElement.body.scrollTop > 0
        ? 'fixed header' : 'header';

        this.state.headerClass != headerClass && this.props.location.pathname !== '/interactive-map' &&
        this.setState({
            headerClass:headerClass
        })
    }

    _handleShowMobileMenu() {
        this.state.showMobileMenu
            ? document.body.style.overflow = 'auto'
            : document.body.style.overflow = 'hidden';
        this.setState({showMobileMenu: !this.state.showMobileMenu})
    }

    handleGoTo(goToPage) {
        return browserHistory && browserHistory.push.bind(browserHistory, goToPage);
    }


    render() {
        return (
            <header
                className={this.state.headerClass}
            >
                <div className="navbar">
                    <div className="container">
                        <nav>
                            <div className="navbar-header">
                                <IndexLink className="navbar-brand"
                                           to="/"
                                >
                                    <img src="/assets/images/icn_logo.svg" className="logo"/>
                                </IndexLink>
                                <button onClick={this._handleShowMobileMenu}
                                        className={this.state.showMobileMenu ? 'navbar-toggle  open' : 'navbar-toggle '}>
                                    <span className="icon-bar"/>
                                    <span className="icon-bar"/>
                                    <span className="icon-bar"/>
                                </button>
                            </div>
                            <Navbar.Collapse>
                                <ul
                                    className=" nav navbar-nav"
                                >
                                    <li>
                                        <span className='dropdown-toggle'>Discover
                                            <span className="dropdown-caret">&#62;</span>
                                            <ul className='dropdown-menu'>
                                            <li>
                                                <Link
                                                    to="/all-it-climb-stops"
                                                >
                                                    IT Climb Stops
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="/interactive-map"
                                                >
                                                    Interactive Map
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="/perfect-picks"
                                                >
                                                    Perfect Picks
                                                </Link>
                                            </li>
                                        </ul>
                                        </span>

                                    </li>
                                    <li>
                                        <Link
                                            to="/cruise-and-save"
                                            activeClassName={'active-link'}
                                        >
                                            Cruise & Save
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/schedule"
                                            activeClassName={'active-link'}
                                        >
                                            Schedule
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/groups-and-charters"
                                            activeClassName={'active-link'}
                                        >
                                            Groups & Charters
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/get-more-lauderdale"
                                            activeClassName={'active-link'}
                                        >
                                            #MoreLauderdale
                                        </Link>
                                    </li>
                                </ul>
                                <Button className="btn btn-main" firstColor="#04844A" secondColor='#0A6D38' corner={166}
                                        onClick={this.handleGoTo('/buy-ticket')}>
                                    Buy tickets
                                </Button>
                            </Navbar.Collapse>
                            <ul className={this.state.showMobileMenu ? 'mobile-menu open' : 'mobile-menu'}>
                                <li>
                                    <Link
                                        to="/buy-ticket"
                                        onClick={this._handleShowMobileMenu}
                                    >
                                        Buy Tickets
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/all-it-climb-stops"
                                        onClick={this._handleShowMobileMenu}
                                    >
                                        IT Climb Stops
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/interactive-map"
                                        onClick={this._handleShowMobileMenu}
                                    >
                                        Interactive Map
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/perfect-picks"
                                        onClick={this._handleShowMobileMenu}
                                    >
                                        Perfect Picks
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/cruise-and-save"
                                        onClick={this._handleShowMobileMenu}
                                    >
                                        Cruise & Save
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/schedule"
                                        onClick={this._handleShowMobileMenu}
                                    >
                                        Schedule
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/groups-and-charters"
                                        onClick={this._handleShowMobileMenu}
                                    >
                                        Groups & Charters
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/get-more-lauderdale"
                                        onClick={this._handleShowMobileMenu}
                                    >
                                        #MoreLauderdale
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                </div>
            </header>
        )
    }
}

const mapStateToProps = state => ({
    radiumConfig: {userAgent: state.userAgent.agent}
});

export default connect(mapStateToProps)(Radium(Header))