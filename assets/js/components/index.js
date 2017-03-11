'use strict';

import React, { PropTypes, Component } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";

export default class MainContainer extends Component {
    
    static propTypes = {
        children: PropTypes.object
    };
    
    render() {
        return (
            <main>
                <Header
                    location={this.props.location}
                />
                {this.props.children}
                <Footer
                    location={this.props.location}
                />
            </main>
        );
    }
}