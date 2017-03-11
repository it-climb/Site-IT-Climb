import React, {PropTypes, Component} from 'react';
import Button from '../button/customButton';
import {browserHistory} from 'react-router';

class OrderTickets extends React.Component {

    constructor(props) {
        super(props);

        this.onQuantityChange = this.onQuantityChange.bind(this);

        this.state = {
            quantity: 2
        }

    }

    onQuantityChange(ev){
        let {quantity} = this.state;
        ev === 'dec'
            ? (quantity>0) && quantity--
            : quantity++;
        this.setState({
            quantity: quantity
        })
    }

    handleGoTo(goToPage) {
        return browserHistory && browserHistory.push.bind(browserHistory, goToPage);
    }

    render(){
        return(
            <section className="order-tickets">
                <div className="container">
                    <div className="row">
                        <div className="col-md-9 col-md-offset-1 col-sm-8 col-sm-offset-2 col-xs-12">
                            <img src="/assets/images/home/icn_tickets_pad.png"
                                 srcSet="/assets/images/home/icn_tickets_pad.png 1x,
                                     /assets/images/home/icn_tickets_pad@2x.png 2x,
                                     /assets/images/home/icn_tickets_pad@3x.png 3x"
                                 alt="tickets" className="tickets hvr-bob"/>
                            <div className="order-form">
                                <h5 className="fifth-headliner">
                                    Your IT Climb Ticket includes&nbsp;<span className="green">Unlimited</span>&nbsp;rides<br/>
                                    <span className="green">All Day</span> in Fort Lauderdale & Hollywood.
                                </h5>

                                <Button className="btn btn-main btn-buy-now" firstColor="#04844A" secondColor='#0A6D38'
                                        corner={166}
                                        onClick={this.handleGoTo('/buy-ticket')}>
                                    BUY ONLINE NOW <span className="btn-circle">&#62;</span></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default OrderTickets
