'use strict';

import React, { PropTypes, Component } from "react";
import Button from '../../../common/button/customButton';

class CheckoutRow extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        descriptionMore: PropTypes.string,
        discountPrice: PropTypes.number,
        regularPrice:PropTypes.number.isRequired,
    };

    constructor(props) {
        super(props);

        this.onQuantityChange = this.onQuantityChange.bind(this);

        this.state = {
            quantity: 0
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


    render() {
        let {title, description, descriptionMore, discountPrice, regularPrice, discountDescription} = this.props,
            {quantity}= this.state;
        return  <div className="checkout-table-row wrapper">
            <div className="inner">
                <div className="col-xs-5 left-side">
                    <h5 className="fifth-headliner">{title}&nbsp;<span>{description}</span>&nbsp;
                        {!description&&<Button className="btn btn-main btn-learn-more"
                                                firstColor="#0079BD"
                                                secondColor='#1760AA'
                                                corner={164}> learn more </Button>
                        }
                    </h5>
                </div>
                <div className="col-xs-7 right-side">
                    {!!discountPrice && <div className="discount-price">&#36;{discountPrice}&nbsp;<span className="status">{discountDescription}</span></div>}
                    <div className="regular-price">&#36;{regularPrice}</div>
                    <div className="counter">
                        <Button className="btn btn-main btn-circle"
                                firstColor="#0079BD"
                                secondColor='#1760AA'
                                corner={115} onClick={this.onQuantityChange.bind(this, 'dec')}> &#45; </Button>
                        <div className="quantity">{quantity}</div>
                        <Button className="btn btn-main btn-circle" firstColor="#0079BD" secondColor='#1760AA'
                                corner={115} onClick={this.onQuantityChange.bind(this, 'inc')}> &#43; </Button>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default CheckoutRow

