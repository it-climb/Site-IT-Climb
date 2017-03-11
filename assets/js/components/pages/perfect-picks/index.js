'use strict';
import React, { Component, PropTypes } from "react";
import { loadRoutesPageData } from "../../../actions/routes-actions";
import { bindActionCreators } from "redux";
import ScrollTop from "../../../utils/ScrollTop";
import { connect } from "react-redux";
import { Divider } from "../../common/icons/icons";
import { Counter } from "../../common/counter/counter";
import OrderTickets from "../../common/orderTickets/orderTickets";
import SignUp from "../../common/signUpForm/signUpForm";
import RouteItem from "../../entities/routes/route-item/route-item";
import dataUtils from "../../../utils/data_utils";

class PerfectPicksContainer extends Component {
    
    componentDidMount() {
        this.props.loadRoutesPageData();
    }
    
    render() {
        if (this.props.routes.items.length == 0) return null;
        
        return (<PerfectPicks {...this.props}/>)
    }
}

const PerfectPicks = (props) => {
    
    let routeItemsElements = dataUtils.getItemsArrayFromStore(props.routes.items)
        .map((routeItem, index, array)=>(
            <RouteItem key={index} routeItem={routeItem} showAll={false} last={dataUtils.isLast(index, array)}/>));
    
    return (
        <section className="picks">
            <div className="picks-banner wrapper">
                <div className="inner">
                    <h3 className="third-headliner">
                        Perfect Picks
                    </h3>
                    <Divider fillColor="#ffffff" className="divider"/>
                    <Counter caption="Routes" time={2000} begin={0} end={props.routes.items.length}/>
                    <Counter caption="Things to see" time={2000} begin={0} end={600}/>
                    <Counter caption="Smiles" time={2000} begin={0} end={500}/>
                </div>
            </div>
            <div className="perfect-picks">
                <div className="container">
                    <div className="row">
                        {routeItemsElements}
                    </div>
                </div>
            </div>
            
            <OrderTickets />
            <SignUp />
        </section>
    )
};

const mapStateToProps = state => ({
    routes: state.routes
});

const mapDispatchToProps = dispatch => bindActionCreators({loadRoutesPageData}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ScrollTop(PerfectPicksContainer))
